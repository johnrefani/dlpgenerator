import React from 'react';
import { LoadingPopupProps } from '@/lib/props';

const LoadingPopup: React.FC<LoadingPopupProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="relative w-80 rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-blue-600 border-blue-200"></div>
        </div>

        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-blue-900">Naghahanap ng Dokumento</h3>
          <p className="mt-2 text-sm text-blue-600">Maaring maghintay habang hinahanap namin ang iyong dokumento...</p>
        </div>

        <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-[#6B7FAF] to-[#FF2DAA]"></div>
      </div>
    </div>
  );
};

export default LoadingPopup;