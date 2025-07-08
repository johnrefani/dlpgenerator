"use client"

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import Button from './Button';
import { FaChevronRight } from 'react-icons/fa';
import { DateRangePicker, Range, RangeKeyDict } from 'react-date-range';
import { format, isSameMonth, parse, addDays, isSameDay } from 'date-fns';
import { markahanOptions } from '@/data';

const InfoForm = () => {
  const [range, setRange] = useState<Range>({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: 'selection',
  });

  const [weekNumber, setWeekNumber] = useState<string>('1');
  const [startTime, setStartTime] = useState<string>('09:30');
  const [endTime, setEndTime] = useState<string>('10:30');
  const [markahan, setMarkahan] = useState<string>('Q1_W1');
  const [showCalendar, setShowCalendar] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  const handleRangeChange = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    
    if (startDate && endDate && isSameDay(startDate, endDate)) {
      setRange({
        ...ranges.selection,
        endDate: addDays(endDate, 1),
      });
      setShowCalendar(false);
    } else {
      setRange(ranges.selection);
      if (startDate !== endDate) {
        setShowCalendar(false);
      }
    }
  };

  const formattedDateRange =
    range.startDate && range.endDate
      ? isSameMonth(range.startDate, range.endDate)
        ? `${format(range.startDate, 'MMMM d')} - ${format(range.endDate, 'd, yyyy')}`
        : `${format(range.startDate, 'MMMM d')} - ${format(range.endDate, 'MMMM d, yyyy')}`
      : 'Select a date range';

  const formatTimeWithAMPM = (time: string) => {
    const parsedTime = parse(time, 'HH:mm', new Date());
    return format(parsedTime, 'h:mm a');
  };

  const formattedOutput =
    range.startDate && range.endDate
      ? `${formattedDateRange} WEEK ${weekNumber} ${formatTimeWithAMPM(startTime)} - ${formatTimeWithAMPM(endTime)}`
      : 'Select a date range';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-lg p-8 max-w-[750px] space-y-8">
      <div className="flex space-x-2 justify-center">
        <Image src="/logo.png" alt="logo" height={80} width={80} />
        <h1 className="text-base font-bold text-blue-950">
          MATATAG
          <br />
          <span>K-12 Curriculum</span>
          <br />
          <span>Lingguhan Aralin</span>
        </h1>
      </div>
      <div>
        <h1 className="font-bold text-base text-blue-950 mb-1.5">PANGUNAHING IMPORMASYON</h1>
        <p className="text-xs text-blue-950/50">Ibigay ang mga kinakailangang impormasyon.</p>
      </div>
      <div className="border-t-3 border-blue-950/25 w-[685px]"></div>
      <div className="px-8 grid grid-cols-5 gap-6">
        <label htmlFor="paaralan" className="flex items-center text-blue-950 font-semibold text-sm col-span-2">
          Paaralan
        </label>
        <input type="text" id="paaralan" className="w-full col-span-3 p-2 border border-gray-300 rounded" />

        <label htmlFor="pangalan" className="flex items-center text-blue-950 font-semibold text-sm col-span-2">
          Pangalan ng Guro
        </label>
        <input type="text" id="pangalan" className="w-full col-span-3 p-2 border border-gray-300 rounded" />

        <label className="flex items-start text-blue-950 font-semibold text-sm col-span-2">
          Petsa at Oras ng Pagtuturo
        </label>
        <div className="col-span-3 grid grid-cols-2">
          <div className="col-span-2 mb-4 relative" ref={calendarRef}>
            <label htmlFor="petsa" className="flex items-center text-blue-950 font-semibold text-xs col-span-2 mb-1.5">
              Pumili ng hanay ng Petsa
            </label>
            <input
              type="text"
              id="petsa"
              value={formattedDateRange}
              readOnly
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full p-2 border border-gray-300 rounded cursor-pointer"
              aria-expanded={showCalendar}
              aria-controls="date-range-picker"
              aria-haspopup="dialog"
            />
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
          <label htmlFor="linggo" className="flex items-center text-blue-950 font-semibold text-xs col-span-2 mb-1.5">
            Pumili ng Linggo
          </label>
          <input
            type="number"
            id="linggo"
            value={weekNumber}
            onChange={(e) => setWeekNumber(e.target.value)}
            min="1"
            className="w-full col-span-1 mb-4 p-2 border border-gray-300 rounded"
          />

          <div className="col-span-2 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="oras-simula" className="text-blue-950 font-semibold text-xs mb-1.5">
                Oras ng Pagsisimula
              </label>
              <input
                type="time"
                id="oras-simula"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded time-picker"
              />
            </div>
            <div>
              <label htmlFor="oras-tapos" className="text-blue-950 font-semibold text-xs mb-1.5">
                Oras ng Pagtatapos
              </label>
              <input
                type="time"
                id="oras-tapos"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded time-picker"
              />
            </div>
          </div>

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
          className="w-full col-span-2 p-2 border border-gray-300 rounded markahan-combobox"
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
          href="#"
          icon={<FaChevronRight />}
          className="justify-self-end"
        />
      </div>
    </div>
  );
};

export default InfoForm;