import React from "react";
import MicIcon from "../assets/mic-icon.svg?react";
function QueryPage() {
  return (
    <div>
      <div className="mx-auto flex flex-col items-center justify-center p-6 md:p-10">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold">Ask Raseed</h1>
          <p className="mt-3 italic">
            Get quick answers and smart suggestions.
          </p>
        </section>
        <div className="flex w-full max-w-2xl flex-col items-center rounded-xl bg-white p-8 shadow-lg">
          <div className="relative mb-6 w-full">
            <input
              type="text"
              className="w-full rounded-lg border border-gray-300 p-4 pr-12 text-lg focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ask anything, e.g., 'What can I cook for dinner?' or 'How to save money?"
            />
            <button className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 transition duration-300 ease-in-out hover:text-blue-600">
              <MicIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
            <button className="flex flex-1 items-center justify-center rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-700">
              ✨ Get Shopping List
            </button>
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out flex items-center justify-center flex-1">
                ✨ Get Financial Advice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QueryPage;
