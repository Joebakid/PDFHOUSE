"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Minimize2, Maximize2, FileText } from "lucide-react";

const allJSONFiles = import.meta.glob("/src/JSON/**/*.json");

function Doc({ name, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#00CCFF] text-white px-4 py-3 rounded-xl font-medium shadow hover:bg-[#00b0e6] transition flex items-center gap-2 max-w-xs break-words duration-200"
    >
      <FileText size={18} />
      <span className="truncate">{name}</span>
    </a>
  );
}

function CourseSection({ title, docs }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 text-left">
      <button
        className="flex items-center justify-between w-full px-4 py-3 text-lg font-semibold transition-colors duration-200 bg-gray-100 rounded-lg shadow hover:bg-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">({docs.length} files)</span>
          {isOpen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="p-4 mt-4 rounded-lg bg-gray-50">
          {docs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docs.map((doc, index) => (
                <Doc key={index} name={doc.name} href={doc.href} />
              ))}
            </div>
          ) : (
            <p className="italic text-center text-gray-500">
              No PDFs uploaded yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function parseSections(data) {
  const sections = [];

  if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
    return [];
  }

  if (Array.isArray(data)) {
    sections.push({ title: "MATERIALS", docs: data });
  } else {
    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        sections.push({ title: key.toUpperCase(), docs: value });
      } else if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([subKey, subValue]) => {
          if (Array.isArray(subValue)) {
            sections.push({
              title: `${key.toUpperCase()} - ${subKey.toUpperCase()}`,
              docs: subValue,
            });
          }
        });
      }
    });
  }

  return sections;
}

function load500LevelPDFs(department, semester, subdivision) {
  const formattedDepartment = department.split(" ")[0].toLowerCase();
  const formattedSemester = `${semester.toLowerCase()}-semester`;
  const formattedSubdivision = subdivision
    ? subdivision.toLowerCase().trim()
    : null;

  console.log("Loading 500 level PDFs for:", {
    originalDepartment: department,
    formattedDepartment,
    originalSemester: semester,
    formattedSemester,
    originalSubdivision: subdivision,
    formattedSubdivision,
  });

  // Debug: Show ALL files that import.meta.glob found
  console.log("🔍 ALL FILES FOUND BY import.meta.glob:");
  console.log("Total files:", Object.keys(allJSONFiles).length);
  
  // Show all marine-related files
  const marineFiles = Object.keys(allJSONFiles).filter(path => path.includes('marine'));
  console.log("🐠 MARINE FILES FOUND:", marineFiles.length);
  marineFiles.forEach(path => console.log("   📁", path));
  
  // Show all 500-level files
  const level500Files = Object.keys(allJSONFiles).filter(path => path.includes('/500/'));
  console.log("🎓 500-LEVEL FILES FOUND:", level500Files.length);
  level500Files.forEach(path => console.log("   📁", path));
  
  // Show all subdivision files
  const subdivisionFiles = Object.keys(allJSONFiles).filter(path => path.includes('subdivision'));
  console.log("📂 SUBDIVISION FILES FOUND:", subdivisionFiles.length);
  subdivisionFiles.forEach(path => console.log("   📁", path));

  const paths = [];

  // If subdivision is specified, handle by department
  if (formattedSubdivision) {
    if (formattedDepartment === "marine") {
      const generalPath = `/src/JSON/500/technology/${formattedSemester}/marine/general.json`;

      if (formattedSubdivision === "naval") {
        const subdivisionPath = `/src/JSON/500/technology/${formattedSemester}/marine/subdivision/naval.json`;
        paths.push(subdivisionPath, generalPath);
      } else if (formattedSubdivision === "offshore") {
        const subdivisionPath = `/src/JSON/500/technology/${formattedSemester}/marine/subdivision/offshore.json`;
        paths.push(subdivisionPath, generalPath);
      } else if (formattedSubdivision === "powerplant" || formattedSubdivision === "power plant") {
        const subdivisionPath = `/src/JSON/500/technology/${formattedSemester}/marine/subdivision/powerplant.json`;
        paths.push(subdivisionPath, generalPath);
      }
    }
    // ... rest of your department logic

    console.log("✅ Generated paths:", paths);
    
    // Debug: Check if each path exists and show exact matches
    console.log("🔍 PATH EXISTENCE CHECK:");
    paths.forEach(path => {
      const exists = allJSONFiles.hasOwnProperty(path);
      console.log(`   ${exists ? '✅' : '❌'} ${path} - ${exists ? 'EXISTS' : 'NOT FOUND'}`);
      
      if (!exists) {
        // Try to find the closest match
        const pathParts = path.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const directory = pathParts.slice(0, -1).join('/');
        
        console.log(`   🔍 Looking for file: "${fileName}" in directory: "${directory}"`);
        
        // Find files in the same directory
        const sameDirectoryFiles = Object.keys(allJSONFiles).filter(availablePath => 
          availablePath.startsWith(directory)
        );
        
        if (sameDirectoryFiles.length > 0) {
          console.log("   📁 Files in same directory:");
          sameDirectoryFiles.forEach(file => console.log(`      - ${file}`));
        } else {
          console.log("   ⚠️ Directory not found in allJSONFiles");
          
          // Check if parent directory exists
          const parentDir = pathParts.slice(0, -2).join('/');
          const parentDirFiles = Object.keys(allJSONFiles).filter(availablePath => 
            availablePath.startsWith(parentDir)
          );
          
          if (parentDirFiles.length > 0) {
            console.log(`   📁 Files in parent directory "${parentDir}":`);
            parentDirFiles.forEach(file => console.log(`      - ${file}`));
          }
        }
      }
    });

    return paths;
  }

  // Rest of your fallback logic...
  if (formattedDepartment === "marine") {
    const generalPath = `/src/JSON/500/technology/${formattedSemester}/marine/general.json`;
    const allMarinePaths = [
      generalPath,
      `/src/JSON/500/technology/${formattedSemester}/marine/subdivision/naval.json`,
      `/src/JSON/500/technology/${formattedSemester}/marine/subdivision/offshore.json`,
      `/src/JSON/500/technology/${formattedSemester}/marine/subdivision/powerplant.json`,
    ];
    
    console.log("✅ Loading all marine files (no subdivision):", allMarinePaths);
    return allMarinePaths;
  }

  // ... rest of your department logic

  console.log("⚠️ No matching paths found for:", formattedDepartment);
  return [];
}

