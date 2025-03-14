import { Link } from 'react-router-dom';

interface CTAPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const CTAPopup = ({ isOpen, onClose }: CTAPopupProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-[#1e2533] rounded-lg p-8 max-w-md w-full shadow-xl text-center text-white relative border border-[#3a4c6a]">
        {/* Close button - faint X at top */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-white opacity-60 hover:opacity-100"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Icon */}
        <div className="mx-auto bg-gradient-to-r from-[#3a4c6a] to-[#1e2533] rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4 border-2 border-white">
          <svg className="h-8 w-8 text-[#4fc3e8]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        
        {/* Main heading with gradient text */}
        <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-[#4fc3e8] to-[#4ab98e]">Level Up Your Trading</h3>
        
        {/* Descriptive text */}
        <p className="mb-6 text-white">
          Unlock more stock searches and access advanced charting tools to enhance your investment strategy!
        </p>
        
        {/* Subscribe button with gradient */}
        <Link
          to="/pricing"
          className="inline-block bg-gradient-to-r from-[#4fc3e8] to-[#4ab98e] text-white font-semibold rounded-md py-2 px-8 hover:opacity-90 transition-all shadow-lg transform hover:-translate-y-0.5"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  );
};

export default CTAPopup; 