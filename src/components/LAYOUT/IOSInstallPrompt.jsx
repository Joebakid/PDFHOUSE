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

      // Auto-dismiss after 5 seconds
      const timer = setTimeout(() => {
        setShouldShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldShow) return null;

  return (
    <div className="fixed z-50 max-w-sm p-4 -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg bottom-4 left-1/2 dark:bg-gray-800 dark:border-gray-700">
      <p className="mb-2 text-sm text-center text-gray-800 dark:text-gray-100">
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
