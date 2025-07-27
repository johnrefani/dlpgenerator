'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { FaChevronRight, FaExclamationCircle } from 'react-icons/fa';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import { format, isSameMonth, parse, isSameDay } from 'date-fns';

import {
  Button,
  markahanOptions,
  LoadingPopup,
} from "@/lib/imports";

const ErrorMessage = ({ message }: { message: string }) => (
  <div className="flex items-center mt-1 text-red-600 text-xs">
    <FaExclamationCircle className="mr-1" />
    <span>{message}</span>
  </div>
);

const InfoForm = () => {
  const router = useRouter();
  const [range, setRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [weekNumber, setWeekNumber] = useState<string>('1');
  const [startTime, setStartTime] = useState<string>('09:30');
  const [endTime, setEndTime] = useState<string>('10:30');
  const [markahan, setMarkahan] = useState<string>('Q1_W1');
  const [paaralan, setPaaralan] = useState<string>('');
  const [pangalanNgGuro, setPangalanNgGuro] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setRange({
      ...ranges.selection,
      endDate: startDate && endDate && isSameDay(startDate, endDate) ? startDate : endDate,
    });
    if (errors.dateRange) {
      const newErrors = { ...errors };
      delete newErrors.dateRange;
      setErrors(newErrors);
    }
    if (startDate && endDate && !isSameDay(startDate, endDate)) {
      setShowCalendar(false);
    }
  };

  const formattedDateRange = (() => {
    if (!range.startDate) return 'Select a date range';
    if (!range.endDate || isSameDay(range.startDate, range.endDate)) {
      return format(range.startDate, 'MMMM d, yyyy');
    }
    if (isSameMonth(range.startDate, range.endDate)) {
      return `${format(range.startDate, 'MMMM d')} - ${format(range.endDate, 'd, yyyy')}`;
    }
    return `${format(range.startDate, 'MMMM d')} - ${format(range.endDate, 'MMMM d, yyyy')}`;
  })();

  const formatTimeWithAMPM = (time: string) => {
    const parsedTime = parse(time, 'HH:mm', new Date());
    return format(parsedTime, 'h:mm a');
  };

  const formattedOutput =
    range.startDate && range.endDate
      ? `${formattedDateRange} WEEK ${weekNumber} ${formatTimeWithAMPM(startTime)} - ${formatTimeWithAMPM(endTime)}`
      : 'Select a date range';

  const href = `/${markahan}?${new URLSearchParams({
    paaralan,
    pangalanNgGuro,
    petsaAtOras: formattedOutput,
    markahan,
  }).toString()}`;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!paaralan.trim()) {
      newErrors.paaralan = 'Paaralan ay kailangang ilagay';
    }
    if (!pangalanNgGuro.trim()) {
      newErrors.pangalanNgGuro = 'Pangalan ng guro ay kailangang ilagay';
    }
    if (!range.startDate) {
      newErrors.dateRange = 'Pumili ng petsa';
    }
    if (!weekNumber || isNaN(Number(weekNumber))) {
      newErrors.weekNumber = 'Linggo ay dapat numero';
    }
    if (!startTime) {
      newErrors.startTime = 'Oras ng pagsisimula ay kailangan';
    }
    if (!endTime) {
      newErrors.endTime = 'Oras ng pagtatapos ay kailangan';
    }
    if (startTime && endTime && startTime >= endTime) {
      newErrors.timeRange = 'Oras ng pagtatapos ay dapat mas huli sa pagsisimula';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePreviewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const isValid = validateForm();
    if (!isValid) {
      const firstError = Object.keys(errors)[0];
      document.getElementById(firstError)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(href);
    }, 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInputClass = (fieldName: string) => 
    `w-full p-2 border rounded ${errors[fieldName] ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <div className="bg-white rounded-lg p-6 lg:p-8 max-w-[750px] space-y-6 lg:space-y-8">
      <div className="flex space-x-2 justify-center">
        <Image src="/logo.png" alt="logo" height={80} width={80} />
        <h1 className="text-base font-bold text-blue-950">
          Polytechnic University of the Philippines
          <br />
          <span>Lesson Plan Generator anchored to DepEd</span>
          <br />
          <span>MATATAG  CURRICULUM Lingguhang Aralin</span>
        </h1>
      </div>
      <div>
        <h1 className="font-bold text-base text-blue-950 mb-1.5">PANGUNAHING IMPORMASYON</h1>
        <p className="text-xs text-blue-950/50">Ibigay ang mga kinakailangang impormasyon.</p>
      </div>
      <div className="border-t-3 border-blue-950/25 w-full"></div>
      <div className="px-4 md:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6">
        <label htmlFor="paaralan" className="flex items-center text-blue-950 font-semibold text-sm col-span-2">
          Paaralan
        </label>
        <div className="col-span-3">
          <input
            type="text"
            id="paaralan"
            value={paaralan}
            onChange={(e) => {
              setPaaralan(e.target.value);
              if (errors.paaralan) setErrors({...errors, paaralan: ''});
            }}
            className={getInputClass('paaralan')}
          />
          {errors.paaralan && <ErrorMessage message={errors.paaralan} />}
        </div>

        <label htmlFor="pangalan" className="flex items-center text-blue-950 font-semibold text-sm col-span-2">
          Pangalan ng Guro
        </label>
        <div className="col-span-3">
          <input
            type="text"
            id="pangalan"
            value={pangalanNgGuro}
            onChange={(e) => {
              setPangalanNgGuro(e.target.value);
              if (errors.pangalanNgGuro) setErrors({...errors, pangalanNgGuro: ''});
            }}
            className={getInputClass('pangalanNgGuro')}
          />
          {errors.pangalanNgGuro && <ErrorMessage message={errors.pangalanNgGuro} />}
        </div>

        <label className="flex items-start text-blue-950 font-semibold text-sm col-span-2">
          Petsa at Oras ng Pagtuturo
        </label>
        <div className="col-span-3 grid grid-cols-2 gap-4 items-end">
          <div className="" ref={calendarRef}>
            <label htmlFor="petsa" className="flex items-center text-blue-950 font-semibold text-xs col-span-2 mb-1.5">
              Hanay ng Petsa
            </label>
            <input
              type="text"
              id="dateRange"
              value={formattedDateRange}
              readOnly
              onClick={() => setShowCalendar(!showCalendar)}
              className={`w-full p-2 border rounded cursor-pointer ${errors.dateRange ? 'border-red-500' : 'border-gray-300'}`}
              aria-expanded={showCalendar}
              aria-controls="date-range-picker"
              aria-haspopup="dialog"
            />
            {errors.dateRange && <ErrorMessage message={errors.dateRange} />}
            {showCalendar && (
              <div
                className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow-lg"
                id="date-range-picker"
                role="dialog"
                aria-label="Date range picker"
              >
                <DateRangePicker
                  ranges={[range]}
                  onChange={handleRangeChange}
                  showDateDisplay={false}
                  showMonthAndYearPickers={false}
                  className="w-full"
                />
              </div>
            )}

          </div>
          <div>
             <label htmlFor="linggo" className="flex items-center text-blue-950 font-semibold text-xs mb-1.5">
            Pumili ng Linggo
          </label>
          <div className="">
            <input
              type="number"
              id="linggo"
              value={weekNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || (Number(value) > 0 && !isNaN(Number(value)))) {
                  setWeekNumber(value);
                  if (errors.weekNumber) setErrors({...errors, weekNumber: ''});
                }
              }}
              min="1"
              className={getInputClass('weekNumber')}
            />
            {errors.weekNumber && <ErrorMessage message={errors.weekNumber} />}
          </div>
          </div>
         

          <div className="col-span-2 grid grid-cols-2 gap-4 items-end">
            <div>
              <label htmlFor="oras-simula" className="flex items-center text-blue-950 font-semibold text-xs mb-1.5">
                Oras ng Pagsisimula
              </label>
              <input
                type="time"
                id="oras-simula"
                value={startTime}
                onChange={(e) => {
                  setStartTime(e.target.value);
                  if (errors.startTime || errors.timeRange) {
                    const newErrors = {...errors};
                    delete newErrors.startTime;
                    delete newErrors.timeRange;
                    setErrors(newErrors);
                  }
                }}
                className={getInputClass('startTime')}
              />
              {errors.startTime && <ErrorMessage message={errors.startTime} />}
            </div>
            <div>
              <label htmlFor="oras-tapos" className="text-blue-950 font-semibold text-xs mb-1.5">
                Oras ng Pagtatapos
              </label>
              <input
                type="time"
                id="oras-tapos"
                value={endTime}
                onChange={(e) => {
                  setEndTime(e.target.value);
                  if (errors.endTime || errors.timeRange) {
                    const newErrors = {...errors};
                    delete newErrors.endTime;
                    delete newErrors.timeRange;
                    setErrors(newErrors);
                  }
                }}
                className={getInputClass('endTime')}
              />
              {errors.endTime && <ErrorMessage message={errors.endTime} />}
            </div>
          </div>
          {errors.timeRange && (
            <div className="col-span-2">
              <ErrorMessage message={errors.timeRange} />
            </div>
          )}

          <div className="col-span-2 mt-2">
            <label className="text-blue-950 font-semibold text-xs">Preview:</label>
            <p className="text-sm text-blue-950">{formattedOutput}</p>
          </div>
        </div>

        <label htmlFor="markahan" className="flex items-center text-blue-950 font-semibold text-sm col-span-2">
          Markahan at Linggo
        </label>
        <select
          id="markahan"
          value={markahan}
          onChange={(e) => setMarkahan(e.target.value)}
          className="w-full col-span-3 p-2 border border-gray-300 rounded"
        >
          {markahanOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="justify-self-end">
        <Button
          title="Preview"
          href={href}
          onClick={handlePreviewClick}
          icon={<FaChevronRight />}
          className="justify-self-end"
        />
      </div>

      <LoadingPopup isOpen={isLoading} />
    </div>
  );
};

export default InfoForm;