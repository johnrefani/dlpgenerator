import { useState, useEffect } from "react";
import { generateFilledDocx } from "@/lib/docx";
import DocxPreviewer from "@/components/DocxPreviewer";

export interface DocxViewerProps {
  cloudUrl: string;
  pangalanNgGuro: string;
  petsaAtOras: string;
  baitang: string;
  asignatura: string;
  markahan: string;
}

export default function DocxViewer({
  cloudUrl,
  pangalanNgGuro,
  petsaAtOras,
  baitang,
  asignatura,
  markahan,
}: DocxViewerProps) {
  const [blob, setBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadBlob, setDownloadBlob] = useState<Blob | null>(null);

  useEffect(() => {
    setBlob(null);
    setError(null);
    
    generateFilledDocx(cloudUrl, {
      "Pangalan ng Guro": pangalanNgGuro,
      "Petsa at Oras ng Pagtuturo": petsaAtOras,
      baitang,
      asignatura,
      markahan,
    })
      .then(blob => {
        setBlob(blob);
        return blob;
      })
      .catch((err: string) => {
        console.error(err);
        setError("Failed to render document");
      });
    
    generateFilledDocx(cloudUrl, {
      "Pangalan ng Guro": pangalanNgGuro,
      "Petsa at Oras ng Pagtuturo": petsaAtOras,
      baitang,
      asignatura,
      markahan,
    })
      .then(setDownloadBlob)
      .catch(console.error);

  }, [cloudUrl, pangalanNgGuro, petsaAtOras, baitang, asignatura, markahan]);

  const handleDownload = () => {
    if (!downloadBlob) return;
    
    const url = URL.createObjectURL(downloadBlob);
    const fileName = `DLL-${baitang}-${asignatura}-${markahan}.docx`;
    
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

  if (error)
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded w-full text-center">
        {error}
      </div>
    );
    
  if (!blob)
    return (
      <div className="text-blue-950 justify-self-center text-lg font-semibold lg:text-xl p-4 w-full md:w-[350px] lg:w-[450px] bg-white rounded text-center">
        Loading document…
      </div>
    );

  return (
    <div className="w-full overflow-hidden relative">
      <DocxPreviewer blob={blob} />
      
      <button
        onClick={handleDownload}
        disabled={!downloadBlob}
        className="fixed bottom-6 right-6 bg-blue-500 text-white rounded-full p-3 md:p-4 lg:p-5 shadow-lg hover:bg-blue-600 focus:outline-none transition duration-150 ease-in-out z-1000"
        aria-label="Download document"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:w-6 md:h-6 lg:w-7 lg:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </button>
    </div>
  );
}