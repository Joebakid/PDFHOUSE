"use client"

import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Minimize2, Maximize2, FileText } from "lucide-react"

const allJSONFiles = import.meta.glob("/src/JSON/**/*.json")

function Doc({ name, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#00CCFF] text-white px-4 py-3 rounded-xl font-medium shadow hover:bg-[#00b0e6] transition flex items-center gap-2 max-w-xs break-words duration-200"
    >
      <FileText size={18} />
      <span className="truncate">{name}</span>
    </a>
  )
}

function CourseSection({ title, docs }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-6 text-left">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold transition-colors duration-200 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">({docs.length} files)</span>
          {isOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 mt-4 rounded-lg bg-gray-50">
          {docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((doc, index) => (
                <Doc key={index} name={doc.name} href={doc.href} />
              ))}
            </div>
          ) : (
            <p className="italic text-center text-gray-500">No PDFs uploaded yet.</p>
          )}
        </div>
      )}
    </div>
  )
}

function parseSections(data) {
  console.log("=== Parsing Sections ===")
  console.log("Raw data received:", data)
  console.log("Data type:", typeof data)
  console.log("Is array:", Array.isArray(data))
  console.log("Object keys:", Object.keys(data))

  // Handle different possible JSON structures for 500 level
  if (!data || typeof data !== "object") {
    console.log("❌ Invalid data structure")
    return []
  }

  // If data is empty object
  if (Object.keys(data).length === 0) {
    console.log("❌ Empty data object")
    return []
  }

  // Try different parsing strategies
  const sections = []

  // Strategy 1: Direct array of docs (like 100-400 levels)
  if (Array.isArray(data)) {
    console.log("📋 Data is direct array")
    sections.push({ title: "MATERIALS", docs: data })
  }
  // Strategy 2: Object with nested structure
  else {
    Object.entries(data).forEach(([key, value]) => {
      console.log(`Processing key: ${key}, value type: ${typeof value}`, value)

      if (Array.isArray(value)) {
        console.log(`✅ Found array for ${key}:`, value)
        sections.push({ title: key.toUpperCase(), docs: value })
      } else if (typeof value === "object" && value !== null) {
        // Handle nested objects
        Object.entries(value).forEach(([subKey, subValue]) => {
          console.log(`Processing nested key: ${subKey}, value type: ${typeof subValue}`, subValue)
          if (Array.isArray(subValue)) {
            console.log(`✅ Found nested array for ${subKey}:`, subValue)
            sections.push({ title: `${key.toUpperCase()} - ${subKey.toUpperCase()}`, docs: subValue })
          }
        })
      }
    })
  }

  console.log("Final parsed sections:", sections)
  console.log("=== End Parsing ===")
  return sections
}

// New function specifically for 500 level structure
function load500LevelPDFs(department, semester) {
  console.log("=== 500 Level Debug Info ===")
  console.log("Original department:", department)
  console.log("Original semester:", semester)

  const formattedDepartment = department.split(" ")[0].toLowerCase()
  const formattedSemester = `${semester.toLowerCase()}-semester`

  console.log("Formatted department:", formattedDepartment)
  console.log("Formatted semester:", formattedSemester)

  // Based on the actual file structure from console output, prioritize the most likely paths
  const possiblePaths = []

  // First, try the most specific paths based on the department
  if (formattedDepartment === "marine") {
    possiblePaths.push(
      `/src/JSON/500/technology/${formattedSemester}/marine/general.json`,
      `/src/JSON/500/technology/${formattedSemester}/marine/subdivsion/naval.json`,
      `/src/JSON/500/technology/${formattedSemester}/marine/subdivsion/offshore.json`,
      `/src/JSON/500/technology/${formattedSemester}/marine/subdivsion/powerplant.json`,
    )
  } else if (formattedDepartment === "chemical") {
    possiblePaths.push(
      `/src/JSON/500/technology/${formattedSemester}/chemical/general.json`,
      `/src/JSON/500/technology/${formattedSemester}/chemical/subdivision/biochemical.json`,
      `/src/JSON/500/technology/${formattedSemester}/chemical/subdivision/energy.json`,
      `/src/JSON/500/technology/${formattedSemester}/chemical/subdivision/env.json`,
      `/src/JSON/500/technology/${formattedSemester}/chemical/subdivision/material.json`,
      `/src/JSON/500/technology/${formattedSemester}/chemical/subdivision/process.json`,
    )
  } else if (formattedDepartment === "electrical") {
    possiblePaths.push(
      `/src/JSON/500/technology/${formattedSemester}/electrical/general.json`,
      `/src/JSON/500/technology/${formattedSemester}/electrical/subdivision/electronic.json`,
      `/src/JSON/500/technology/${formattedSemester}/electrical/subdivision/instrment.json`,
      `/src/JSON/500/technology/${formattedSemester}/electrical/subdivision/power.json`,
    )
  } else if (formattedDepartment === "mechanical") {
    possiblePaths.push(
      `/src/JSON/500/technology/${formattedSemester}/mechanical/general.json`,
      `/src/JSON/500/technology/${formattedSemester}/mechanical/subdivision/production.json`,
      `/src/JSON/500/technology/${formattedSemester}/mechanical/subdivision/thermoflud.json`,
    )
  }

  // Then add general paths
  possiblePaths.push(
    `/src/JSON/500/technology/${formattedSemester}/${formattedDepartment}.json`,
    `/src/JSON/500/science/${formattedSemester}/${formattedDepartment}.json`,
    `/src/JSON/500/technology/${formattedSemester}/general.json`,
  )

  // Special handling for petroleum (due to typo in filename)
  if (formattedDepartment === "petroleum") {
    possiblePaths.unshift(`/src/JSON/500/technology/${formattedSemester}/petroluem.json`)
  }

  console.log("Possible paths to check:", possiblePaths)
  console.log("=== End Debug Info ===")

  return possiblePaths
}

