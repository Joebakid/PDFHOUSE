import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import html2pdf from "html2pdf.js";

const fonts = {
  Sans: "Arial, sans-serif",
  Serif: "Georgia, serif",
  Monospace: "Courier New, monospace",
};

const ResumeThree = () => {
  const resumeRef = useRef();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    phone: "",
    email: "",
    address: "",
    about:
      "",
    skills: "",
    experience:
      "",
    education:
      "",
    certifications:
      "",
    font: "Sans",
    fontSize: "16",
    fontColor: "#000000",
    border: true,
    photoStyle: "square",
    photo: null,
    imageSize: 150, // NEW
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const downloadPDF = () => {
    html2pdf()
      .set({
        margin: 0,
        filename: `${formData.name || "resume"}.pdf`,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
      })
      .from(resumeRef.current)
      .save();
  };

  const downloadImage = async () => {
    const canvas = await html2canvas(resumeRef.current, { scale: 2 });
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `${formData.name || "resume"}.png`;
    link.click();
  };

  const printResume = () => {
    const printWindow = window.open();
    printWindow.document.write(
      `<html><head><title>Print</title></head><body>${resumeRef.current.innerHTML}</body></html>`
    );
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <div className="mb-6 space-y-4">
  <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-white">
          CV Generator
        </h1>
        <p className="text-gray-400">
          Create your professional resume in minutes
        </p>
        <p className="text-gray-400">
         For Everyone
        </p>
      </div>

        {/* Editable Fields */}
        <input type="text" placeholder="Full Name" className="w-full p-4 border rounded" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="text" placeholder="Title" className="w-full p-4 border rounded" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <input type="text" placeholder="Phone" className="w-full p-4 border rounded" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        <input type="email" placeholder="Email" className="w-full p-4 border rounded" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        <input type="text" placeholder="Address" className="w-full p-4 border rounded" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
        <textarea placeholder="About Me" className="w-full p-4 border rounded" value={formData.about} onChange={(e) => setFormData({ ...formData, about: e.target.value })} />
        <textarea placeholder="Skills (newline separated)" className="w-full p-4 border rounded" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
        <textarea placeholder="Experience" className="w-full p-2 border rounded" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
        <textarea placeholder="Education" className="w-full p-2 border rounded" value={formData.education} onChange={(e) => setFormData({ ...formData, education: e.target.value })} />
        <textarea placeholder="Certifications" className="w-full p-2 border rounded" value={formData.certifications} onChange={(e) => setFormData({ ...formData, certifications: e.target.value })} />

        {/* Photo */}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <div className="flex gap-4 flex-wrap items-center">
          <select value={formData.photoStyle} onChange={(e) => setFormData({ ...formData, photoStyle: e.target.value })} className="p-2 border rounded">
            <option value="square">Square</option>
            <option value="circle">Circle</option>
          </select>

          {/* ✅ New: Image Size */}
          <label className="flex flex-col text-sm">
            Image Size ({formData.imageSize}px)
            <input
              type="range"
              min="50"
              max="300"
              value={formData.imageSize}
              onChange={(e) => setFormData({ ...formData, imageSize: parseInt(e.target.value) })}
            />
          </label>
        </div>

        {/* Font and color */}
        <select value={formData.font} onChange={(e) => setFormData({ ...formData, font: e.target.value })} className="p-2 border rounded">
          {Object.keys(fonts).map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
        <input type="color" value={formData.fontColor} onChange={(e) => setFormData({ ...formData, fontColor: e.target.value })} />
        <input type="number" min="10" max="30" value={formData.fontSize} onChange={(e) => setFormData({ ...formData, fontSize: e.target.value })} />
        <label>
          <input type="checkbox" checked={formData.border} onChange={(e) => setFormData({ ...formData, border: e.target.checked })} /> Add Frame
        </label>

        {/* Actions */}
        <div className="flex gap-4 flex-wrap">
          <button className="px-4 py-2 bg-black text-white rounded" onClick={downloadPDF}>Download PDF</button>
          <button className="px-4 py-2 border rounded" onClick={downloadImage}>Download Image</button>
          <button className="px-4 py-2 border rounded" onClick={printResume}>Print</button>
        </div>
      </div>

      {/* Resume Preview */}
      <div
        ref={resumeRef}
        className={`bg-white p-6 ${formData.border ? "border border-black" : ""}`}
        style={{
          fontFamily: fonts[formData.font],
          fontSize: `${formData.fontSize}px`,
          color: formData.fontColor,
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-4">
            {formData.photo && (
              <img
                src={formData.photo}
                alt="Profile"
                className={`${formData.photoStyle === "circle" ? "rounded-full" : "rounded"}`}
                style={{ width: `${formData.imageSize}px`, height: `${formData.imageSize}px`, objectFit: "cover" }}
              />
            )}
            <h1 className="text-2xl font-bold">{formData.name}</h1>
            <p className="italic">{formData.title}</p>
          </div>
          <div className="col-span-2 space-y-4">
            <div>
              <strong>Phone:</strong> {formData.phone}<br />
              <strong>Email:</strong> {formData.email}<br />
              <strong>Address:</strong> {formData.address}
            </div>
            <div>
              <h2 className="font-bold">About me</h2>
              <p>{formData.about}</p>
            </div>
            <div>
              <h2 className="font-bold">Skills</h2>
              <ul className="list-disc list-inside">
                {formData.skills.split("\n").map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-bold">Experience</h2>
              <p>{formData.experience}</p>
            </div>
            <div>
              <h2 className="font-bold">Education</h2>
              <p>{formData.education}</p>
            </div>
            <div>
              <h2 className="font-bold">Certifications</h2>
              <p>{formData.certifications}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeThree;
