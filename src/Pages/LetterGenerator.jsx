import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const letterTypes = [
  "Missing Script",
  "Assault Report",
  "Complaint",
  "Talk with SUG",
  "Letter to ICT",
  "Letter to Dean",
  "Letter to SPE President",
  "Letter to NSE President",
  "Custom Letter",
];

const LetterGenerator = () => {
  const [formData, setFormData] = useState({
    senderName: "",
    recipient: "",
    letterType: "",
    subject: "",
    message: "",
    course: "",
    description: "",
  });

  const [generated, setGenerated] = useState("");
  const letterRef = useRef();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const autoGenerateLetter = () => {
    const { letterType, senderName, recipient, subject, course, description } =
      formData;
    const today = new Date().toLocaleDateString();

    let body = "";

    switch (letterType) {
      case "Missing Script":
        body = `I am writing to formally report that my script for the course "${course}" appears to be missing from the recently released results. I prepared diligently for the examination and completed all requirements. I kindly request your assistance in investigating this issue to ensure that my academic record accurately reflects my efforts.`;
        break;
      case "Assault Report":
        body = `I am writing to bring to your attention a serious incident involving an assault that occurred on campus. I am requesting that the matter be thoroughly investigated and necessary actions be taken to ensure justice and campus safety.`;
        break;
      case "Complaint":
        body = `I would like to lodge a formal complaint regarding a recent event/situation that I found troubling. I believe this issue requires urgent attention to avoid further escalation.`;
        break;
      case "Talk with SUG":
        body = `I respectfully request a meeting with the SUG to discuss pressing student-related matters. This discussion will help build understanding and find potential solutions.`;
        break;
      case "Letter to ICT":
        body = `I am reaching out to report an ongoing issue with my student ICT portal. I am currently experiencing difficulty accessing necessary academic resources. I kindly ask for prompt support.`;
        break;
      case "Letter to Dean":
        body = `Dear Dean,\n\nI am writing to express a concern that affects my academic standing. Your leadership and intervention would be greatly appreciated in resolving this matter.`;
        break;
      case "Letter to SPE President":
        body = `Dear SPE President,\n\nAs a dedicated member of the chapter, I am reaching out to share some ideas for growth and improvement. I would appreciate your feedback and the opportunity to collaborate.`;
        break;
      case "Letter to NSE President":
        body = `Dear NSE President,\n\nI would like to thank you for your dedication and service. I also wish to propose some initiatives that could boost student participation and technical engagement.`;
        break;
      case "Custom Letter":
        body = description || "Write your custom letter here...";
        break;
      default:
        body = "";
    }

    const letter = `Date: ${today}

To: ${recipient || "[Recipient Name]"}
Subject: ${subject || letterType}

Dear ${recipient || "[Recipient Name]"},

${body}

Sincerely,
${senderName || "[Your Name]"}`;

    setGenerated(letter);
  };

  const downloadAsPNG = async () => {
    const canvas = await html2canvas(letterRef.current);
    const link = document.createElement("a");
    link.download = "letter.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadAsPDF = async () => {
    const canvas = await html2canvas(letterRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("letter.pdf");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl p-6 mx-auto my-10 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-center text-gray-800 dark:text-white">
        📄 Letter Generator
      </h2>

      <div className="mb-4">
        <label className="block mb-2 text-sm text-gray-700 dark:text-gray-300">
          Select Letter Type
        </label>
        <select
          name="letterType"
          value={formData.letterType}
          onChange={handleChange}
          className="w-full p-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">-- Choose --</option>
          {letterTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        {formData.letterType === "Missing Script" && (
          <input
            type="text"
            name="course"
            placeholder="Course Name"
            value={formData.course}
            onChange={handleChange}
            className="w-full p-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        )}

        {formData.letterType === "Custom Letter" && (
          <textarea
            rows="4"
            name="description"
            placeholder="Describe what you want the letter to say"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 mt-2 text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
        <input
          type="text"
          name="senderName"
          placeholder="Your Name"
          value={formData.senderName}
          onChange={handleChange}
          className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        <input
          type="text"
          name="recipient"
          placeholder="Recipient Name"
          value={formData.recipient}
          onChange={handleChange}
          className="w-full p-2 text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <input
        type="text"
        name="subject"
        placeholder="Letter Subject"
        value={formData.subject}
        onChange={handleChange}
        className="w-full p-2 mb-4 text-gray-900 bg-white border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700 dark:text-white"
      />

      <button
        onClick={autoGenerateLetter}
        className="px-6 py-2 mb-4 text-white transition-all bg-blue-600 rounded hover:bg-blue-700"
      >
        ✨ Generate Letter
      </button>

      {generated && (
        <>
          <div
            ref={letterRef}
            className="p-4 mt-4 text-sm text-gray-800 whitespace-pre-wrap bg-gray-100 border border-gray-300 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
          >
            {generated}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <button
              onClick={downloadAsPNG}
              className="px-4 py-2 text-sm text-white bg-green-600 rounded hover:bg-green-700"
            >
              🖼️ Download PNG
            </button>
            <button
              onClick={downloadAsPDF}
              className="px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            >
              📄 Download PDF
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 text-sm text-white bg-gray-700 rounded hover:bg-gray-900"
            >
              🖨️ Print Letter
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default LetterGenerator;
