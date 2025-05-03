import React from "react";

const AuthFormWrapper = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-[#1f2937] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl my-3">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
};

export default AuthFormWrapper;
