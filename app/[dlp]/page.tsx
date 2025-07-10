"use client";

import { useSearchParams } from "next/navigation";
import {
  dllData,
  DocxViewer,
} from "@/lib/imports";

export default function Page() {
  const searchParams = useSearchParams();
  
  const paaralan = searchParams.get("paaralan") || "N/A";
  const pangalanNgGuro = searchParams.get("pangalanNgGuro") || "N/A";
  const petsaAtOras = searchParams.get("petsaAtOras") || "N/A";
  const markahan = searchParams.get("markahan") || "N/A";

  const selected = dllData.find((d) => d.code === markahan);

  if (!selected) {
    return (
      <div className="w-full py-8 px-4 max-w-6xl justify-self-center">
        <p className="text-red-600 text-center bg-white p-8 text-lg lg:text-xl font-semibold">
          Paumanhin ngunit ang dokumento na iyong hinahanap ay hindi makita!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full py-8 px-4">
      <DocxViewer
        cloudUrl={selected.dllLink}
        code={markahan}
        paaralan={paaralan}
        pangalanNgGuro={pangalanNgGuro}
        petsaAtOras={petsaAtOras}
      />
    </div>
  );
}