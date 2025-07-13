import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const CVGenerator = () => {
  const cvRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    github: "",
    education: [{ school: "", degree: "", startDate: "", endDate: "" }],
    skills: "",
    profileImage: null,
  });

  const [experienceInputList, setExperienceInputList] = useState([
    {
      experience: "",
      date: "",
      description: "",
      project: "",
      languages: "",
    },
  ]);

  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(16);

  const handleEducationChange = (index, field, value) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        { school: "", degree: "", startDate: "", endDate: "" },
      ],
    }));
  };

  const handleInputChange = (index, field, value) => {
    const updated = [...experienceInputList];
    updated[index][field] = value;
    setExperienceInputList(updated);
  };

  const addExperienceInput = () => {
    setExperienceInputList([
      ...experienceInputList,
      {
        experience: "",
        date: "",
        description: "",
        project: "",
        languages: "",
      },
    ]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = () => {
    const clone = cvRef.current.cloneNode(true);
    const inputs = clone.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      const div = document.createElement("div");
      div.textContent = input.value;
      div.style.whiteSpace = "pre-wrap";
      div.style.marginBottom = "4px";
      input.parentNode.replaceChild(div, input);
    });

    // Remove aspect ratio and set height to auto for PDF generation
    clone.style.aspectRatio = "unset";
    clone.style.height = "auto";

    html2pdf()
      .set({
        margin: [20, 20, 20, 20], // top, left, bottom, right
        filename: `${formData.name || "cv"}.pdf`,
        html2canvas: {
          scale: 2,
          backgroundColor: bgColor,
          useCORS: true,
          logging: false,
        },
        jsPDF: {
          unit: "pt",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: ["css"], avoid: ["h1", "h2", "h3"] },
      })
      .from(clone)
      .save();
  };

  const downloadAsImage = async () => {
    const element = cvRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: bgColor,
      useCORS: true,
    });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${formData.name || "cv"}.png`;
    link.click();
  };

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white">
          CV Generator
        </h1>
        <p className="text-gray-400">Create your professional resume in minutes</p>
        <p className="text-gray-400">for Web Developers</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Website"
          className="w-full p-2 border rounded"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
        />
        <input
          type="text"
          placeholder="GitHub"
          className="w-full p-2 border rounded"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full"
        />
      </div>

      {/* Settings */}
      <div className="flex flex-wrap items-center gap-6 mb-6">
        <label className="flex items-center gap-2">
          Text Color:
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2">
          Background:
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
        <label className="flex items-center gap-2">
          Font Size:
          <input
            type="range"
            min="12"
            max="24"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
          <span>{fontSize}px</span>
        </label>
      </div>

      {/* Education */}
      <h3 className="mb-2 text-lg font-semibold">Education</h3>
      {formData.education.map((edu, i) => (
        <div key={i} className="grid grid-cols-1 gap-4 mb-2 sm:grid-cols-2">
          <input
            type="text"
            placeholder="School"
            className="w-full p-2 border rounded"
            value={edu.school}
            onChange={(e) => handleEducationChange(i, "school", e.target.value)}
          />
          <input
            type="text"
            placeholder="Degree"
            className="w-full p-2 border rounded"
            value={edu.degree}
            onChange={(e) => handleEducationChange(i, "degree", e.target.value)}
          />
          <input
            type="text"
            placeholder="Start Date"
            className="w-full p-2 border rounded"
            value={edu.startDate}
            onChange={(e) => handleEducationChange(i, "startDate", e.target.value)}
          />
          <input
            type="text"
            placeholder="End Date"
            className="w-full p-2 border rounded"
            value={edu.endDate}
            onChange={(e) => handleEducationChange(i, "endDate", e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={addEducation}
        className="px-4 py-2 mt-2 mb-6 text-white bg-green-600 rounded"
      >
        + Add Education
      </button>

      {/* Skills */}
      <h3 className="mb-2 text-lg font-semibold">Skills & Technologies</h3>
      <textarea
        className="w-full p-2 mb-6 border rounded"
        rows={3}
        placeholder="E.g., JavaScript, React, MongoDB"
        value={formData.skills}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
      />

      {/* Experience */}
      <h3 className="mb-2 text-lg font-semibold">Experience + Project</h3>
      {experienceInputList.map((item, i) => (
        <div key={i} className="grid grid-cols-1 gap-4 mb-4 sm:grid-cols-2">
          <input
            type="text"
            placeholder="Job Title & Company"
            className="w-full p-2 border rounded"
            value={item.experience}
            onChange={(e) => handleInputChange(i, "experience", e.target.value)}
          />
          <input
            type="text"
            placeholder="Date"
            className="w-full p-2 border rounded"
            value={item.date}
            onChange={(e) => handleInputChange(i, "date", e.target.value)}
          />
          <textarea
            placeholder="Description (use line breaks)"
            className="w-full p-2 border rounded"
            value={item.description}
            onChange={(e) => handleInputChange(i, "description", e.target.value)}
          />
          <input
            type="text"
            placeholder="Project Title"
            className="w-full p-2 border rounded"
            value={item.project}
            onChange={(e) => handleInputChange(i, "project", e.target.value)}
          />
          <input
            type="text"
            placeholder="Languages Used"
            className="w-full p-2 border rounded"
            value={item.languages}
            onChange={(e) => handleInputChange(i, "languages", e.target.value)}
          />
        </div>
      ))}
      <button
        onClick={addExperienceInput}
        className="px-4 py-2 mb-6 text-white bg-blue-600 rounded"
      >
        + Add Experience + Project
      </button>

      {/* CV Preview */}
      <div
        ref={cvRef}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          fontSize: `${fontSize}px`,
          padding: "40px",
          boxSizing: "border-box",
          width: "100%",
          maxWidth: "794px", // A4 width in points at 96 DPI
          aspectRatio: "794 / 1123", // A4 aspect ratio for preview
        }}
        className="mx-auto mb-6 overflow-hidden shadow-xl"
      >
        {formData.profileImage && (
          <div className="mb-4 text-center">
            <img
              src={formData.profileImage}
              alt="Profile"
              className="object-cover w-24 h-24 mx-auto rounded-full"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold">{formData.name}</h1>
        <p className="mb-4 text-sm">
          {formData.email} | {formData.website} | {formData.github}
        </p>
        <hr className="my-4" />

        <h2 className="text-xl font-semibold">EDUCATION</h2>
        {formData.education.map((edu, i) => (
          <div key={i}>
            <p className="font-semibold">{edu.school}</p>
            <p>
              {edu.degree} ({edu.startDate} - {edu.endDate})
            </p>
          </div>
        ))}
        <hr className="my-4" />

        <h2 className="text-xl font-semibold">SKILLS</h2>
        <p>{formData.skills}</p>
        <hr className="my-4" />

        <h2 className="text-xl font-semibold">PROFESSIONAL EXPERIENCE & PROJECTS</h2>
        {experienceInputList.map((item, i) => (
          <div key={i} className="mb-4">
            <p className="font-bold">{item.experience}</p>
            <p className="italic">{item.date}</p>
            <ul className="pl-5 list-disc">
              {item.description
                .split("\n")
                .filter((line) => line.trim() !== "")
                .map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
            </ul>
            <p className="mt-1">
              <span className="font-semibold">{item.project}</span> – {item.languages}
            </p>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={generatePDF}
          className="px-6 py-3 text-white bg-black rounded hover:bg-gray-800"
        >
          Download as PDF
        </button>
        <button
          onClick={downloadAsImage}
          className="px-6 py-3 text-black bg-white border rounded hover:bg-gray-100"
        >
          Download as Image
        </button>
      </div>
    </div>
  );
};

export default CVGenerator;