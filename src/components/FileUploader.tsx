import React from 'react';
import { ChangeEvent, useState } from "react";

type UploadStatus = "idle" | "loading" | "success" | "error";

export default function FileUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>("idle");

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        if (fileList) {
            setFile(fileList[0]);
        }
    }

    function handleUpload() {
        if (file) {
            setStatus("loading");
            // Simulate file upload
            setTimeout(() => {
                setStatus("success");
            }, 2000);
        }
    }

    return (
        <div className="space-y-2">
            <input type="file" onChange={handleFileChange} />
            {file && (
            <div className="mb-4 text-sm">
                <p>file.name: {file.name}</p>
                <p>file.size: {(file.size / 1024).toFixed(2)} KB</p>
                <p>file.type: {file.type}</p>
            </div>
        )}
        {file && status !== "loading" && (
            <button onClick={handleUpload}>Upload</button>
        )}
        {status === "loading" && <p>Uploading...</p>}
        {status === "success" && <p>Upload successful!</p>}
        {status === "error" && <p>Upload failed. Please try again.</p>}
        </div>
    );
}