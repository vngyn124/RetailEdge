import React from 'react';
import { StockEvent } from '../types/StockTypes';

interface EventListProps {
  events: StockEvent[];
  onEventClick?: (event: StockEvent) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick }) => {
  const handleClick = (event: StockEvent) => {
    if (event.url) {
      navigator.clipboard.writeText(event.url);
    }
    if (onEventClick) {
      onEventClick(event);
    }
  };

  return (
    <div className="bg-[#2a2a2a] rounded-lg shadow-xl border border-[#374151] p-4 max-h-[600px] overflow-y-auto">
      <h3 className="text-xl font-bold text-white mb-4">Events</h3>
      <div className="space-y-4">
        {events.map((event, index) => (
          <div 
            key={index}
            className="p-4 border border-[#374151] rounded hover:bg-[#374151] cursor-pointer transition-colors"
            onClick={() => handleClick(event)}
          >
            <p className="text-sm text-gray-400">{event.date}</p>
            <p className="font-medium text-white">{event.event}</p>
            <p className="text-sm text-gray-300">{event.description}</p>
            {event.url && (
              <p className="text-sm text-blue-400 hover:text-blue-300 mt-1">
                Click to copy link
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList