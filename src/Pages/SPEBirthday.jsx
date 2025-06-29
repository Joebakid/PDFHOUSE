import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { HiSparkles } from "react-icons/hi";

const SPEBirthday = () => {
  const cardRef = useRef();

  const [form, setForm] = useState({
    name: "",
    position: "",
    date: "",
    message: "",
    bgColor: "#d7e9fb",
    image: null,
    frameColor: "#ffffff",
  });

  const LOGO_URL = "/spe.jpg"; // Image should be inside public/spe.jpg

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const download = (format) => {
    if (!cardRef.current) return;
    html2canvas(cardRef.current, {
      useCORS: true,
      allowTaint: false,
      backgroundColor: null,
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = `SPE_Birthday_Post.${format}`;
      link.href =
        format === "png"
          ? canvas.toDataURL("image/png")
          : canvas.toDataURL("image/jpeg", 0.9);
      link.click();
    });
  };

  return (
    <div>
      <div className="min-h-screen pb-10 mt-10 text-black transition-all duration-300 bg-gray-100 dark:bg-gray-900 dark:text-white">
        {/* Card Preview */}
        <div
          ref={cardRef}
          className="relative max-w-sm p-6 mx-auto rounded-lg shadow-lg"
          style={{
            backgroundColor: form.bgColor,
            border: "8px solid white",
            backgroundImage: "url('/wave-bg.svg')",
            backgroundSize: "cover",
            color: "#000",
          }}
        >
          {/* Logo and Header */}
          <div className="flex items-center justify-center mb-4 space-x-3 text-center">
            <img
              src={LOGO_URL}
              alt="SPE Logo"
              className="object-contain w-10 h-10"
              style={{ mixBlendMode: "multiply" }}
            />
            <span className="text-sm font-bold uppercase leading-tight max-w-[200px]">
              Society of Petroleum Engineers, FUPRE Student Chapter
            </span>
          </div>

          {/* Image Frame */}
          {form.image && (
            <div className="flex justify-center mb-4">
              <div
                className="relative rounded shadow-md"
                style={{
                  border: `4px solid ${form.frameColor}`,
                  backgroundColor: form.frameColor,
                  padding: "6px",
                  width: "180px",
                }}
              >
                <img
                  src={form.image}
                  alt="profile"
                  className="object-contain w-full max-h-[220px] mx-auto"
                  style={{ display: "block" }}
                />
                {/* Position Text Bar */}
                <div
                  className="w-full px-1 py-1 mt-2 text-xs font-semibold text-center"
                  style={{ backgroundColor: form.frameColor }}
                >
                  {form.position}
                </div>
              </div>
            </div>
          )}

          {/* Date */}
          {form.date && (
            <p className="mb-4 font-bold text-center text-blue-900 text-md">
              🎉 {form.date}
            </p>
          )}

          {/* Name */}
          <div className="mb-2 text-center">
            <h2 className="text-2xl font-bold">{form.name}</h2>
          </div>

          {/* Sparkles */}
          <div className="flex justify-center mb-2 space-x-1 text-xl text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <HiSparkles key={i} />
            ))}
          </div>

          {/* Message */}
          <p className="px-2 italic text-center">{form.message}</p>

          <p className="mt-4 text-sm font-semibold text-center">
            Courtesy: SPE Publicity Team
          </p>
        </div>

        {/* Form Inputs */}
        <div className="max-w-sm p-4 mx-auto mt-6 text-black transition bg-white rounded shadow dark:bg-gray-800 dark:text-white">
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full p-2 mb-3 rounded dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-3 py-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={handleChange}
          />
          <input
            type="text"
            name="position"
            placeholder="Position"
            className="w-full px-3 py-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={handleChange}
          />
          <input
            type="text"
            name="date"
            placeholder="Date (e.g., 29th June)"
            className="w-full px-3 py-2 mb-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Birthday Message"
            className="w-full px-3 py-2 mb-3 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            rows={3}
            onChange={handleChange}
          />
          <label className="block mb-1">Background Color</label>
          <input
            type="color"
            name="bgColor"
            value={form.bgColor}
            onChange={handleChange}
            className="w-20 mb-4"
          />
          <label className="block mb-1">Frame Color</label>
          <input
            type="color"
            name="frameColor"
            value={form.frameColor}
            onChange={handleChange}
            className="w-20 mb-4"
          />

          <div className="flex gap-4">
            <button
              onClick={() => download("png")}
              className="flex-1 px-3 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
            >
              Download PNG
            </button>
            <button
              onClick={() => download("jpg")}
              className="flex-1 px-3 py-2 text-white transition bg-green-600 rounded hover:bg-green-700"
            >
              Download JPG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SPEBirthday;
