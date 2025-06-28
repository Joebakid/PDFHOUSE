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
    department: "",
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
    <div className="relative min-h-screen px-4 py-6 bg-gradient-to-br from-pink-100 via-yellow-100 to-purple-200 dark:from-gray-800 dark:via-gray-900 dark:to-black dark:text-white">
      <HiEmojiHappy className="absolute w-10 h-10 text-purple-400 opacity-40 bottom-3 right-3 animate-bounce" />
      <HiSparkles className="absolute w-10 h-10 text-pink-400 opacity-40 top-3 left-3 animate-bounce" />

      {/* Form */}
      <div className="max-w-md p-4 mx-auto mb-10 bg-white shadow-lg rounded-xl dark:bg-gray-800 dark:text-white">
        <h2 className="mb-4 text-xl font-semibold text-center text-purple-600 dark:text-purple-300">
          Enter FYB Info
        </h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              className="w-full px-3 py-2 mt-1 text-sm border rounded dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="">-- Select Department --</option>
              <option value="Marine">Marine</option>
              <option value="Petroleum">Petroleum</option>
              <option value="Chemical">Chemical</option>
              <option value="Electrical">Electrical</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Computer">Computer</option>
              <option value="Geology">Geology</option>
              <option value="Industrial Chemistry">Industrial Chemistry</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Science Lab Tech">Science Lab Tech</option>
              <option value="Environmental Science">
                Environmental Science
              </option>
              <option value="Nautical">Nautical</option>
              <option value="Mathematics Education">Mathematics</option>
            </select>
          </div>

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

      {/* FYB Card */}
      <div className="flex justify-center">
        <div
          ref={fybRef}
          className="relative w-full max-w-sm p-5 text-sm bg-white border-4 border-purple-300 border-dashed shadow-2xl rounded-xl dark:bg-gray-900 dark:text-white"
        >
          <h2 className="mb-1 text-xl font-extrabold text-center text-purple-700 dark:text-purple-300">
            🌟 Meet Our FYB
            {formData.department ? `: ${formData.department}` : ""} 🌟
          </h2>
          <p className="mb-3 text-sm text-center text-gray-600 dark:text-gray-400">
            Class ’25
          </p>

          {imageUrl && (
            <div className="flex justify-center mb-4">
              <div className="inline-block overflow-hidden border-4 border-pink-400 shadow-md rounded-xl">
                <img
                  src={imageUrl}
                  alt="FYB"
                  className="object-contain max-w-full max-h-60"
                />
              </div>
            </div>
          )}

          <div className="relative z-10 space-y-2 text-sm text-gray-800 dark:text-gray-100">
            {[
              { label: "Name", value: formData.name },
              { label: "Nickname", value: formData.nickname },
              { label: "Worst Course", value: formData.worstCourse },
              { label: "Favourite Course", value: formData.favCourse },
              { label: "Favourite Lecturer", value: formData.favLecturer },
              { label: "Hobbies", value: formData.hobbies },
              { label: "Worst Level", value: formData.worstLevel },
              { label: "Best Level", value: formData.bestLevel },
              { label: "Plans", value: formData.plans },
              { label: "Status", value: formData.status },
              { label: "Quote", value: formData.quote },
              { label: "Advice", value: formData.advice },
            ].map((item, index) => (
              <>
                <hr className="my-1 border-purple-300 dark:border-purple-700" />{" "}
                <div key={index} className="flex flex-wrap gap-1">
                  <span className="font-semibold text-gray-600 dark:text-gray-300">
                    {item.label}:
                  </span>
                  <span className="text-gray-800 dark:text-gray-100 ">
                    {item.value}
                  </span>
                </div>{" "}
              </>
            ))}
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
