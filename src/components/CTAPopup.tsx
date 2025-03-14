import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface CTAPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CTAPopup = ({ isOpen, onClose }: CTAPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-[#2a2a2a] rounded-lg p-6 max-w-md w-full border border-[#374151] shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">Enjoying RetailEdge?</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-300 mb-6">
          We hope you're finding our stock analysis tools valuable! For even more powerful features and insights, check out our premium plans.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 text-white rounded py-2 px-4 hover:bg-gray-600"
          >
            Maybe Later
          </button>
          <Link
            to="/pricing"
            className="flex-1 bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700 text-center"
            onClick={onClose}
          >
            View Premium Plans
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTAPopup; 