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
      .then(setBlob)
      .catch((err: string) => {
        console.error(err);
        setError("Failed to render document");
      });
  }, [cloudUrl, pangalanNgGuro, petsaAtOras, baitang, asignatura, markahan]);

  if (error)
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded w-full text-center">
        {error}
      </div>
    );
  if (!blob)
    return (
      <div className="mx-[16px] md:mx-[120px] lg:mx-[240px] text-blue-950 font-semibold bg-blue-50 p-4 border-2 border-blue-200 rounded text-center">
        Loading document…
      </div>
    );

  return (
    <div className="w-full overflow-hidden">
      <DocxPreviewer blob={blob} />
    </div>
  );
}