import axios from 'axios';
import { format, subDays } from 'date-fns';
import { StockData, StockEvent } from '../types/StockTypes';

// Get the base API URL from environment variables, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';
const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY || 'your-default-key';

export const getStartDate = (period: string): Date => {
  const today = new Date();
  const mapping: { [key: string]: number } = {
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '1Y': 365,
    '5Y': 5 * 365,
  };
  const days = mapping[period] || 365;
  return subDays(today, days);
};

export const getStockNews = async (
  ticker: string,
  startDate: Date,
  endDate: Date
): Promise<StockEvent[]> => {
  if (!ticker) return [];
  try {
    const response = await axios.get('https://finnhub.io/api/v1/company-news', {
      params: {
        symbol: ticker,
        from: format(startDate, 'yyyy-MM-dd'),
        to: format(endDate, 'yyyy-MM-dd'),
        token: FINNHUB_API_KEY,
      },
    });
    if (!Array.isArray(response.data)) return [];
    return response.data.map((item: any) => ({
      date: item.datetime ? format(new Date(item.datetime * 1000), 'yyyy-MM-dd') : '',
      type: 'news',
      event: item.headline || 'News',
      description: item.summary || 'No summary available',
      url: item.url,
    }));
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

export const getStockEvents = async (
  ticker: string,
  startDate: Date,
  endDate: Date
): Promise<StockEvent[]> => {
  if (!ticker) return [];
  try {
    const response = await axios.get(`${API_BASE_URL}/stock-events`, {
      params: {
        ticker,
        start: format(startDate, 'yyyy-MM-dd'),
        end: format(endDate, 'yyyy-MM-dd'),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock events:', error);
    return [];
  }
};

export const getStockData = async (
  ticker: string,
  startDate: Date
): Promise<StockData[]> => {
  if (!ticker) return [];
  try {
    const endDate = new Date();
    const response = await axios.get(`${API_BASE_URL}/stock-data`, {
      params: {
        ticker,
        start: format(startDate, 'yyyy-MM-dd'),
        end: format(endDate, 'yyyy-MM-dd'),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return [];
  }
};