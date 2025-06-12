import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PDFs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    level: "",
    college: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/department", { state: formData });
  };

  return (
    <div className="custom-container initial-spacing text-center">
      <h2 className="text-4xl font-bold py-3">
        Find what you need in seconds
      </h2>
      <p className="text-lg py-3">
        We’ll guide you to the exact files you need, no accounts, no clutter.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto text-left">
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
            {/* Filter levels based on college */}
            {(formData.college === "Science"
              ? ["100", "200", "300", "400"]
              : ["100", "200", "300", "400", "500"]
            ).map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}

export default PDFs;