function DebugInfo({ level, college, department, semester, subdivision }) {
  return (
    <div className="p-4 mb-4 border border-yellow-200 rounded-lg bg-yellow-50">
      <h3 className="mb-2 font-semibold text-yellow-800">Debug Information:</h3>
      <div className="space-y-1 text-sm text-yellow-700">
        <div>
          <strong>Level:</strong> "{level}" (type: {typeof level})
        </div>
        <div>
          <strong>College:</strong> "{college}" (type: {typeof college})
        </div>
        <div>
          <strong>Department:</strong> "{department}" (type: {typeof department}
          )
        </div>
        <div>
          <strong>Semester:</strong> "{semester}" (type: {typeof semester})
        </div>
        <div>
          <strong>Subdivision:</strong> "{subdivision}" (type:{" "}
          {typeof subdivision})
        </div>
      </div>
    </div>
  );
}

function PDFViewer({ BackButton }) {
  const location = useLocation();
  const { level, college, department, semester, subdivision } =
    location.state || {};

  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPDFs = async () => {
      setLoading(true);
      setError(null);

      if (!level || !semester || !department) {
        setSections([]);
        setLoading(false);
        return;
      }

      if (level === "500") {
        try {
          const pathsToLoad = load500LevelPDFs(
            department,
            semester,
            subdivision
          );

          if (!pathsToLoad || pathsToLoad.length === 0) {
            setError(
              `No materials found for ${department}${
                subdivision ? ` - ${subdivision}` : ""
              }.`
            );
            setLoading(false);
            return;
          }

          const loadedSections = [];

          for (const path of pathsToLoad) {
            console.log("Checking path:", path);

            if (allJSONFiles[path]) {
              console.log("✅ Found file:", path);

              try {
                const module = await allJSONFiles[path]();
                const data = module.default;
                console.log("Loaded data from", path, ":", data);

                const sections = parseSections(data);
                loadedSections.push(...sections);
              } catch (fileError) {
                console.error(`Error loading ${path}:`, fileError);
              }
            } else {
              console.log("❌ File not found:", path);
              console.log(
                "Available electrical files:",
                Object.keys(allJSONFiles).filter((key) =>
                  key.includes("electrical")
                )
              );
            }
          }

          if (loadedSections.length === 0) {
            const subdivisionText = subdivision
              ? ` - ${
                  subdivision.charAt(0).toUpperCase() + subdivision.slice(1)
                }`
              : "";
            setError(
              `No materials found for ${department}${subdivisionText}. Expected files: ${pathsToLoad.join(
                ", "
              )}`
            );
          }

          setSections(loadedSections);
        } catch (err) {
          setError(err.message);
          setSections([]);
        } finally {
          setLoading(false);
        }
        return;
      }

      // Existing logic for 100-400 levels (unchanged)
      if (!college) {
        setSections([]);
        setLoading(false);
        return;
      }

      const formattedLevel = level.toLowerCase();
      const formattedCollege = college.toLowerCase();
      const formattedSemester = `${semester.toLowerCase()}-semester`;
      const formattedDepartment = department.split(" ")[0].toLowerCase();

      const supportedLevels = ["100", "200", "300", "400"];
      if (!supportedLevels.includes(level)) {
        setError("Only 100 to 400 level materials are supported.");
        setLoading(false);
        return;
      }

      try {
        const deptPath = `/src/JSON/${formattedLevel}/${formattedCollege}/${formattedSemester}/${formattedDepartment}.json`;
        const generalPath = `/src/JSON/${formattedLevel}/${formattedCollege}/${formattedSemester}/general.json`;

        const loadedSections = [];

        if (allJSONFiles[deptPath]) {
          const deptModule = await allJSONFiles[deptPath]();
          const deptData = deptModule.default;
          const deptSections = parseSections(deptData);
          loadedSections.push(...deptSections);
        }

        if (allJSONFiles[generalPath]) {
          const generalModule = await allJSONFiles[generalPath]();
          const generalData = generalModule.default;
          const generalSections = parseSections({ general: generalData });
          loadedSections.push(...generalSections);
        }

        if (loadedSections.length === 0) {
          loadedSections.push({ title: "NO MATERIALS", docs: [] });
        }

        setSections(loadedSections);
      } catch (err) {
        setError(err.message);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    loadPDFs();
  }, [level, college, department, semester, subdivision]);

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <header className="mb-8">
        <BackButton />
        {/* Add debug info - remove this once you've identified the issue */}
        {/* <DebugInfo
          level={level}
          college={college}
          department={department}
          semester={semester}
          subdivision={subdivision}
        /> */}
        <div className="mt-4 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-800">
            Course Materials
          </h1>
          <p className="mb-1 text-gray-600">
            Access and download course materials for {department || "N/A"}
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            {level === "500" ? (
              <>
                <span>Level: {level}</span>
                <span>|</span>
                <span>Semester: {semester}</span>
                {subdivision && (
                  <>
                    <span>|</span>
                    <span>Subdivision: {subdivision}</span>
                  </>
                )}
              </>
            ) : (
              <>
                <span>College: {college || "N/A"}</span>
                <span>|</span>
                <span>Level: {level || "N/A"}</span>
                <span>|</span>
                <span>Semester: {semester || "N/A"}</span>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00CCFF] mb-4"></div>
            <p className="text-gray-500">Loading course materials...</p>
          </div>
        ) : error ? (
          <div className="py-12 text-center">
            <div className="max-w-2xl p-6 mx-auto border border-red-200 rounded-lg bg-red-50">
              <p className="mb-2 text-red-600">{error}</p>
              <p className="text-sm text-gray-500">
                Make sure the JSON file exists in the correct location.
              </p>
            </div>
          </div>
        ) : sections.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg font-medium text-gray-500">
              No PDFs uploaded yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sections.map(({ title, docs }, index) => (
              <CourseSection key={index} title={title} docs={docs} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default PDFViewer;
