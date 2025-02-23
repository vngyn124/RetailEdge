import React from 'react';
import { TimeFrame } from '../types/StockTypes';

interface ControlsProps {
  ticker: string;
  onTickerChange: (ticker: string) => void;
  timeFrame: TimeFrame;
  onTimeFrameChange: (timeFrame: TimeFrame) => void;
  eventTypes: string[];
  activeEventTypes: string[];
  onEventTypeToggle: (type: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  ticker,
  onTickerChange,
  timeFrame,
  onTimeFrameChange,
  eventTypes,
  activeEventTypes,
  onEventTypeToggle,
}) => {
  const timeFrames: TimeFrame[] = ['1D', '1W', '1M', '3M', '1Y', '5Y'];

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-[#2a2a2a] rounded-lg shadow-xl border border-[#374151]">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-200">Ticker</label>
        <input
          type="text"
          value={ticker}
          onChange={(e) => onTickerChange(e.target.value.toUpperCase())}
          className="mt-1 block w-full rounded-md border-[#374151] bg-[#1a1a1a] text-white shadow-sm 
                   focus:border-blue-500 focus:ring-blue-500 placeholder-gray-500"
          placeholder="Enter ticker symbol"
        />
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-200">Time Frame</label>
        <div className="mt-1 flex gap-2">
          {timeFrames.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeFrameChange(tf)}
              className={`px-3 py-1 rounded ${
                timeFrame === tf
                  ? 'bg-blue-500 text-white'
                  : 'bg-[#374151] text-gray-200 hover:bg-[#4b5563]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-200">Event Types</label>
        <div className="mt-1 flex gap-4">
          {eventTypes.map((type) => (
            <label key={type} className="inline-flex items-center">
              <input
                type="checkbox"
                checked={activeEventTypes.includes(type)}
                onChange={() => onEventTypeToggle(type)}
                className="rounded border-[#374151] bg-[#1a1a1a] text-blue-500 
                         focus:ring-blue-500 focus:ring-offset-0"
              />
              <span className="ml-2 text-sm text-gray-200 capitalize">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Controls