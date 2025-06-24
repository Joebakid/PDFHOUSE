import React from "react";

const creators = [
  {
    name: "Joseph Bawo",
    role: "Frontend Developer",
    department: "Marine Engineering",
    src: "/img/josephbawo.jpg",
    portfolio: "https://www.josephbawo.tech/",
  },
  {
    name: "Unuigbokhai Noah",
    role: "UI/UX Designer",
    department: "Marine Engineering",
    src: "/img/UnuigbokhaiNoah.jpeg",
    portfolio:
      "https://linktr.ee/unuigbokhainoah?utm_source=linktree_profile_share&ltsid=dae4cb4f-18f8-452f-8b97-e30f4883fe69",
  },
  // {
  //   name: "Obiajulu Anthony",
  //   role: "Full Stack Developer",
  //   department: "Mechanical Engineering",
  //   src: "/img/anthony.jpg",
  //   portfolio: "https://linktr.ee/ashnotgrey",
  // },
];

function CreatorsSection() {
  return (
    <div className="px-4 py-12 mx-auto text-center md:px-8 max-w-7xl">
      <h2 className="mb-1 text-xl font-bold md:text-2xl">Creators Section</h2>
      <p className="mb-10 text-gray-600">Built by students, for students</p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {creators.map((creator, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-48 h-48 mb-4 overflow-hidden rounded-md">
              {creator.src ? (
                <img
                  alt={creator.name}
                  src={creator.src}
                  className="object-cover w-full h-full rounded-xl"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-gray-500 bg-gray-200 rounded-xl">
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
                <strong>Department:</strong> {creator.department}
              </p>
              <p>
                <strong>Portfolio:</strong>{" "}
                <a
                  href={creator.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatorsSection;
