import React from "react";
import CameraIcon from "../assets/camera-icon.svg?react";
import UploadComponent from "./UploadComponent";

function UploadPage() {
  return (
    <div className="">
      <div className="items-centehr flex flex-col justify-center">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold">Upload Your Receipt</h1>
          <p className="mt-3 italic">Effortlessly add your spending records.</p>
        </section>

        <UploadComponent />
      </div>
    </div>
  );
}

export default UploadPage;
