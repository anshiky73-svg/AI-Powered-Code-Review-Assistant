"use client";

import { useState, type DragEvent } from "react";

interface UploadZoneProps {
  onUpload: (file: File) => void;
  selectedFileName?: string;
  uploadProgress?: number;
}

export function UploadZone({ onUpload, selectedFileName, uploadProgress }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file?.name.endsWith(".zip")) {
      onUpload(file);
    }
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragActive(true);
      }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={`rounded-3xl border-2 p-8 text-center transition ${
        dragActive
          ? "border-blue-500 bg-slate-900"
          : "border-dashed border-slate-700 bg-slate-950"
      }`}
    >
      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
        Upload ZIP
      </p>
      <p className="mt-4 text-lg font-semibold text-white">
        Drag and drop a .zip file here
      </p>
      <p className="mt-2 text-sm text-slate-400">
        Project archive will be extracted into the file explorer.
      </p>
      {selectedFileName ? (
        <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-slate-200">
          Selected file: {selectedFileName}
          {uploadProgress !== undefined ? (
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
              <div className="h-full bg-blue-500" style={{ width: `${uploadProgress}%` }} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
