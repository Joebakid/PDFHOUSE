import { useEffect, useState } from "react";

function isIOS() {
  return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
}

function isInStandaloneMode() {
  return "standalone" in window.navigator && window.navigator.standalone;
}

export default function IOSInstallPrompt() {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    if (isIOS() && !isInStandaloneMode()) {
      setShouldShow(true);
    }
  }, []);

  if (!shouldShow) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-gray-800 shadow-lg p-4 rounded-lg border border-gray-300 dark:border-gray-700 max-w-sm">
      <p className="text-sm text-center text-gray-800 dark:text-gray-100 mb-2">
        Install PDFHouse on your iPhone: Tap{" "}
        <span className="font-semibold">Share</span> then{" "}
        <span className="font-semibold">"Add to Home Screen"</span>
      </p>
      <div className="text-center">
        <button
          onClick={() => setShouldShow(false)}
          className="text-sm text-blue-500 hover:underline"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
