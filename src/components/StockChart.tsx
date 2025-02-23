import React, { useMemo, useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { parseISO, format } from 'date-fns';
import { StockData, StockEvent, TimeFrame } from '../types/StockTypes';
import { THEME } from '../App';

interface StockChartProps {
  ticker: string;
  timeFrame: TimeFrame;
  events?: StockEvent[];
  data?: StockData[];
}

const COLOR_MAP: { [key: string]: string } = {
  news: '#ef4444',     // Red
  dividend: '#22c55e', // Green (from logo)
  split: '#f97316',    // Orange
};

const StockChart: React.FC<StockChartProps> = ({
  ticker,
  timeFrame,
  events = [],
  data = [],
}) => {
  const preparedData = useMemo(() => {
    const withTimestamps = data.map((d) => ({
      ...d,
      x: parseISO(d.date).getTime(),
      open: Number(d.open),
      high: Number(d.high),
      low: Number(d.low),
      close: Number(d.close),
    }));
    withTimestamps.sort((a, b) => a.x - b.x);
    return withTimestamps;
  }, [data]);

  const [xMin, xMax] = useMemo(() => {
    if (!preparedData.length) return [0, 100];
    const min = preparedData[0].x;
    const max = preparedData[preparedData.length - 1].x;
    return [min, max];
  }, [preparedData]);

  const [minClose, maxClose] = useMemo(() => {
    if (!preparedData.length) return [0, 100];
    const closes = preparedData.map((pt) => pt.close);
    return [Math.min(...closes), Math.max(...closes)];
  }, [preparedData]);

  const stockDomain: [number, number] = [
    minClose * 0.95,
    maxClose * 1.05,
  ];

  const eventPoints = useMemo(() => {
    const points: Array<StockEvent & { x: number; close: number }> = [];
    console.log('Processing events:', events);
    events.forEach((evt) => {
      const eventTime = parseISO(evt.date).getTime();
      if (eventTime < xMin || eventTime > xMax) {
        console.log('Event outside range:', evt);
        return;
      }
      const validPoints = preparedData.filter((pt) => pt.x <= eventTime);
      if (!validPoints.length) {
        console.log('No valid points for event:', evt);
        return;
      }
      const match = validPoints[validPoints.length - 1];
      points.push({ ...evt, x: match.x, close: match.close });
    });
    console.log('Final event points:', points);
    return points;
  }, [events, preparedData, xMin, xMax]);

  const groupedByType: Record<string, (StockEvent & { x: number; close: number })[]> = {};
  for (const ep of eventPoints) {
    if (!groupedByType[ep.type]) {
      groupedByType[ep.type] = [];
    }
    groupedByType[ep.type].push(ep);
  }
  console.log('Grouped events by type:', groupedByType);

  const [hoveredPoint, setHoveredPoint] = useState<null | {
    x: number;
    open: number;
    close: number;
  }>(null);

  const handleMouseMove = (state: any) => {
    if (!state || !state.activeLabel || !preparedData.length) {
      setHoveredPoint(null);
      return;
    }
    const activeTime = state.activeLabel as number;
    const nearest = preparedData.find(pt => pt.x === activeTime) || 
      preparedData.reduce((prev, curr) => {
        return Math.abs(curr.x - activeTime) < Math.abs(prev.x - activeTime)
          ? curr
          : prev;
      }, preparedData[0]);
    setHoveredPoint({ x: nearest.x, open: nearest.open, close: nearest.close });
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const stockPoint = payload.find((p: any) => p.dataKey === 'close');
    const eventPoint = payload.find((p: any) => p.payload.event);

    if (!stockPoint) return null;

    return (
      <div className="bg-[#2a2a2a] p-3 rounded shadow-lg border border-[#374151] text-white">
        <div>
          <p className="font-bold">
            {format(new Date(stockPoint.payload.x), 'MMM d, yyyy')}
          </p>
          <p>Open: ${stockPoint.payload.open?.toFixed(2)}</p>
          <p>Close: ${stockPoint.payload.close?.toFixed(2)}</p>
          <p>
            Change:{' '}
            {(
              ((stockPoint.payload.close - stockPoint.payload.open) /
                stockPoint.payload.open) *
              100
            ).toFixed(2)}
            %
          </p>
        </div>
        {eventPoint && (
          <div className="border-t border-[#374151] pt-2 mt-2">
            <p className="font-bold">{eventPoint.payload.event}</p>
            <p className="text-gray-300">{eventPoint.payload.description}</p>
          </div>
        )}
      </div>
    );
  };

  if (!preparedData.length) {
    return <div className="p-4 text-gray-400">No stock data available</div>;
  }

  return (
    <div className="relative w-full h-[600px] p-4">
      <div
        className="absolute top-0 left-0 p-2 bg-[#2a2a2a] border border-[#374151] 
                   rounded shadow-lg text-white"
      >
        {hoveredPoint ? (
          <>
            <p className="font-bold">
              {format(new Date(hoveredPoint.x), 'MMM d, yyyy')}
            </p>
            <p>Open: ${hoveredPoint.open.toFixed(2)}</p>
            <p>Close: ${hoveredPoint.close.toFixed(2)}</p>
            <p>
              Change:{' '}
              {(
                ((hoveredPoint.close - hoveredPoint.open) /
                  hoveredPoint.open) *
                100
              ).toFixed(2)}
              %
            </p>
          </>
        ) : (
          <p>Hover over the chart</p>
        )}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={preparedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="#374151"
            vertical={false}
          />

          <XAxis
            dataKey="x"
            type="number"
            scale="time"
            domain={[xMin, xMax]}
            tickFormatter={(time) => format(new Date(time), 'MMM d')}
            ticks={Array.from({ length: 6 }, (_, i) => 
              xMin + (xMax - xMin) * (i / 5)
            )}
            stroke="#94a3b8"
          />

          <YAxis 
            yAxisId="stock" 
            domain={stockDomain}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
            stroke="#94a3b8"
          />
          <YAxis yAxisId="events" domain={stockDomain} hide />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#94a3b8', strokeDasharray: '3 3' }}
          />

          <defs>
            <linearGradient id="stockLine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7dd3fc" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.8}/>
            </linearGradient>
          </defs>

          <Line
            yAxisId="stock"
            type="monotone"
            dataKey="close"
            stroke="url(#stockLine)"
            strokeWidth={2}
            dot={false}
          />

          {Object.entries(groupedByType).map(([type, arr]) => {
            const color = COLOR_MAP[type] || '#999';
            return (
              <Line
                key={type}
                yAxisId="events"
                data={arr}
                dataKey="close"
                stroke="none"
                dot={{ r: 5, fill: color }}
                isAnimationActive={false}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;