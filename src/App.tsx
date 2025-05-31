import React from "react";
import { NextUIProvider } from "@nextui-org/react";

import "./index.css";

const App: React.FC = () => {
  return (
    <NextUIProvider>
      <div className="flex flex-col items-center justify-center min-h-screen bg-light-blue gap-1.5">
        <h1 className="text-4xl font-bold text-dark-blue p-1.5">
          Hello, World!
        </h1>
        <p className="text-lg text-dark-orange px-1 py-1 bg-calendar-tile">
          Welcome to your React, TypeScript, and Tailwind CSS app!
        </p>
      </div>
    </NextUIProvider>
  );
};

export default App;
