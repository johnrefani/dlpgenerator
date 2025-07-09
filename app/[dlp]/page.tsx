"use client";

import { dllData } from "@/data";
import DocxViewer from "@/components/DocxViewer";

export default function Page() {
  const code = "Q1_W1"

  const selected = dllData.find(
    (d) =>
      d.code === code
  );

  if (!selected) {
    return (
      <div className="w-full py-8 px-4 max-w-6xl justify-self-center">
        <p className="text-red-600 text-center bg-white p-8 text-lg lg:text-xl font-semibold">
          Paumanhin ngunit ang dokumento na iyong hinahanap ay wala!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      <DocxViewer
        cloudUrl={selected.dllLink}
        code={code}
        paaralan="CNSC"
        pangalanNgGuro="Ambo"
        petsaAtOras="July 9 - 10, 2025 WEEK 1 9:30 AM - 10:30 AM"
      />
    </div>
  );
}