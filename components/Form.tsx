"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Button from "./Button";
import { FaChevronRight } from "react-icons/fa";

const Form = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [errors, setErrors] = useState({
    paaralan: false,
    teacher: false,
    datetime: false,
    grade: false,
    week: false,
  });

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const form = formRef.current;
    const paaralan = (form["paaralan"] as HTMLInputElement).value.trim();
    const teacher = (form["teacher"] as HTMLInputElement).value.trim();
    const datetime = (form["datetime"] as HTMLInputElement).value;
    const grade = (form["grade"] as HTMLSelectElement).value;
    const week = (form["week"] as HTMLSelectElement).value;

    const newErrors = {
      paaralan: paaralan === "",
      teacher: teacher === "",
      datetime: datetime === "",
      grade: grade === "",
      week: week === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) {
      console.warn("May mga kulang na impormasyon.");
    } else {
      console.log("✅ All inputs are valid!");
    }
  };

  return (
    <div className="max-w-3xl min-h-[640px] bg-white rounded-lg shadow-lg px-6 mx-2 mb-8">
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

      <form ref={formRef} className="grid mt-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-0 md:gap-x-6 gap-y-1 md:gap-y-8 px-2 md:px-10">
          {/* Pangalan ng Guro */}
          <label className="col-span-2 flex items-center ">
            Pangalan ng guro
          </label>
          <div className="col-span-3">
            <input
              type="text"
              name="teacher"
              className="max-w-80 w-full relative"
              placeholder="Ilagay ang buong pangalan"
            />
            {errors.teacher && (
              <p className="error-message">* Kailangan ilagay ang pangalan</p>
            )}
          </div>

          {/* Petsa at Oras */}
          <label className="col-span-2 flex items-center">
            Petsa at oras ng pagtuturo
          </label>
          <div className="col-span-3">
            <input
              type="datetime-local"
              name="datetime"
              className="max-w-72 w-full relative"
            />
            {errors.datetime && (
              <p className="error-message">* Kailangan ang petsa at oras</p>
            )}
          </div>

          {/* Baitang */}
          <label className="col-span-2 flex items-center">Baitang</label>
          <div className="col-span-3">
            <select name="grade" className="max-w-72 w-full relative">
              <option value="">Pumili ng Baitang</option>
              <option value="Grade 1">Baitang 1</option>
              <option value="Grade 2">Baitang 2</option>
              <option value="Grade 3">Baitang 3</option>
              <option value="Grade 4">Baitang 4</option>
              <option value="Grade 5">Baitang 5</option>
              <option value="Grade 6">Baitang 6</option>
            </select>
            {errors.grade && (
              <p className="error-message">* Piliin ang baitang</p>
            )}
          </div>


          {/* Markahan at Linggo */}
          <label className="col-span-2 flex items-center">
            Markahan at Linggo
          </label>
          <div className="col-span-3">
            <select name="week" className="max-w-72 w-full relative">
              <option value="">Piliin ang Markahan at Linggo</option>
              <option value="Unang Markahan - Linggo 1">
                Unang Markahan - Linggo 1
              </option>
              <option value="Unang Markahan - Linggo 2">
                Unang Markahan - Linggo 2
              </option>
              <option value="Ikalawang Markahan - Linggo 1">
                Ikalawang Markahan - Linggo 1
              </option>
              <option value="Ikalawang Markahan - Linggo 2">
                Ikalawang Markahan - Linggo 2
              </option>
              <option value="Ikatlong Markahan - Linggo 1">
                Ikatlong Markahan - Linggo 1
              </option>
              <option value="Ikaapat na Markahan - Linggo 1">
                Ikaapat na Markahan - Linggo 1
              </option>
            </select>
            {errors.week && (
              <p className="error-message">* Piliin ang markahan at linggo</p>
            )}
          </div>
        </div>

        {/* Button */}
        <div className="my-8 px-2 md:px-10 justify-self-end">
          <Button
            title="Preview"
            href="#"
            icon={<FaChevronRight />}
            className="justify-self-end"
            target="_self"
            onClick={handlePreviewClick}
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
