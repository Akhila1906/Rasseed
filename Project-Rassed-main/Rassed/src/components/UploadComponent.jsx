import React, { useEffect, useState } from "react";
import CameraIcon from "../assets/camera-icon.svg?react";
import { useForm } from "react-hook-form";
import { GoogleGenAI } from "@google/genai";
// import { useReceipts } from "../context/ReceiptContext";
import ReceiptCard from "./ReceiptCard";
import { useReceipts } from "../contexts/ReceiptContext";

function UploadComponent() {
  const { addReceipt } = useReceipts(); // ⭐ LOCAL RECEIPT STORAGE

  const apiKey = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;
  const ai = new GoogleGenAI({ apiKey });

  const rawPrompt = import.meta.env.VITE_RECEIPT_PROMPT;
  const actualPrompt = rawPrompt.replace(/\\"/g, '"');

  const [parsedReceipt, setParsedReceipt] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  if (isModalOpen) {
    document.body.style.overflow = "hidden";   // prevent background scroll
  } else {
    document.body.style.overflow = "auto";     // restore scroll
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isModalOpen]);


  // replace old toBase64 with:
function toBase64WithDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64 = dataUrl.split(",")[1];
      resolve({ base64, dataUrl });
    };
    reader.onerror = (error) => reject(error);
  });
}


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const uploadedFile = watch("ReceiptUpload");

  function handleRemoveFile() {
    setValue("ReceiptUpload", null);
  }

  useEffect(() => {
    const file = uploadedFile?.[0];
    if (!file) return;

    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.type)) {
      alert("Only image or PDF allowed!");
      setValue("ReceiptUpload", null);
    }
  }, [uploadedFile, setValue]);

  async function handleImgUpload(data) {
  const file = data.ReceiptUpload?.[0];
  if (!file) return;

  setIsLoading(true);

  try {
    const { base64, dataUrl } = await toBase64WithDataUrl(file);

    const contents = [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType: file.type,
              data: base64,
            },
          },
          {
            text: actualPrompt,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents,
    });

    const cleanText = response.text
      .replace(/```(?:json)?\s*([\s\S]*?)\s*```/, "$1")
      .trim();

    const dataObj = JSON.parse(cleanText);

    // ⭐ Attach original file data for in-app viewing (no external URL)
    dataObj.originalFileDataUrl = dataUrl; // full "data:...;base64,..." string
    dataObj.originalFileType = file.type;

    // Show in modal
    setParsedReceipt(dataObj);
    setIsModalOpen(true);

    // If you're using context: addReceipt(dataObj);
      addReceipt(dataObj);

    reset();
  } catch (error) {
    console.error("API error:", error);
    alert("Failed to parse receipt. Please try again.");
  } finally {
    setIsLoading(false);
  }
}


  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      {/* Upload UI */}
      <form className="flex flex-1 flex-col" onSubmit={handleSubmit(handleImgUpload)}>
        <div className="flex flex-1 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-600/70  p-6 hover:border-blue-500 hover:bg-blue-100">

          <input
            type="file"
            id="ReceiptUpload"
            {...register("ReceiptUpload", { required: "Receipt is required" })}
            className="hidden"
            accept="image/*,application/pdf"
          />

          <label htmlFor="ReceiptUpload" className="flex flex-col items-center justify-center">
            <CameraIcon className="h-16 w-16 " />
            <h2 className="mt-3 text-base font-semibold ">Drop Receipt Here</h2>
            <span className="mt-2 text-sm text-blue-400 hover:underline">
              or click to upload / capture live
            </span>
          </label>

          {uploadedFile?.[0] && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-600">
                Selected: <strong>{uploadedFile[0].name}</strong>
              </p>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="mt-3 rounded-full bg-red-500 px-4 py-1 text-xs text-white"
              >
                Remove File
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-6 w-fit self-center rounded-full bg-green-600 px-10 py-3 text-sm text-white hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Upload & Parse"}
        </button>
      </form>

      {/* Modal */}
      {isModalOpen && parsedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl p-4 sm:p-6 animate-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute right-6 top-6 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white"
            >
              ✕
            </button>

            <ReceiptCard bill={parsedReceipt} />
          </div>
        </div>
      )}
    </>
  );
}

export default UploadComponent;
