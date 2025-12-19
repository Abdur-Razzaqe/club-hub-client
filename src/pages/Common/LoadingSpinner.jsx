import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-16 h-16 rounded-full border-4 border-transparent animate-spin bg-gradient-to-r from-teal-400 to-blue-500 from-pink-500 to-orange-500 [mask-image:radial-gradient(circle,transparent_55%, black_56%)]" />
    </div>
  );
};

export default LoadingSpinner;
