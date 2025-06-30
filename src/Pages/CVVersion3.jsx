"use client"

import { useRef, useState } from "react"

const fonts = {
  Sans: "Arial, sans-serif",
  Serif: "Georgia, serif",
  Monospace: "'Courier New', monospace",
  Roboto: "'Roboto', sans-serif",
  OpenSans: "'Open Sans', sans-serif",
  Lato: "'Lato', sans-serif",
  Poppins: "'Poppins', sans-serif",
}

const CVGenerator = () => {
  const cvRef = useRef(null)
  const [showForm, setShowForm] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    profileImage: null,
    overview: "",
    skills: "",
    font: "Sans",
    bgColor: "#ffffff",
    textColor: "#1f2937",
    accentColor: "#3b82f6",
  })

  const [educationList, setEducationList] = useState([
    { school: "", degree: "", year: "", gpa: "" },
  ])

  const [experienceList, setExperienceList] = useState([
    { title: "", company: "", location: "", year: "", bullets: "" },
  ])

  const [projectsList, setProjectsList] = useState([
    { name: "", description: "", technologies: "", link: "" },
  ])

  const [certificatesList, setCertificatesList] = useState([
    { name: "", issuer: "", year: "" },
  ])

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleEducationChange = (index, field, value) => {
    const newEdu = [...educationList]
    newEdu[index] = { ...newEdu[index], [field]: value }
    setEducationList(newEdu)
  }

  const handleExperienceChange = (index, field, value) => {
    const newExp = [...experienceList]
    newExp[index] = { ...newExp[index], [field]: value }
    setExperienceList(newExp)
  }

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...projectsList]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setProjectsList(newProjects)
  }

  const handleCertificateChange = (index, field, value) => {
    const newCerts = [...certificatesList]
    newCerts[index] = { ...newCerts[index], [field]: value }
    setCertificatesList(newCerts)
  }

  const addEducation = () => {
    setEducationList([...educationList, { school: "", degree: "", year: "", gpa: "" }])
  }

  const removeEducation = (index) => {
    if (educationList.length > 1) {
      setEducationList(educationList.filter((_, i) => i !== index))
    }
  }

  const addExperience = () => {
    setExperienceList([...experienceList, { title: "", company: "", location: "", year: "", bullets: "" }])
  }

  const removeExperience = (index) => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.filter((_, i) => i !== index))
    }
  }

  const addProject = () => {
    setProjectsList([...projectsList, { name: "", description: "", technologies: "", link: "" }])
  }

  const removeProject = (index) => {
    if (projectsList.length > 1) {
      setProjectsList(projectsList.filter((_, i) => i !== index))
    }
  }

  const addCertificate = () => {
    setCertificatesList([...certificatesList, { name: "", issuer: "", year: "" }])
  }

  const removeCertificate = (index) => {
    if (certificatesList.length > 1) {
      setCertificatesList(certificatesList.filter((_, i) => i !== index))
    }
  }

  const clearForm = () => {
    setFormData({
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      website: "",
      profileImage: null,
      overview: "",
      skills: "",
      font: "Sans",
      bgColor: "#ffffff",
      textColor: "#1f2937",
      accentColor: "#3b82f6",
    })
    setEducationList([{ school: "", degree: "", year: "", gpa: "" }])
    setExperienceList([{ title: "", company: "", location: "", year: "", bullets: "" }])
    setProjectsList([{ name: "", description: "", technologies: "", link: "" }])
    setCertificatesList([{ name: "", issuer: "", year: "" }])
  }

  const downloadPDF = async () => {
    if (typeof window !== "undefined") {
      try {
        const html2pdf = (await import("html2pdf.js")).default
        const element = cvRef.current
        const opt = {
          margin: 0.5,
          filename: `${formData.name || "CV"}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2, 
            useCORS: true,
            allowTaint: true,
            letterRendering: true
          },
          jsPDF: { 
            unit: 'in', 
            format: 'a4', 
            orientation: 'portrait' 
          }
        }
        html2pdf().set(opt).from(element).save()
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Error generating PDF. Please try again.')
      }
    }
  }

  const downloadImage = async () => {
    if (typeof window !== "undefined") {
      try {
        const html2canvas = (await import("html2canvas")).default
        const canvas = await html2canvas(cvRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: formData.bgColor
        })
        const link = document.createElement("a")
        link.href = canvas.toDataURL("image/png")
        link.download = `${formData.name || "CV"}.png`
        link.click()
      } catch (error) {
        console.error('Error generating image:', error)
        alert('Error generating image. Please try again.')
      }
    }
  }

  const previewCV = () => {
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">CV Generator</h1>
              <p className="text-gray-600 text-sm lg:text-base">Create your professional resume in minutes</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowForm(!showForm)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {showForm ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Form Section */}
          <div className={`space-y-6 ${showForm ? "block" : "hidden lg:block"}`}>
            {/* Personal Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Personal Information
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Software Engineer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="City, State/Country"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                    <input
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      placeholder="linkedin.com/in/yourprofile"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website/Portfolio</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                  <textarea
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    placeholder="Write a brief professional summary highlighting your key skills and experience..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <textarea
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    placeholder="JavaScript, React, Node.js, Python, AWS, Docker (separate with commas)"
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Styling Options */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                  Styling Options
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                    <select
                      value={formData.font}
                      onChange={(e) => setFormData({ ...formData, font: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                      {Object.keys(fonts).map((font) => (
                        <option key={font} value={font}>
                          {font}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                    <input
                      type="color"
                      value={formData.bgColor}
                      onChange={(e) => setFormData({ ...formData, bgColor: e.target.value })}
                      className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Text Color</label>
                    <input
                      type="color"
                      value={formData.textColor}
                      onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                      className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
                    <input
                      type="color"
                      value={formData.accentColor}
                      onChange={(e) => setFormData({ ...formData, accentColor: e.target.value })}
                      className="w-full h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                    Work Experience
                  </h2>
                  <button
                    onClick={addExperience}
                    className="flex items-center gap-1 px-3 py-2 text-sm bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Experience
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {experienceList.map((exp, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-900">Experience {idx + 1}</h4>
                      {experienceList.length > 1 && (
                        <button
                          onClick={() => removeExperience(idx)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => handleExperienceChange(idx, "title", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => handleExperienceChange(idx, "company", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Location"
                          value={exp.location}
                          onChange={(e) => handleExperienceChange(idx, "location", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g., 2020-2023)"
                          value={exp.year}
                          onChange={(e) => handleExperienceChange(idx, "year", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <textarea
                        placeholder="Key achievements and responsibilities (separate each point with a new line)"
                        value={exp.bullets}
                        onChange={(e) => handleExperienceChange(idx, "bullets", e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    </svg>
                    Education
                  </h2>
                  <button
                    onClick={addEducation}
                    className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Education
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {educationList.map((edu, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-900">Education {idx + 1}</h4>
                      {educationList.length > 1 && (
                        <button
                          onClick={() => removeEducation(idx)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="School/University"
                          value={edu.school}
                          onChange={(e) => handleEducationChange(idx, "school", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <input
                          type="text"
                          placeholder="Degree & Major"
                          value={edu.degree}
                          onChange={(e) => handleEducationChange(idx, "degree", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Year (e.g., 2018-2022)"
                          value={edu.year}
                          onChange={(e) => handleEducationChange(idx, "year", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <input
                          type="text"
                          placeholder="GPA (optional)"
                          value={edu.gpa}
                          onChange={(e) => handleEducationChange(idx, "gpa", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    Projects
                  </h2>
                  <button
                    onClick={addProject}
                    className="flex items-center gap-1 px-3 py-2 text-sm bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Project
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {projectsList.map((project, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-900">Project {idx + 1}</h4>
                      {projectsList.length > 1 && (
                        <button
                          onClick={() => removeProject(idx)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Project Name"
                        value={project.name}
                        onChange={(e) => handleProjectChange(idx, "name", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <textarea
                        placeholder="Project Description"
                        value={project.description}
                        onChange={(e) => handleProjectChange(idx, "description", e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Technologies Used"
                          value={project.technologies}
                          onChange={(e) => handleProjectChange(idx, "technologies", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <input
                          type="url"
                          placeholder="Project Link (optional)"
                          value={project.link}
                          onChange={(e) => handleProjectChange(idx, "link", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Certifications
                  </h2>
                  <button
                    onClick={addCertificate}
                    className="flex items-center gap-1 px-3 py-2 text-sm bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add Certificate
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {certificatesList.map((cert, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium text-gray-900">Certificate {idx + 1}</h4>
                      {certificatesList.length > 1 && (
                        <button
                          onClick={() => removeCertificate(idx)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Certificate Name"
                          value={cert.name}
                          onChange={(e) => handleCertificateChange(idx, "name", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <input
                          type="text"
                          placeholder="Issuing Organization"
                          value={cert.issuer}
                          onChange={(e) => handleCertificateChange(idx, "issuer", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Year Obtained"
                        value={cert.year}
                        onChange={(e) => handleCertificateChange(idx, "year", e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pb-8">
              <button
                onClick={downloadPDF}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
              <button
                onClick={downloadImage}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Download Image
              </button>
              <button
                onClick={previewCV}
                className="lg:hidden flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Preview CV
              </button>
              <button
                onClick={clearForm}
                className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-red-300 text-red-700 rounded-xl hover:bg-red-50 transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All
              </button>
            </div>
          </div>

          {/* CV Preview */}
          <div className={`${showForm ? "hidden lg:block" : "block"} lg:sticky lg:top-4 lg:h-fit`}>
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div
                ref={cvRef}
                className="bg-white min-h-[800px]"
                style={{
                  backgroundColor: formData.bgColor,
                  color: formData.textColor,
                  fontFamily: fonts[formData.font],
                }}
              >
                {/* Header Section with Profile Image and Personal Info */}
                <div
                  className="relative p-8 text-white"
                  style={{ backgroundColor: formData.accentColor }}
                >
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      {formData.profileImage ? (
                        <img
                          src={formData.profileImage || "/placeholder.svg"}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white flex items-center justify-center">
                          <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Personal Information */}
                    <div className="flex-1 text-center md:text-left">
                      <h1 className="text-4xl font-bold mb-2">{formData.name || "Your Name"}</h1>
                      <p className="text-xl mb-4 opacity-90">{formData.title || "Your Professional Title"}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                        {formData.email && (
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="truncate">{formData.email}</span>
                          </div>
                        )}
                        {formData.phone && (
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{formData.phone}</span>
                          </div>
                        )}
                        {formData.location && (
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="truncate">{formData.location}</span>
                          </div>
                        )}
                        {formData.linkedin && (
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                            </svg>
                            <span className="truncate">{formData.linkedin}</span>
                          </div>
                        )}
                        {formData.website && (
                          <div className="flex items-center justify-center md:justify-start gap-2 md:col-span-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                            </svg>
                            <span className="truncate">{formData.website}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Sections */}
                <div className="p-8 space-y-8">
                  {/* Professional Summary */}
                  {formData.overview && (
                    <section>
                      <h2
                        className="text-2xl font-bold mb-4 pb-2 border-b-2"
                        style={{ borderColor: formData.accentColor }}
                      >
                        Professional Summary
                      </h2>
                      <p className="text-sm leading-relaxed">{formData.overview}</p>
                    </section>
                  )}

                  {/* Skills */}
                  {formData.skills && (
                    <section>
                      <h2
                        className="text-2xl font-bold mb-4 pb-2 border-b-2"
                        style={{ borderColor: formData.accentColor }}
                      >
                        Skills
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.split(",").map((skill, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                            style={{ backgroundColor: `${formData.accentColor}20`, color: formData.accentColor }}
                          >
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Professional Experience */}
                  {experienceList.some((exp) => exp.title || exp.company) && (
                    <section>
                      <h2
                        className="text-2xl font-bold mb-6 pb-2 border-b-2"
                        style={{ borderColor: formData.accentColor }}
                      >
                        Professional Experience
                      </h2>
                      <div className="space-y-6">
                        {experienceList.map((exp, idx) => (
                          <div
                            key={idx}
                            className="relative pl-6 border-l-2"
                            style={{ borderColor: formData.accentColor }}
                          >
                            <div
                              className="absolute w-4 h-4 rounded-full -left-2 top-1"
                              style={{ backgroundColor: formData.accentColor }}
                            ></div>
                            <div className="mb-3">
                              <h3 className="text-lg font-semibold">{exp.title}</h3>
                              <p className="text-base font-medium" style={{ color: formData.accentColor }}>
                                {exp.company} {exp.location && `• ${exp.location}`}
                              </p>
                              <p className="text-sm opacity-70">{exp.year}</p>
                            </div>
                            {exp.bullets && (
                              <ul className="text-sm space-y-1 list-disc list-inside ml-4">
                                {exp.bullets
                                  .split("\n")
                                  .filter((line) => line.trim())
                                  .map((line, i) => (
                                    <li key={i} className="leading-relaxed">
                                      {line.trim()}
                                    </li>
                                  ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Projects */}
                  {projectsList.some((project) => project.name || project.description) && (
                    <section>
                      <h2
                        className="text-2xl font-bold mb-6 pb-2 border-b-2"
                        style={{ borderColor: formData.accentColor }}
                      >
                        Projects
                      </h2>
                      <div className="space-y-6">
                        {projectsList.map((project, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-start justify-between">
                              <h3 className="text-lg font-semibold">{project.name}</h3>
                              {project.link && (
                                <a
                                  href={project.link}
                                  className="text-sm underline"
                                  style={{ color: formData.accentColor }}
                                >
                                  View Project
                                </a>
                              )}
                            </div>
                            {project.description && (
                              <p className="text-sm leading-relaxed">{project.description}</p>
                            )}
                            {project.technologies && (
                              <p className="text-sm">
                                <span className="font-medium">Technologies: </span>
                                <span style={{ color: formData.accentColor }}>{project.technologies}</span>
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Education */}
                  {educationList.some((edu) => edu.school || edu.degree) && (
                    <section>
                      <h2
                        className="text-2xl font-bold mb-6 pb-2 border-b-2"
                        style={{ borderColor: formData.accentColor }}
                      >
                        Education
                      </h2>
                      <div className="space-y-4">
                        {educationList.map((edu, i) => (
                          <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                            <div>
                              <h3 className="text-lg font-semibold">{edu.degree}</h3>
                              <p className="text-base" style={{ color: formData.accentColor }}>
                                {edu.school}
                              </p>
                              {edu.gpa && (
                                <p className="text-sm opacity-70">GPA: {edu.gpa}</p>
                              )}
                            </div>
                            <span className="text-sm opacity-70 md:text-right">{edu.year}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Certifications */}
                  {certificatesList.some((cert) => cert.name || cert.issuer) && (
                    <section>
                      <h2
                        className="text-2xl font-bold mb-6 pb-2 border-b-2"
                        style={{ borderColor: formData.accentColor }}
                      >
                        Certifications
                      </h2>
                      <div className="space-y-4">
                        {certificatesList.map((cert, i) => (
                          <div key={i} className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                            <div>
                              <h3 className="text-lg font-semibold">{cert.name}</h3>
                              <p className="text-base" style={{ color: formData.accentColor }}>
                                {cert.issuer}
                              </p>
                            </div>
                            <span className="text-sm opacity-70 md:text-right">{cert.year}</span>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CVGenerator