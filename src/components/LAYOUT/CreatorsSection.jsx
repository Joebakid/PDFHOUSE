import React from "react";

const creators = [
  {
    name: "Joseph Bawo",
    role: "Frontend Developer",
    level: "500level",
    department: "Marine Engineering",
    src: "/img/josephbawo.jpg",
  },
  {
    name: "Unuigbokhai Noah",
    role: "UI/UX Designer",
    level: "500level",
    department: "Marine Engineering",
    src: "/img/UnuigbokhaiNoah.jpeg",
  },
  {
    name: "Course Reps across all levels",
    role: "Partners",
    level: "All level",
    department: "All department",
  },
];

function CreatorsSection() {
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto text-center">
      <h2 className="text-xl md:text-2xl font-bold mb-1">Creators Section</h2>
      <p className="text-gray-600 mb-10">Built by students, for students</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {creators.map((creator, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-48 h-48 rounded-md mb-4 overflow-hidden">
              {creator.src ? (
                <img
                  alt={creator.name}
                  src={creator.src}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-xl text-gray-500">
                  No Image
                </div>
              )}
            </div>

            <div className="text-center">
              <p>
                <strong>Name:</strong> {creator.name}
              </p>
              <p>
                <strong>Role:</strong> {creator.role}
              </p>
              <p>
                <strong>Level :</strong> {creator.level}
              </p>
              <p>
                <strong>Department :</strong> {creator.department}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatorsSection;
