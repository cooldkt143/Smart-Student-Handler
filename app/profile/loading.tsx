// Import necessary modules
import React from "react";
import { GraduationCap } from "lucide-react";

// Define a functional component
const loading: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-900 rounded-full p-6 shadow-lg">
          <GraduationCap
            className="text-blue-900 dark:text-blue-400 animate-coin-roll"
            size={64}
          />
        </div>
      </div>
    </div>
  );
};

export default loading;
