import React, { useState, useRef } from "react";
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
    experienceProjectGroups: [],
    profileImage: null,
  });

  const [experienceProjectInput, setExperienceProjectInput] = useState({
    experience: { title: "", date: "", description: "" },
    project: { title: "", languages: "" },
  });

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

  const handleExperienceChange = (field, value) => {
    setExperienceProjectInput((prev) => ({
      ...prev,
      experience: { ...prev.experience, [field]: value },
    }));
  };

  const handleProjectChange = (field, value) => {
    setExperienceProjectInput((prev) => ({
      ...prev,
      project: { ...prev.project, [field]: value },
    }));
  };

  const addExperienceProjectGroup = () => {
    const { experience, project } = experienceProjectInput;

    if (
      !experience.title.trim() ||
      !experience.date.trim() ||
      !experience.description.trim() ||
      !project.title.trim() ||
      !project.languages.trim()
    ) {
      alert("Please fill in all experience and project fields.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      experienceProjectGroups: [
        ...prev.experienceProjectGroups,
        experienceProjectInput,
      ],
    }));

    setExperienceProjectInput({
      experience: { title: "", date: "", description: "" },
      project: { title: "", languages: "" },
    });
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
    const options = {
      filename: `${formData.name || "my"}-cv.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(cvRef.current).save();
  };

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center sm:text-3xl">
        CV Generator
      </h2>

      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Full Name"
          className="p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Website"
          className="p-2 border rounded"
          value={formData.website}
          onChange={(e) =>
            setFormData({ ...formData, website: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="GitHub"
          className="p-2 border rounded"
          value={formData.github}
          onChange={(e) => setFormData({ ...formData, github: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
      </div>

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
          <span className="w-8 text-sm text-center">{fontSize}px</span>
        </label>
      </div>

      <h3 className="mt-6 mb-2 text-lg font-semibold">Education</h3>
      {formData.education.map((edu, i) => (
        <div key={i} className="grid grid-cols-1 gap-4 mb-2 md:grid-cols-2">
          <input
            type="text"
            placeholder="School"
            className="p-2 border rounded"
            value={edu.school}
            onChange={(e) => handleEducationChange(i, "school", e.target.value)}
          />
          <input
            type="text"
            placeholder="Degree"
            className="p-2 border rounded"
            value={edu.degree}
            onChange={(e) => handleEducationChange(i, "degree", e.target.value)}
          />
          <input
            type="text"
            placeholder="Start Date"
            className="p-2 border rounded"
            value={edu.startDate}
            onChange={(e) =>
              handleEducationChange(i, "startDate", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="End Date"
            className="p-2 border rounded"
            value={edu.endDate}
            onChange={(e) =>
              handleEducationChange(i, "endDate", e.target.value)
            }
          />
        </div>
      ))}
      <button
        onClick={addEducation}
        className="px-4 py-2 mt-2 mb-6 text-white bg-green-600 rounded hover:bg-green-500"
      >
        + Add Education
      </button>

      <h3 className="mb-2 text-lg font-semibold">Skills & Technologies</h3>
      <textarea
        className="w-full p-2 mb-6 border rounded"
        rows={3}
        placeholder="E.g., JavaScript, React, MongoDB"
        value={formData.skills}
        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
      />

      <h3 className="mb-2 text-lg font-semibold">Experience + Project</h3>
      <input
        type="text"
        placeholder="Job Title & Company"
        className="w-full p-2 mb-2 border rounded"
        value={experienceProjectInput.experience.title}
        onChange={(e) => handleExperienceChange("title", e.target.value)}
      />
      <input
        type="text"
        placeholder="Date Range"
        className="w-full p-2 mb-2 border rounded"
        value={experienceProjectInput.experience.date}
        onChange={(e) => handleExperienceChange("date", e.target.value)}
      />
      <textarea
        className="w-full p-2 mb-2 border rounded"
        placeholder="Description"
        value={experienceProjectInput.experience.description}
        onChange={(e) => handleExperienceChange("description", e.target.value)}
      />
      <input
        type="text"
        placeholder="Project Title"
        className="w-full p-2 mb-2 border rounded"
        value={experienceProjectInput.project.title}
        onChange={(e) => handleProjectChange("title", e.target.value)}
      />
      <input
        type="text"
        placeholder="Languages Used"
        className="w-full p-2 mb-2 border rounded"
        value={experienceProjectInput.project.languages}
        onChange={(e) => handleProjectChange("languages", e.target.value)}
      />
      <p className="mb-2 text-sm italic text-red-600">
        Fill all fields and click "+ Add" below to add both experience and
        project.
      </p>
      <button
        onClick={addExperienceProjectGroup}
        className="px-4 py-2 mb-6 text-white bg-blue-600 rounded hover:bg-blue-500"
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
        }}
        className="w-full max-w-[794px] mx-auto mb-6 p-6 border rounded-md shadow"
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

        <h2 className="mt-4 mb-1 text-xl font-semibold">EDUCATION</h2>
        {formData.education.map((edu, i) => (
          <div key={i} className="mb-2">
            <p className="font-semibold">{edu.school}</p>
            <p>
              {edu.degree} ({edu.startDate} – {edu.endDate})
            </p>
          </div>
        ))}

        <h2 className="mt-4 mb-1 text-xl font-semibold">SKILLS</h2>
        <p className="mb-4">{formData.skills}</p>

        <h2 className="mt-4 mb-1 text-xl font-semibold">
          PROFESSIONAL EXPERIENCE & PROJECTS
        </h2>
        {formData.experienceProjectGroups.length === 0 ? (
          <p className="text-sm italic">No experience/project added yet.</p>
        ) : (
          formData.experienceProjectGroups.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2"
            >
              {/* Experience */}
              <div>
                <p className="font-semibold">{item.experience.title}</p>
                <p className="text-sm italic">{item.experience.date}</p>
                {item.experience.description
                  .split("\n")
                  .map((line, idx) => (
                    <p key={idx}>• {line}</p>
                  ))}
              </div>

              {/* Project */}
              <div>
                <p className="font-semibold">
                  Project: {item.project.title}
                </p>
                <p className="text-sm italic">
                  Languages: {item.project.languages}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <button
        onClick={generatePDF}
        className="w-full px-6 py-3 mt-6 text-white bg-black rounded hover:bg-gray-700 sm:w-auto"
      >
        Download CV as PDF
      </button>
    </div>
  );
};

export default CVGenerator;
