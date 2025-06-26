import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minimize2 } from "lucide-react";

function PDFs({ BackButton }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    level: "",
    college: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // navigate("/department", { state: formData });
    navigate(`/department?level=${formData.level}&college=${formData.college}`);
  };

  // Define level options based on college
  const getLevelsForCollege = (college) => {
    if (college === "Science") {
      // Science students max out at 400L, except Sci Lab Tech & Env Science (handled in department page)
      return ["100", "200", "300", "400", "500"];
    } else if (college === "Technology" || college === "Computing") {
      return ["100", "200", "300", "400", "500"];
    }
    return [];
  };

  return (
    <div className="text-center custom-container initial-spacing">
      <BackButton />
      <h2 className="py-3 text-4xl font-bold">Find what you need in seconds</h2>
      <p className="py-3 text-lg">
        We’ll guide you to the exact files you need, no accounts, no clutter.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 text-left">
        {/* College Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">College</label>
          <select
            name="college"
            value={formData.college}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select college</option>
            <option value="Science">Science</option>
            <option value="Technology">Technology</option>
            <option value="Computing">Computing</option>
          </select>
        </div>

        {/* Level Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="">Select level</option>
            {getLevelsForCollege(formData.college).map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={!formData.college || !formData.level}
          className={`w-full py-2 px-4 rounded transition 
            ${
              !formData.college || !formData.level
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            }`}
        >
          Proceed
        </button>
      </form>
    </div>
  );
}

export default PDFs;
