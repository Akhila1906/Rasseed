import React from "react";

function Settings() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="mt-3 italic">Customize your Project Raseed experience.</p>
      </section>
      <div className="w-full max-w-2xl rounded-xl bg-white p-8 shadow-lg">
        <form>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Language</h2>
            <label
              for="languageSelect"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Select Language:
            </label>
            <select
              id="languageSelect"
              className="w-full rounded-md border border-gray-300 p-3 text-base focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </form>

        <div className="mt-6">
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Account Management
          </h2>
          <button
            type="button"
            className="mb-4 w-full rounded-full bg-blue-500 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-blue-600"
          >
            Change Password
          </button>
          <button
            type="button"
            className="w-full rounded-full bg-red-500 px-6 py-3 font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-red-600"
          >
            Delete Account
          </button>
        </div>

        <div className="pt-4 text-center">
          <button
            type="submit"
            className="rounded-full bg-green-600 px-8 py-3 font-semibold text-white shadow-lg transition duration-300 ease-in-out hover:bg-green-700"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
