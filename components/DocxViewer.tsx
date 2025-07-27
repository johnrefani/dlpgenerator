"use client"

import { useState, useEffect, useCallback } from "react";
import { generateFilledDocx } from "@/lib/docx";
import DocxPreviewer from "./DocxPreviewer";
import { DocxViewerProps } from "@/lib/props";

export default function DocxViewer({
  cloudUrl,
  paaralan,
  pangalanNgGuro,
  petsaAtOras,
  code,
}: DocxViewerProps) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const generateDocument = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const generatedBlob = await generateFilledDocx(cloudUrl, {
        "Pangalan ng Guro": pangalanNgGuro,
        "Petsa at Oras ng Pagtuturo": petsaAtOras,
        "Paaralan": paaralan,
      });
      
      setBlob(generatedBlob);
    } catch (err) {
      console.error("Document generation error:", err);
      setError("Failed to generate document");
    } finally {
      setIsLoading(false);
    }
  }, [cloudUrl, paaralan, pangalanNgGuro, petsaAtOras]);

  useEffect(() => {
    generateDocument();
  }, [generateDocument]);

  const handleDownload = useCallback(async () => {
    try {
      if (!blob) {
        const newBlob = await generateFilledDocx(cloudUrl, {
          "Pangalan ng Guro": pangalanNgGuro,
          "Petsa at Oras ng Pagtuturo": petsaAtOras,
          "Paaralan": paaralan,
        });
        downloadBlob(newBlob);
      } else {
        downloadBlob(blob);
      }
    } catch (err) {
      console.error("Download error:", err);
      setError("Failed to prepare download");
    }
  }, [blob, cloudUrl, paaralan, pangalanNgGuro, petsaAtOras]);

  const downloadBlob = (blobToDownload: Blob) => {
    const url = URL.createObjectURL(blobToDownload);
    const fileName = `DLL_MATATAG_GMRC_4_${code}.docx`;
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  if (error) {
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded w-full text-center mt-6">
        {error}
      </div>
    );
  }

  if (isLoading || !blob) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-x-4 border-blue-300"></div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden relative">
      <DocxPreviewer blob={blob} />
      
      <button
        onClick={handleDownload}
        className="fixed bottom-6 right-6 bg-red-600 text-white rounded-full p-4 shadow-lg hover:bg-red-700 focus:outline-none transition-colors duration-200 z-50"
        aria-label="Download document"
        title="Download document"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  );
}