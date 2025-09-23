"use client"

import { useMemo, useRef, useState, useEffect } from "react"
import html2canvas from "html2canvas"
import { HiSparkles, HiEmojiHappy } from "react-icons/hi"
import Json from "./finalyr.json"
// ❌ Removed next/navigation (not available in Vite)

/**
 * Final Year Objectives Builder + JSON Quiz Loader
 * ---------------------------------------------------------------
 * • Build/preview 30-question MCQ sheets
 * • Load real questions from imported ./finalyr.json
 * • Start a quiz, click options, Submit → score + corrections
 * • Export printable sheet & answer key (PNG/JPG)
 */

/* --------------------------- helpers --------------------------- */
const makeQuestion = (i) => ({ id: i + 1, text: "", options: ["", "", "", ""], answerIndex: 0 })
const makeTopic = (name = "") => ({
  name,
  questions: Array.from({ length: 30 }, (_, i) => makeQuestion(i)),
  collapsed: false,
})
const alpha = (i) => String.fromCharCode(65 + i) // 0->A
const idxFrom = (v) =>
  typeof v === "number"
    ? v
    : Math.max(
        0,
        (String(v || "A")
          .toUpperCase()
          .charCodeAt(0) - 65) | 0
      )

function clamp30(arr) {
  const copy = [...arr]
  if (copy.length < 30) for (let i = copy.length; i < 30; i++) copy.push(makeQuestion(i))
  else if (copy.length > 30) copy.length = 30
  return copy.map((q, i) => ({ ...q, id: i + 1 }))
}

/* --------------------------- URL query sync (vanilla History API) --------------------------- */
function useUrlQuerySync(jsonSubjects, jsonSubjectCode, setJsonSubjectCode, jsonTopicId, setJsonTopicId) {
  // Read current URL and set state accordingly; also handle back/forward
  useEffect(() => {
    const applyFromUrl = () => {
      if (typeof window === "undefined") return
      const sp = new URLSearchParams(window.location.search)
      const s = sp.get("subject")
      const t = sp.get("topic")

      if (s && s !== jsonSubjectCode && jsonSubjects.some((x) => x.code === s)) {
        setJsonSubjectCode(s)
        const subj = jsonSubjects.find((x) => x.code === s)
        const validTopicIds = (subj?.topics || []).map((u) => u.id)
        setJsonTopicId(t && validTopicIds.includes(t) ? t : subj?.topics?.[0]?.id || subj?.topics?.[0]?.title || "")
      } else if (t && t !== jsonTopicId) {
        setJsonTopicId(t)
      }
    }

    applyFromUrl()
    if (typeof window !== "undefined") {
      window.addEventListener("popstate", applyFromUrl)
      return () => window.removeEventListener("popstate", applyFromUrl)
    }
  }, [jsonSubjects]) // eslint-disable-line react-hooks/exhaustive-deps

  const setParams = (updates) => {
    if (typeof window === "undefined") return
    const sp = new URLSearchParams(window.location.search)
    for (const [k, v] of Object.entries(updates)) {
      if (v == null || v === "") sp.delete(k)
      else sp.set(k, String(v))
    }
    const qs = sp.toString()
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname
    window.history.replaceState({}, "", url)
  }

  return { setParams }
}

