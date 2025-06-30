import React, { useState, useEffect } from "react";
import CVGenerator from "./CVGenerator";
import CVVersion2 from "./CVVersion2";
import CVVersion3 from "./CVVersion3";

const CVWrapper = () => {
  const [selectedVersion, setSelectedVersion] = useState(null); // delay rendering

  // Load version from localStorage once
  useEffect(() => {
    const savedVersion = localStorage.getItem("cv_version") || "v1";
    console.log("Loaded from localStorage:", savedVersion);
    setSelectedVersion(savedVersion);
  }, []);

  // Save to localStorage whenever selectedVersion changes
  useEffect(() => {
    if (selectedVersion !== null) {
      console.log("Saving to localStorage:", selectedVersion);
      localStorage.setItem("cv_version", selectedVersion);
    }
  }, [selectedVersion]);

  const renderSelectedVersion = () => {
    switch (selectedVersion) {
      case "v1":
        return <CVGenerator />;
      case "v2":
        return <CVVersion2 />;
      case "v3":
        return <CVVersion3 />;
      default:
        return null;
    }
  };

  // Don't render anything until localStorage is loaded
  if (!selectedVersion) return null;

  return (
    <div>
      <div className="flex justify-center m-3">
        <select
          value={selectedVersion}
          onChange={(e) => setSelectedVersion(e.target.value)}
          className="px-4 py-2 border rounded"
        >
          <option value="v1">Version 1</option>
          <option value="v2">Version 2</option>
          <option value="v3">Version 3</option>
        </select>
      </div>
      {renderSelectedVersion()}
    </div>
  );
};

export default CVWrapper;
