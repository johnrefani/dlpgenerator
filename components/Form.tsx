import React from "react";
import Image from "next/image";
import Button from "./Button";
import { FaChevronRight } from "react-icons/fa";

const Form = () => {
  return (
    <div className="w-3xl min-h-[640px] bg-white rounded-lg shadow-lg px-6">
      <div className="flex-center gap-1.5 py-8">
        <div className="flex items-center">
          <Image src={"/logo.png"} alt="Logo" width={94} height={94} />
        </div>

        <div className="flex-col text-base font-semibold justify-center">
          <p>MATATAG</p>
          <p>K to 10 Kurikulum</p>
          <p>Lingguhang Aralin</p>
        </div>
      </div>

      <div className="mb-5">
        <p className="font-semibold text-base">PANGUNAHING IMPORMASYON</p>
        <p className="opacity-50 text-sm">
          Ibigay ang kinakailangang impormasyon.
        </p>
      </div>
      <hr className="opacity-50" />

      <form className="grid mt-6">
        <div className="grid grid-cols-5 gap-4 px-10">
          {/* Pangalan ng Guro */}
          <label className="col-span-2 flex items-center">
            Pangalan ng guro
          </label>
          <input type="text" className="max-w-80 col-span-3"placeholder="Ilagay ang buong pangalan" />

          {/* Petsa at Oras ng Pagtuturo */}
          <label className="col-span-2 flex items-center">
            Petsa at oras ng pagtuturo
          </label>
          <input
            type="date"
            className="max-w-72 col-span-3"
          />

          {/* Baitang */}
          <label className="col-span-2 flex items-center">Baitang</label>
          <select className="max-w-72 col-span-3">
            <option value="">Pumili ng Baitang</option>
            <option value="Grade 1">Baitang 1</option>
            <option value="Grade 2">Baitang 2</option>
            <option value="Grade 3">Baitang 3</option>
            <option value="Grade 4">Baitang 4</option>
            <option value="Grade 5">Baitang 5</option>
            <option value="Grade 6">Baitang 6</option>
          </select>

          {/* Asignatura */}
          <label className="col-span-2 flex items-center">Asignatura</label>
          <select className="max-w-72 col-span-3">
            <option value="">Pumili ng Asignatura</option>
            <option value="Filipino">Filipino</option>
            <option value="Math">Matematika</option>
            <option value="Science">Agham</option>
            <option value="English">Ingles</option>
            <option value="Araling Panlipunan">Araling Panlipunan</option>
            <option value="ESP">Edukasyon sa Pagpapakatao</option>
          </select>

          {/* Markahan at Linggo */}
          <label className="col-span-2 flex items-center">
            Markahan at Linggo
          </label>
          <select className="max-w-72 col-span-3">
            <option value="">Piliin ang Markahan at Linggo</option>
            <option value="Unang Markahan - Linggo 1">Unang Markahan - Linggo 1</option>
            <option value="Unang Markahan - Linggo 2">Unang Markahan - Linggo 2</option>
            <option value="Ikalawang Markahan - Linggo 1">Ikalawang Markahan - Linggo 1</option>
            <option value="Ikalawang Markahan - Linggo 2">Ikalawang Markahan - Linggo 2</option>
            <option value="Ikatlong Markahan - Linggo 1">Ikatlong Markahan - Linggo 1</option>
            <option value="Ikaapat na Markahan - Linggo 1">Ikaapat na Markahan - Linggo 1</option>
          </select>
        </div>

        {/* Button */}
        <Button
          title="Preview"
          href="#"
          icon={<FaChevronRight />}
          className="mt-8 justify-self-end"
        />
      </form>
    </div>
  );
};

export default Form;
