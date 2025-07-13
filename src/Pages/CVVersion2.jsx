import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const fonts = {
  Sans: "Arial, sans-serif",
  Serif: "Georgia, serif",
  Monospace: "'Courier New', monospace",
};

const fontSizes = {
  Small: "14px",
  Medium: "16px",
  Large: "18px",
};

const CVGeneratorStyled = () => {
  const cvRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    profileImage: null,
    overview: "",
    skills: "",
    font: "Sans",
    fontSize: "Medium",
    bgColor: "#ffffff",
    textColor: "#000000",
  });

  const [educationList, setEducationList] = useState([
    { school: "", degree: "", year: "" },
  ]);

  const [experienceList, setExperienceList] = useState([
    { title: "", company: "", location: "", year: "", bullets: "" },
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleEducationChange = (index, field, value) => {
    const newEdu = [...educationList];
    newEdu[index][field] = value;
    setEducationList(newEdu);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExp = [...experienceList];
    newExp[index][field] = value;
    setExperienceList(newExp);
  };

  const downloadPDF = () => {
    html2pdf()
      .set({
        margin: 0,
        filename: `${formData.name || "cv"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      })
      .from(cvRef.current)
      .save();
  };

  const downloadImage = async () => {
    const canvas = await html2canvas(cvRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${formData.name || "cv"}.png`;
    link.click();
  };

  return (
    <div className="max-w-5xl min-h-screen p-4 mx-auto bg-gray-50 dark:bg-gray-900">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white">
          CV Generator
        </h1>
        <p className="text-gray-400">
          Create your professional resume in minutes
        </p>
        <p className="text-gray-400">For Business / Management CV Generator</p>
      </div>

      {/* Form Inputs */}
      <div className="flex flex-col gap-4">
        <input
          className="p-2 border rounded"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          className="p-2 border rounded"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          className="p-2 border rounded"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          className="p-2 border rounded"
          placeholder="Phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          className="p-2 border rounded"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
        <input
          className="p-2 border rounded"
          placeholder="LinkedIn"
          value={formData.linkedin}
          onChange={(e) =>
            setFormData({ ...formData, linkedin: e.target.value })
          }
        />
        <textarea
          className="p-2 border rounded"
          placeholder="Professional Overview"
          value={formData.overview}
          onChange={(e) =>
            setFormData({ ...formData, overview: e.target.value })
          }
        />
        <textarea
          className="p-2 border rounded"
          placeholder="Skills (comma separated)"
          value={formData.skills}
          onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {/* Font & Size Selectors */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Font Style</label>
          <select
            className="p-2 border rounded"
            value={formData.font}
            onChange={(e) => setFormData({ ...formData, font: e.target.value })}
          >
            {Object.keys(fonts).map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Font Size</label>
          <select
            className="p-2 border rounded"
            value={formData.fontSize}
            onChange={(e) =>
              setFormData({ ...formData, fontSize: e.target.value })
            }
          >
            {Object.keys(fontSizes).map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Color Pickers */}
        <div className="flex flex-col gap-2">
          <label className="text-sm">Background Color</label>
          <input
            type="color"
            value={formData.bgColor}
            onChange={(e) =>
              setFormData({ ...formData, bgColor: e.target.value })
            }
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm">Text Color</label>
          <input
            type="color"
            value={formData.textColor}
            onChange={(e) =>
              setFormData({ ...formData, textColor: e.target.value })
            }
          />
        </div>

        {/* Education Section */}
        <h2 className="mt-6 text-xl font-semibold">Education</h2>
        {educationList.map((edu, idx) => (
          <div key={idx} className="flex flex-col gap-2 p-3 border rounded">
            <input
              className="p-2 border rounded"
              placeholder="School"
              value={edu.school}
              onChange={(e) =>
                handleEducationChange(idx, "school", e.target.value)
              }
            />
            <input
              className="p-2 border rounded"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) =>
                handleEducationChange(idx, "degree", e.target.value)
              }
            />
            <input
              className="p-2 border rounded"
              placeholder="Year"
              value={edu.year}
              onChange={(e) =>
                handleEducationChange(idx, "year", e.target.value)
              }
            />
          </div>
        ))}

        {/* Experience Section */}
        <h2 className="mt-6 text-xl font-semibold">Professional Experience</h2>
        {experienceList.map((exp, idx) => (
          <div key={idx} className="flex flex-col gap-2 p-3 border rounded">
            <input
              className="p-2 border rounded"
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) =>
                handleExperienceChange(idx, "title", e.target.value)
              }
            />
            <input
              className="p-2 border rounded"
              placeholder="Company"
              value={exp.company}
              onChange={(e) =>
                handleExperienceChange(idx, "company", e.target.value)
              }
            />
            <input
              className="p-2 border rounded"
              placeholder="Location"
              value={exp.location}
              onChange={(e) =>
                handleExperienceChange(idx, "location", e.target.value)
              }
            />
            <input
              className="p-2 border rounded"
              placeholder="Year"
              value={exp.year}
              onChange={(e) =>
                handleExperienceChange(idx, "year", e.target.value)
              }
            />
            <textarea
              className="p-2 border rounded"
              placeholder="Achievements or Responsibilities (separate with new lines)"
              value={exp.bullets}
              onChange={(e) =>
                handleExperienceChange(idx, "bullets", e.target.value)
              }
            />
          </div>
        ))}
        <button
          onClick={() =>
            setExperienceList((prev) => [
              ...prev,
              { title: "", company: "", location: "", year: "", bullets: "" },
            ])
          }
          className="self-center px-4 py-2 text-white bg-blue-600 rounded w-fit"
        >
          Add Experience
        </button>

        {/* Download Buttons */}
        <div className="flex flex-col justify-center gap-4 mt-6 sm:flex-row">
          <button
            className="px-4 py-2 text-white bg-black rounded"
            onClick={downloadPDF}
          >
            Download PDF
          </button>
          <button className="px-4 py-2 border rounded" onClick={downloadImage}>
            Download Image
          </button>
        </div>
      </div>

      {/* CV Preview */}
      <div
        ref={cvRef}
        className="p-6 mt-10 bg-white border rounded shadow"
        style={{
          backgroundColor: formData.bgColor,
          color: formData.textColor,
          fontFamily: fonts[formData.font],
          fontSize: fontSizes[formData.fontSize],
        }}
      >
        <div className="text-center">
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile"
              className="object-cover w-32 h-32 mx-auto mb-4 rounded-full"
            />
          )}
          <h1 className="text-2xl font-bold">{formData.name}</h1>
          <p className="italic">{formData.title}</p>
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone}
          </p>
          <p>
            <strong>Location:</strong> {formData.location}
          </p>
          <p>
            <strong>LinkedIn:</strong> {formData.linkedin}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Professional Overview</h2>
          <p>{formData.overview}</p>
        </div>

        <div className="mt-4">
          <h2 className="text-lg font-semibold">Skills</h2>
          <ul className="">
            {formData.skills.split(",").map((s, i) => (
              <li key={i}>{s.trim()}</li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Education</h2>
          {educationList.map((edu, i) => (
            <p key={i}>
              {edu.school} — {edu.degree} ({edu.year})
            </p>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold">Professional Experience</h2>
          {experienceList.map((exp, idx) => (
            <div key={idx} className="mb-4">
              <p className="font-medium">
                {exp.title} — {exp.company}, {exp.location} ({exp.year})
              </p>
              <ul className="ml-6 text-sm ">
                {exp.bullets.split("\n").map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CVGeneratorStyled;
