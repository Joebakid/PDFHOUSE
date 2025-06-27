import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { HiSparkles, HiEmojiHappy } from "react-icons/hi";

const FYBPage = () => {
  const fybRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    nickname: "",
    worstCourse: "",
    favCourse: "",
    favLecturer: "",
    hobbies: "",
    worstLevel: "",
    bestLevel: "",
    plans: "",
    status: "",
    quote: "",
    advice: "",
  });

  const [imageUrl, setImageUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleDownload = async (format = "png") => {
    const node = fybRef.current;
    await new Promise((resolve) => setTimeout(resolve, 100));

    const canvas = await html2canvas(node, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const dataUrl =
      format === "jpg"
        ? canvas.toDataURL("image/jpeg", 1.0)
        : canvas.toDataURL("image/png");

    const link = document.createElement("a");
    const filename =
      formData.name.trim().toLowerCase().replace(/\s+/g, "_") || "fyb_card";
    link.download = `${filename}.${format}`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="relative min-h-screen px-4 py-6 overflow-hidden bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
      <HiEmojiHappy className="absolute w-10 h-10 text-purple-400 opacity-40 bottom-3 right-3 animate-bounce" />
      <HiSparkles className="absolute w-10 h-10 text-pink-400 opacity-40 top-3 left-3 animate-bounce" />

      {/* Form Section */}
      <div className="max-w-md p-4 mx-auto mb-10 bg-white shadow-lg rounded-xl dark:bg-gray-800 dark:text-white">
        <h2 className="mb-4 text-xl font-semibold text-center text-purple-600 dark:text-purple-300">
          Enter FYB Info
        </h2>
        <div className="space-y-3">
          {[
            ["name", "Name"],
            ["nickname", "Nickname"],
            ["worstCourse", "Worst Course"],
            ["favCourse", "Favourite Course"],
            ["favLecturer", "Favourite Lecturer"],
            ["hobbies", "Hobbies"],
            ["worstLevel", "Worst Level"],
            ["bestLevel", "Best Level"],
            ["plans", "Plans After School"],
            ["status", "Relationship Status"],
            ["quote", "Favourite Quote"],
            ["advice", "Advice to 100L"],
          ].map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mt-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm font-medium">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="dark:text-white"
            />
          </div>
        </div>
      </div>

      {/* Card Section */}
      <div className="flex justify-center">
        <div
          ref={fybRef}
          className="w-[360px] bg-white relative rounded-xl shadow-2xl p-5 text-sm overflow-hidden border-4 border-dashed border-purple-300 dark:bg-gray-900 dark:text-white"
        >
          <h2 className="mb-1 text-2xl font-extrabold text-center text-purple-700 drop-shadow-md dark:text-purple-300">
            🌟 Meet Our FYB 🌟
          </h2>
          <p className="mb-4 text-sm font-medium text-center text-gray-600 dark:text-gray-400">
            Class ’25
          </p>

          {/* Profile Picture */}
          {imageUrl && (
            <div className="relative w-40 h-40 mx-auto mb-4 overflow-hidden border-4 border-pink-400 rounded-full shadow-md">
              <img
                src={imageUrl}
                alt="FYB"
                className="absolute inset-0 object-cover w-full h-full"
              />
            </div>
          )}

          {/* FYB Info */}
          <div className="relative z-10 space-y-1 text-gray-800 dark:text-gray-100">
            <p>
              <strong>Name:</strong> {formData.name}
            </p>
            <p>
              <strong>Nickname:</strong> {formData.nickname}
            </p>
            <p>
              <strong>Worst Course:</strong> {formData.worstCourse}
            </p>
            <p>
              <strong>Favourite Course:</strong> {formData.favCourse}
            </p>
            <p>
              <strong>Favourite Lecturer:</strong> {formData.favLecturer}
            </p>
            <p>
              <strong>Hobbies:</strong> {formData.hobbies}
            </p>
            <p>
              <strong>Worst Level:</strong> {formData.worstLevel}
            </p>
            <p>
              <strong>Best Level:</strong> {formData.bestLevel}
            </p>
            <p>
              <strong>Plans:</strong> {formData.plans}
            </p>
            <p>
              <strong>Status:</strong> {formData.status}
            </p>
            <p>
              <strong>Quote:</strong> {formData.quote}
            </p>
            <p>
              <strong>Advice:</strong> {formData.advice}
            </p>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handleDownload("png")}
          className="px-4 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
        >
          Download PNG
        </button>
        <button
          onClick={() => handleDownload("jpg")}
          className="px-4 py-2 text-white bg-pink-500 rounded hover:bg-pink-600"
        >
          Download JPG
        </button>
      </div>
    </div>
  );
};

export default FYBPage;
