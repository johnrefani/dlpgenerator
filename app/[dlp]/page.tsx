"use client";

import { dllData } from "@/data";
import DocxViewer from "@/components/DocxViewer";

export default function Page() {
  const baitang = "4";
  const asignatura = "GMRC";
  const markahan = "2";

  const selected = dllData.find(
    (d) =>
      d.baitang === baitang &&
      d.asignatura === asignatura &&
      d.markahan === markahan
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
        pangalanNgGuro="Ambo"
        petsaAtOras="2025-07-08 08:00"
        baitang={baitang}
        asignatura={asignatura}
        markahan={markahan}
      />
    </div>
  );
}