import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import ProductAdCarousel from "./ProductAdCarousel"; // Optional

function DepartmentPage({ BackButton }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { level, college } = location.state || {};

  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [subdivision, setSubdivision] = useState("");
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [showSubdivision, setShowSubdivision] = useState(false);
  const [subdivisionOptions, setSubdivisionOptions] = useState([]);

  const departments = {
    Technology: [
      "Marine Engineering",
      "Petroleum Engineering",
      "Oil and Gas",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Chemical Engineering",
    ],
    Science: [
      "Science Lab Tech",
      "Geology",
      "Geophysics",
      "Physics",
      "Nautical Science",
      "Chemistry",
      "Industrial Chemistry",
      "Environmental Science",
    ],
    Computing: [
      "Computer Science",
      "Information Technology",
      "Software Engineering",
      "Cyber Security",
      "Data Science",
    ],
    // Marinetime:[]
  };

  const marineSubdivisions = ["Offshore", "Naval", "Powerplant"];
  const mechanicalSubdivisions = ["Thermofluid", "Production"];
  const electricalSubdivisions = [
    "Instrumentations and Control",
    "Electronics and Telecommunication",
    "Power",
  ];
  const chemicalSubdivisions = [
    "Process",
    "Biochemical",
    "Material",
    "Energy",
    "Environmental",
  ];

  useEffect(() => {
    const normalizedCollege =
      college?.charAt(0).toUpperCase() + college?.slice(1).toLowerCase();

    if (normalizedCollege && departments[normalizedCollege]) {
      setDepartmentOptions(departments[normalizedCollege]);
    } else {
      setDepartmentOptions([]);
    }
  }, [college]);

  useEffect(() => {
    const dept = department.toLowerCase();
    const normalizedLevel = String(level);
    const science500NoSubdivision = [
      "environmental science",
      "science lab tech",
    ];

    if (normalizedLevel === "500") {
      if (dept === "marine engineering") {
        setSubdivisionOptions(marineSubdivisions);
        setShowSubdivision(true);
      } else if (dept === "mechanical engineering") {
        setSubdivisionOptions(mechanicalSubdivisions);
        setShowSubdivision(true);
      } else if (dept === "electrical engineering") {
        setSubdivisionOptions(electricalSubdivisions);
        setShowSubdivision(true);
      } else if (dept === "chemical engineering") {
        setSubdivisionOptions(chemicalSubdivisions);
        setShowSubdivision(true);
      } else if (science500NoSubdivision.includes(dept)) {
        setSubdivisionOptions([]);
        setShowSubdivision(false);
        setSubdivision("");
      } else {
        setSubdivisionOptions([]);
        setShowSubdivision(false);
        setSubdivision("");
      }
    } else {
      setSubdivisionOptions([]);
      setShowSubdivision(false);
      setSubdivision("");
    }
  }, [department, level]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/pdfs-view", {
      state: { department, level, college, semester, subdivision },
    });
  };

  return (
    <>
      <div className="custom-container initial-spacing">
        <BackButton />
        {/* <ProductAdCarousel /> */}
      </div>

      <div className="max-w-md p-5 mx-auto text-left bg-white rounded shadow">
        <h2 className="mb-4 text-2xl font-bold text-center">
          Select Department
        </h2>
        <p className="mb-2 text-sm text-center text-gray-600">
          Level: {level} | College: {college}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="department" className="block mb-2 font-medium">
            Department
          </label>
          <select
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          >
            <option value="">Select department</option>
            {departmentOptions.map((dept, i) => (
              <option key={i} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {showSubdivision && (
            <>
              <label htmlFor="subdivision" className="block mb-2 font-medium">
                Subdivision
              </label>
              <select
                id="subdivision"
                value={subdivision}
                onChange={(e) => setSubdivision(e.target.value)}
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
              >
                <option value="">Select subdivision</option>
                {subdivisionOptions.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </>
          )}

          <label htmlFor="semester" className="block mb-2 font-medium">
            Semester
          </label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
          >
            <option value="">Select semester</option>
            <option value="first">First Semester</option>
            <option value="second">Second Semester</option>
          </select>

          <button
            type="submit"
            disabled={
              !department || !semester || (showSubdivision && !subdivision)
            }
            className={`w-full py-2 rounded transition 
            ${
              !department || !semester || (showSubdivision && !subdivision)
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            }`}
          >
            Continue
          </button>
        </form>
      </div>
    </>
  );
}

export default DepartmentPage;