/* --------------------------- NEW: answer randomization helpers --------------------------- */
// Fisher–Yates
function shuffle(arr) {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Randomize the option order for one question while keeping the correct mapping */
function randomizeQuestion(q) {
  const opts = q.options.slice(0, 4)
  while (opts.length < 4) opts.push("")
  const correctIdx = Math.min(3, Math.max(0, q.answerIndex | 0))

  const incorrectIdxs = [0, 1, 2, 3].filter((i) => i !== correctIdx)
  const shuffledIncorrect = shuffle(incorrectIdxs)

  // place correct option at a random slot A/B/C/D uniformly
  const newCorrect = Math.floor(Math.random() * 4)
  const newOptions = new Array(4)
  let k = 0
  for (let i = 0; i < 4; i++) {
    newOptions[i] = i === newCorrect ? opts[correctIdx] : opts[shuffledIncorrect[k++]]
  }
  return { ...q, options: newOptions, answerIndex: newCorrect }
}

/** Randomize answers for an entire topic */
function randomizeTopicAnswers(topic) {
  const qs = (topic.questions || []).map(randomizeQuestion)
  return { ...topic, questions: qs }
}

/* --------------------------- Convert a topic from finalyr.json → builder topic shape --------------------------- */
function topicFromJson(topic) {
  const srcQs = Array.isArray(topic?.questions) ? topic.questions : []
  const qs = Array.from({ length: 30 }, (_, i) => {
    const s = srcQs[i] || {}
    const opts = Array.isArray(s.options) ? s.options.slice(0, 4) : ["", "", "", ""]
    while (opts.length < 4) opts.push("")
    const ai = Math.min(3, Math.max(0, typeof s.answerIndex === "number" ? s.answerIndex : idxFrom(s.answer)))
    return { id: i + 1, text: s.text || "", options: opts, answerIndex: ai }
  })
  // ensure answer letters are randomized every time we load
  return randomizeTopicAnswers({ name: topic.title || topic.id || "Topic", questions: qs, collapsed: false })
}

/* --------------------------- component --------------------------- */
export default function FinalYearObjectivesBuilder() {
  const sheetRef = useRef(null)
  const keyRef = useRef(null)

  // Builder data (editable)
  const [data, setData] = useState({ subject: "", department: "", topics: [makeTopic("Sample Topic")] })
  const [activeTopicIdx, setActiveTopicIdx] = useState(0)
  const [showOptions, setShowOptions] = useState(true)

  // Quiz state
  const [quizOn, setQuizOn] = useState(false)
  const [answers, setAnswers] = useState({}) // { [qIndex]: 0..3 }
  const [submitted, setSubmitted] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)

  // Imported JSON subject/topic selectors
  const jsonSubjects = Array.isArray(Json?.subjects) ? Json.subjects : []
  const [jsonSubjectCode, setJsonSubjectCode] = useState(jsonSubjects[0]?.code || "")
  const jsonSubject = jsonSubjects.find((s) => s.code === jsonSubjectCode) || jsonSubjects[0]
  const [jsonTopicId, setJsonTopicId] = useState(jsonSubject?.topics?.[0]?.id || jsonSubject?.topics?.[0]?.title || "")
  const jsonTopic = (jsonSubject?.topics || []).find((t) => t.id === jsonTopicId) || jsonSubject?.topics?.[0]

  // URL sync hook (vanilla)
  const { setParams } = useUrlQuerySync(
    jsonSubjects,
    jsonSubjectCode,
    setJsonSubjectCode,
    jsonTopicId,
    setJsonTopicId
  )

  const activeTopic = data.topics[activeTopicIdx] || makeTopic("")

  useEffect(() => {
    if (jsonSubjects.length > 0 && jsonSubject && jsonTopic) {
      const topicBuilt = topicFromJson(jsonTopic)
      setData({
        subject: `${jsonSubject.code}${jsonSubject.name && jsonSubject.name !== jsonSubject.code ? ` – ${jsonSubject.name}` : ""}`,
        department: "",
        topics: [topicBuilt],
      })
      setActiveTopicIdx(0)
      setQuizOn(true)
      setSubmitted(false)
      setAnswers({})
      setShowAnswers(false)
    }
  }, [jsonSubjectCode, jsonTopicId, jsonSubjects]) // Auto-load when subject or topic changes

  /* --------------------------- mutators --------------------------- */
  const setSubject = (v) => setData((d) => ({ ...d, subject: v }))
  const setDepartment = (v) => setData((d) => ({ ...d, department: v }))

  const addTopic = () => setData((d) => ({ ...d, topics: [...d.topics, makeTopic("")] }))

  const removeTopic = (i) =>
    setData((d) => {
      const topics = d.topics.slice()
      topics.splice(i, 1)
      const newIdx = Math.max(0, Math.min(activeTopicIdx, topics.length - 1))
      if (topics.length === 0) topics.push(makeTopic("Topic 1"))
      setActiveTopicIdx(newIdx)
      return { ...d, topics }
    })

  const setTopicName = (i, name) =>
    setData((d) => {
      const topics = d.topics.slice()
      topics[i] = { ...topics[i], name }
      return { ...d, topics }
    })

  const toggleCollapse = (i) =>
    setData((d) => {
      const topics = d.topics.slice()
      topics[i] = { ...topics[i], collapsed: !topics[i].collapsed }
      return { ...d, topics }
    })

  const resetThirty = (i) =>
    setData((d) => {
      const topics = d.topics.slice()
      topics[i] = { ...topics[i], questions: Array.from({ length: 30 }, (_, j) => makeQuestion(j)) }
      return { ...d, topics }
    })

  const updateQuestion = (ti, qi, patch) =>
    setData((d) => {
      const topics = d.topics.slice()
      const t = topics[ti]
      const qs = t.questions.slice()
      qs[qi] = { ...qs[qi], ...patch }
      topics[ti] = { ...t, questions: clamp30(qs) }
      return { ...d, topics }
    })

  const updateOption = (ti, qi, oi, value) =>
    setData((d) => {
      const topics = d.topics.slice()
      const t = topics[ti]
      const qs = t.questions.slice()
      const q = qs[qi]
      const opts = q.options.slice()
      opts[oi] = value
      qs[qi] = { ...q, options: opts }
      topics[ti] = { ...t, questions: clamp30(qs) }
      return { ...d, topics }
    })

  const shuffleQuestions = (ti) =>
    setData((d) => {
      const topics = d.topics.slice()
      const t = topics[ti]
      const arr = t.questions.slice()
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
      }
      topics[ti] = { ...t, questions: arr.map((q, idx) => ({ ...q, id: idx + 1 })) }
      return { ...d, topics }
    })

  // randomize A/B/C/D positions for all questions in the active topic
  const randomizeAnswers = (ti) =>
    setData((d) => {
      const topics = d.topics.slice()
      topics[ti] = randomizeTopicAnswers(topics[ti])
      return { ...d, topics }
    })

  // Load the picked subject/topic from JSON into the builder
  const loadFromJson = () => {
    if (!jsonSubject || !jsonTopic) return
    const topicBuilt = topicFromJson(jsonTopic)
    setData({
      subject: `${jsonSubject.code}${jsonSubject.name && jsonSubject.name !== jsonSubject.code ? ` – ${jsonSubject.name}` : ""}`,
      department: data.department,
      topics: [topicBuilt],
    })
    setActiveTopicIdx(0)
    setQuizOn(true) // Auto-start quiz when loading new topic
    setSubmitted(false)
    setAnswers({})
    setShowAnswers(false)
  }

  /* --------------------------- export helpers --------------------------- */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
  async function downloadNode(node, filenameBase, format = "png") {
    if (!node) return
    await sleep(120)
    const canvas = await html2canvas(node, { scale: 3, useCORS: true, backgroundColor: "#ffffff" })
    const dataUrl = format === "jpg" ? canvas.toDataURL("image/jpeg", 1.0) : canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.download = `${filenameBase}.${format}`
    a.href = dataUrl
    a.click()
  }

  const filenameBase = useMemo(() => {
    const s = (data.subject || "subject").trim().toLowerCase().replace(/\s+/g, "-")
    const t = (activeTopic.name || "topic").trim().toLowerCase().replace(/\s+/g, "-")
    return `${s}_${t}_30-objectives`
  }, [data.subject, activeTopic.name])

  /* --------------------------- derived --------------------------- */
  const answerKey = useMemo(
    () => (activeTopic.questions || []).map((q, i) => ({ no: i + 1, ans: alpha(q.answerIndex) })),
    [activeTopic.questions],
  )
  const questionsOk = activeTopic.questions && activeTopic.questions.length === 30

  // Quiz derived
  const activeQuizQs = (activeTopic.questions || []).filter((q) => (q.text || "").trim()).slice(0, 30)
  const score = submitted ? activeQuizQs.reduce((acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0), 0) : 0

  /* --------------------------- UI --------------------------- */
  return (
    <div className="relative min-h-screen px-4 py-6 bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
      <HiEmojiHappy className="absolute w-10 h-10 text-purple-400 opacity-40 bottom-3 right-3 animate-bounce" />
      <HiSparkles className="absolute w-10 h-10 text-pink-400 opacity-40 top-3 left-3 animate-bounce" />

      {/* JSON Loader */}
      <div className="max-w-5xl p-4 mx-auto mb-4 bg-white shadow-md rounded-xl dark:bg-gray-800 dark:text-white">
        {/* <h3 className="mb-3 text-lg font-semibold text-purple-700 dark:text-purple-300">Load from finalyr.json</h3> */}
        <div className="grid items-end gap-3 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium">Subject</label>
            <select
              value={jsonSubjectCode}
              onChange={(e) => {
                const nextCode = e.target.value
                setJsonSubjectCode(nextCode)
                const s = jsonSubjects.find((x) => x.code === nextCode) || jsonSubjects[0]
                const nextTopicId = s?.topics?.[0]?.id || s?.topics?.[0]?.title || ""
                setJsonTopicId(nextTopicId)
                // reflect in URL
                setParams({ subject: nextCode, topic: nextTopicId })
              }}
              className="w-full px-3 py-2 mt-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              {jsonSubjects.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.code}
                  {s.name && s.name !== s.code ? ` – ${s.name}` : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Topic</label>
            <select
              value={jsonTopicId}
              onChange={(e) => {
                const tId = e.target.value
                setJsonTopicId(tId)
                // reflect in URL
                setParams({ subject: jsonSubjectCode, topic: tId })
              }}
              className="w-full px-3 py-2 mt-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              {(jsonSubject?.topics || []).map((t) => (
                <option key={t.id} value={t.id}>
                  {t.title || t.id}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <div className="w-full px-3 py-2 text-sm text-center text-gray-500 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-400">
             Welcome
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ MODE */}
      {quizOn && (
        <div className="relative w-full p-5 mx-auto mt-6 bg-white border-4 border-indigo-300 border-dashed shadow-2xl rounded-xl dark:bg-gray-900 dark:text-white max-w-5xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-extrabold text-indigo-700 dark:text-indigo-300">
                {data.subject || "Subject"} — {activeTopic.name || "Topic"} • Test
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click options. Submit to see score & corrections.
              </p>
            </div>
            {submitted && (
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 text-sm font-semibold text-white bg-emerald-600 rounded">
                  Score: {score}/{activeQuizQs.length}
                </div>
                {!showAnswers && (
                  <button
                    onClick={() => setShowAnswers(true)}
                    className="px-3 py-1 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Show Answers
                  </button>
                )}
              </div>
            )}
          </div>

          <div className="mt-4 space-y-4 text-sm">
            {activeQuizQs.map((q, i) => {
              const picked = answers[i]
              const isCorrect = submitted && showAnswers && picked === q.answerIndex
              const isIncorrect = submitted && showAnswers && picked !== q.answerIndex && picked !== undefined
              const showCorrections = submitted && showAnswers
              return (
                <div
                  key={i}
                  className={`p-3 rounded ${
                    showCorrections
                      ? isCorrect
                        ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700"
                        : isIncorrect
                          ? "bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700"
                          : "bg-gray-50 dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-800"
                  }`}
                >
                  <div className="font-semibold mb-2">
                    {i + 1}. {q.text}
                  </div>
                  <div className="grid gap-2 md:grid-cols-2">
                    {q.options.map((opt, oi) => {
                      const isRight = showCorrections && oi === q.answerIndex
                      const isWrongPick = showCorrections && picked === oi && oi !== q.answerIndex
                      return (
                        <label
                          key={oi}
                          className={`flex items-center gap-2 cursor-pointer rounded px-2 py-1 ${
                            isRight
                              ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 font-semibold"
                              : isWrongPick
                                ? "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-100 font-semibold"
                                : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q_${i}`}
                            checked={picked === oi}
                            onChange={() => setAnswers((a) => ({ ...a, [i]: oi }))}
                            disabled={submitted}
                          />
                          <span className="font-semibold">{alpha(oi)}.</span>
                          <span>{opt}</span>
                        </label>
                      )
                    })}
                  </div>

                  {showCorrections && (
                    <div className="mt-2 text-xs">
                      <span className="px-2 py-0.5 mr-2 font-bold text-white bg-green-600 rounded">
                        Correct: {alpha(q.answerIndex)}
                      </span>
                      <span
                        className={`px-2 py-0.5 font-bold text-white rounded ${
                          picked === q.answerIndex ? "bg-green-600" : "bg-red-600"
                        }`}
                      >
                        Your pick: {picked != null ? alpha(picked) : "—"}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="flex gap-3 mt-4">
            {!submitted ? (
              <button
                onClick={() => setSubmitted(true)}
                className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            ) : (
              <button
                onClick={() => {
                  setQuizOn(false)
                  setSubmitted(false)
                  setAnswers({})
                  setShowAnswers(false)
                  setTimeout(() => setQuizOn(true), 100)
                }}
                className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
              >
                Reset Quiz
              </button>
            )}
            <button
              onClick={() => shuffleQuestions(activeTopicIdx)}
              className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              Randomize Questions
            </button>

            {/* randomize A/B/C/D positions */}
            <button
              onClick={() => randomizeAnswers(activeTopicIdx)}
              className="px-4 py-2 text-white bg-teal-600 rounded hover:bg-teal-700"
            >
              Randomize Answers
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
