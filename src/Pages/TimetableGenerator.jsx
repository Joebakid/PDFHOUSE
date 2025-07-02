// src/Pages/TimetableGenerator.jsx
import React, { useState, useContext, useRef, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useBookmarks } from "../context/BookmarkContext";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const hours = ["8:00-10:00pm"]; // You can extend this

export default function TimetableGenerator() {
  const { isDarkMode } = useContext(ThemeContext);
  const { addBookmark } = useBookmarks();

  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("currentTimetable");
    return saved ? JSON.parse(saved) : {};
  });

  const tableRef = useRef();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("currentTimetable", JSON.stringify(timetable));
  }, [timetable]);

  const addCourse = () => {
    const course = newCourse.trim();
    if (!course || courses.includes(course)) return;
    setCourses([...courses, course]);
    setNewCourse("");
  };

  const removeCourse = (i) => {
    const updated = [...courses];
    updated.splice(i, 1);
    setCourses(updated);
  };

  const generateTimetable = () => {
    const result = {};
    days.forEach((day) => (result[day] = Array(hours.length).fill("")));

    const slots = [];
    days.forEach((day) => {
      for (let h = 0; h < hours.length; h++) {
        slots.push({ day, hour: h });
      }
    });

    const shuffled = slots.sort(() => Math.random() - 0.5);
    const courseCount = Object.fromEntries(courses.map((c) => [c, 0]));
    const dailyCount = Object.fromEntries(days.map((d) => [d, 0]));

    for (const { day, hour } of shuffled) {
      if (dailyCount[day] >= 1) continue;
      const available = courses.filter((c) => courseCount[c] < 2);
      if (available.length === 0) break;
      const course = available[Math.floor(Math.random() * available.length)];
      result[day][hour] = course;
      courseCount[course]++;
      dailyCount[day]++;
    }

    setTimetable(result);
  };

  const exportImage = async () => {
    const canvas = await html2canvas(tableRef.current, {
      scale: 2,
      backgroundColor: isDarkMode ? "#111827" : "#ffffff",
    });
    const data = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = data;
    link.download = "timetable.png";
    link.click();
  };

  const exportPDF = async () => {
    const canvas = await html2canvas(tableRef.current, {
      scale: 2,
      backgroundColor: isDarkMode ? "#111827" : "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("timetable.pdf");
  };

  const exportExcel = () => {
    const wsData = [["Day / Time", ...hours]];
    days.forEach((day) => {
      wsData.push([day, ...(timetable[day] || ["—"])]);
    });
    const worksheet = XLSX.utils.aoa_to_sheet(wsData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Timetable");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    saveAs(new Blob([excelBuffer]), "timetable.xlsx");
  };

  const bookmarkTimetable = () => {
    if (Object.keys(timetable).length === 0) {
      alert("Generate a timetable first!");
      return;
    }

    const name = prompt("Enter a name for this timetable:");
    if (!name) return;

    const doc = {
      name,
      type: "Timetable",
      data: {
        timetable,
        hours,
        days,
      },
    };

    addBookmark(doc);
    alert("Timetable bookmarked!");
  };

  const deleteTimetable = () => {
    if (confirm("Delete this timetable?")) {
      setTimetable({});
      localStorage.removeItem("currentTimetable");
    }
  };

  return (
    <div className="min-h-screen p-6 text-black transition-all bg-white dark:bg-gray-900 dark:text-white">
      <h1 className="mb-4 text-3xl font-bold">Timetable Generator</h1>

      <div className="flex flex-col gap-4 mb-4 sm:flex-row">
        <select
          value={"Reading Timetable"}
          disabled
          className="px-4 py-2 border rounded dark:bg-gray-800"
        >
          <option>Reading Timetable</option>
        </select>

        <input
          type="text"
          value={newCourse}
          onChange={(e) => setNewCourse(e.target.value)}
          placeholder="Add course"
          className="w-full px-4 py-2 border rounded dark:bg-gray-800 sm:w-auto"
        />
        <button
          onClick={addCourse}
          className="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
        >
          Add
        </button>
        <button
          onClick={generateTimetable}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Generate
        </button>
        <button
          onClick={deleteTimetable}
          className="px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
        >
          Delete
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {courses.map((course, i) => (
          <div
            key={i}
            className="flex items-center px-3 py-1 bg-gray-200 rounded dark:bg-gray-700"
          >
            {course}
            <button
              onClick={() => removeCourse(i)}
              className="ml-2 font-bold text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      {Object.keys(timetable).length > 0 && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={exportImage}
              className="px-3 py-2 text-white bg-purple-600 rounded hover:bg-purple-700"
            >
              Download Image
            </button>
            <button
              onClick={exportPDF}
              className="px-3 py-2 text-white bg-red-600 rounded hover:bg-red-700"
            >
              Download PDF
            </button>
            <button
              onClick={exportExcel}
              className="px-3 py-2 text-black bg-yellow-500 rounded hover:bg-yellow-600"
            >
              Download Excel
            </button>
            <button
              onClick={bookmarkTimetable}
              className="px-3 py-2 text-white bg-teal-600 rounded hover:bg-teal-700"
            >
              Bookmark Timetable
            </button>
          </div>

          <div className="overflow-x-auto" ref={tableRef}>
            <table className="w-full text-sm border-collapse table-auto md:text-base">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Day / Time</th>
                  {hours.map((hour, idx) => (
                    <th key={idx} className="px-4 py-2 border">
                      {hour}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="px-4 py-2 font-semibold border">{day}</td>
                    {timetable[day]?.map((course, i) => (
                      <td key={i} className="px-4 py-2 border">
                        {course || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
