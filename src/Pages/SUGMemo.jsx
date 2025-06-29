import React from "react";

const SUGMemo = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 text-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
          🛠 SUG Memo Page
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          This feature is{" "}
          <span className="font-semibold text-blue-600 dark:text-blue-400">
            currently in development
          </span>
          . Check back later for updates!
        </p>
      </div>
    </div>
  );
};

export default SUGMemo;
