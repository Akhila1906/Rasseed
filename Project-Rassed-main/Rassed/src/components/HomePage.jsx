import React from "react";
import CameraIcon from "../assets/camera-icon.svg?react";
import PieChart_Component from "./PieChart_Component";
import UploadComponent from "./UploadComponent";

function HomePage() {
  return (
    <div>
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold">Welcome to Raseed</h1>
        <p className="mt-3 italic">
          Manage your receipts and finances effortlessly.
        </p>
      </section>

      <div className="flex flex-col lg:flex-row gap-8">

        <UploadComponent/>
        <div className=" flex flex-col flex-1 gap-8">
            <div className="">
                <PieChart_Component/> 
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border shadow-lg border-green-200">
                    <h4 className="mb-2 text-lg font-semibold text-green-700">Smart Saving Tip!</h4>
                    <p className="text-gray-800 text-sm">Consider making a grocery list before shopping to avoid impulse buys and save money this week!</p>
                </div>

                <div className="bg-white p-4 rounded-xl border shadow-lg border-blue-200">
                    <h4 className="mb-2 text-lg font-semibold text-blue-700">Did You Know?</h4>
                    <p className="text-gray-800 text-sm">Automating a small portion of your income into savings can significantly boost your financial health.</p>
                </div>


             </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
