import React from 'react';

const AdBanner = ({ position }: { position: 'left' | 'right' }) => {
  const adStyles = {
    left: {
      position: 'absolute',
      left: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '12%',
      height: '600px',
      marginLeft: '5px',
      zIndex: 10,
    },
    right: {
      position: 'absolute',
      right: '0',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '12%',
      height: '600px',
      marginRight: '5px',
      zIndex: 10,
    }
  };

  const selectedStyle = position === 'left' ? adStyles.left : adStyles.right;

  return (
    <div 
      style={selectedStyle as React.CSSProperties} 
      className="bg-[#2a2a2a] border border-[#374151] rounded-lg flex flex-col items-center justify-center"
    >
      <div className="text-gray-400 text-center p-3">
        <div className="text-xl font-bold mb-2">PLACE AD HERE</div>
        <div className="text-sm">Banner Ad</div>
        <div className="mt-4 border-2 border-dashed border-gray-500 p-2 rounded">
          <div className="text-xs">Your ad here</div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner; 