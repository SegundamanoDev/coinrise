import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-gray-950 flex flex-col items-center justify-center font-montserrat">
      {/* Centered Spinner Container */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        {/* Outer gradient ring */}
        <div
          className="absolute inset-0 rounded-full animate-spinSlow
                        bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500
                        p-[6px] sm:p-[8px]"
        >
          {" "}
          {/* Padding creates the ring effect */}
          {/* Inner circle to cut out the middle */}
          <div className="absolute inset-[6px] sm:inset-[8px] bg-gray-950 rounded-full"></div>
        </div>

        {/* Optional: Smaller inner pulsating circle with a subtle logo-like feel */}
        <div
          className="absolute inset-6 sm:inset-8 bg-blue-500 rounded-full flex items-center justify-center
                        animate-pulse opacity-70"
        >
          {/* You can place a tiny icon here if desired, e.g., <span className="text-white text-lg">₿</span> */}
        </div>
      </div>

      {/* Loading Text */}
      <p className="mt-8 text-white text-xl sm:text-2xl font-semibold tracking-wide animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default LoadingSpinner;