function PDFViewer({ BackButton }) {
  const location = useLocation()
  const { level, college, department, semester } = location.state || {}

  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadPDFs = async () => {
      setLoading(true)
      setError(null)

      if (!level || !semester || !department) {
        setSections([])
        setLoading(false)
        return
      }

      // Handle 500 level separately
      if (level === "500") {
        console.log("Processing 500 level request...")
        console.log("Department received:", department)
        console.log("Semester received:", semester)

        try {
          const possiblePaths = load500LevelPDFs(department, semester)

          if (!possiblePaths || possiblePaths.length === 0) {
            console.log("❌ No possible paths generated")
            setError(`Department "${department}" not found in 500 level structure. Check console for details.`)
            setLoading(false)
            return
          }

          const loadedSections = []
          const foundFiles = []

          // Try each possible path and collect all valid files
          for (const deptPath of possiblePaths) {
            console.log("Checking path:", deptPath)

            if (allJSONFiles[deptPath]) {
              console.log("✅ JSON file found at:", deptPath)
              foundFiles.push(deptPath)

              try {
                const deptModule = await allJSONFiles[deptPath]()
                const deptData = deptModule.default
                console.log(`Loaded data from ${deptPath}:`, deptData)

                const deptSections = parseSections(deptData)
                if (deptSections.length > 0) {
                  loadedSections.push(...deptSections)
                }
              } catch (fileError) {
                console.error(`Error loading ${deptPath}:`, fileError)
              }
            }
          }

          console.log("Found files:", foundFiles)
          console.log("Total loaded sections:", loadedSections)

          if (foundFiles.length === 0) {
            console.log("❌ No JSON files found at any of the possible paths")
            console.log("Available paths that match 500 level:")
            Object.keys(allJSONFiles)
              .filter((path) => path.includes("/500/"))
              .forEach((path) => {
                console.log("  -", path)
              })
          }

          if (loadedSections.length === 0) {
            loadedSections.push({ title: "NO MATERIALS", docs: [] })
          }

          setSections(loadedSections)
        } catch (err) {
          console.error("Error loading 500 level materials:", err)
          setError(err.message)
          setSections([])
        } finally {
          setLoading(false)
        }
        return
      }

      // Existing logic for 100-400 levels (unchanged)
      if (!college) {
        setSections([])
        setLoading(false)
        return
      }

      const formattedLevel = level.toLowerCase()
      const formattedCollege = college.toLowerCase()
      const formattedSemester = `${semester.toLowerCase()}-semester`
      const formattedDepartment = department.split(" ")[0].toLowerCase()

      // Only support levels from 100 to 400
      const supportedLevels = ["100", "200", "300", "400"]
      if (!supportedLevels.includes(level)) {
        setError("Only 100 to 400 level materials are supported.")
        setLoading(false)
        return
      }

      try {
        const deptPath = `/src/JSON/${formattedLevel}/${formattedCollege}/${formattedSemester}/${formattedDepartment}.json`
        const generalPath = `/src/JSON/${formattedLevel}/${formattedCollege}/${formattedSemester}/general.json`

        const loadedSections = []

        // Load department-specific materials
        if (allJSONFiles[deptPath]) {
          const deptModule = await allJSONFiles[deptPath]()
          const deptData = deptModule.default
          const deptSections = parseSections(deptData)
          loadedSections.push(...deptSections)
        }

        // Load general materials for everyone (if available)
        if (allJSONFiles[generalPath]) {
          const generalModule = await allJSONFiles[generalPath]()
          const generalData = generalModule.default
          const generalSections = parseSections({ general: generalData })
          loadedSections.push(...generalSections)
        }

        if (loadedSections.length === 0) {
          loadedSections.push({ title: "NO MATERIALS", docs: [] })
        }

        setSections(loadedSections)
      } catch (err) {
        setError(err.message)
        setSections([])
      } finally {
        setLoading(false)
      }
    }

    loadPDFs()
  }, [level, college, department, semester])

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <header className="mb-8">
        <BackButton />
        <div className="mt-4 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">Course Materials</h1>
          <p className="mb-1 text-gray-600">Access and download course materials for {department || "N/A"}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {level !== "500" && (
              <>
                <span>College: {college || "N/A"}</span>
                <span>|</span>
              </>
            )}
            <span>Level: {level || "N/A"}</span>
            <span>|</span>
            <span>Semester: {semester || "N/A"}</span>
          </div>
        </div>
      </header>

      <main>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CCFF] mb-4"></div>
            <p className="text-gray-500">Loading course materials...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <div className="max-w-md p-6 mx-auto border border-red-200 rounded-lg bg-red-50">
              <p className="mb-2 text-red-600">{error}</p>
              <p className="text-sm text-gray-500">Make sure the JSON file exists in the correct location.</p>
            </div>
          </div>
        ) : sections.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-medium text-gray-500">No PDFs uploaded yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map(({ title, docs }, index) => (
              <CourseSection key={index} title={title} docs={docs} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default PDFViewer
