import React, { useState } from "react";
import CVGenerator from "./CVGenerator"; // This is your current version 1
import CVVersion2 from "./CVVersion2";   // You will create this
import CVVersion3 from "./CVVersion3";   // You will create this

const CVWrapper = () => {
  const [selectedVersion, setSelectedVersion] = useState("v1");

  const renderSelectedVersion = () => {
    switch (selectedVersion) {
      case "v1":
        return <CVGenerator />;
      case "v2":
        return <CVVersion2 />;
      case "v3":
        return <CVVersion3 />;
      default:
        return <CVGenerator />;
    }
  };

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
