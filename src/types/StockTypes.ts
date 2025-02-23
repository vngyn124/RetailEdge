export type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y';

export interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockEvent {
  date: string;
  type: 'news' | 'dividend' | 'split';
  event: string;
  description: string;
  url?: string;
}