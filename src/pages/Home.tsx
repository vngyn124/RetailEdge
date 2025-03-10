import { useState, useEffect, useCallback, useRef } from 'react';
import StockChart from '../components/StockChart';
import EventList from '../components/EventList';
import Controls from '../components/Controls';
import { StockData, StockEvent, TimeFrame } from '../types/StockTypes';
import { getStockData, getStockNews, getStockEvents, getStartDate } from '../services/api';
import { debounce } from 'lodash';

const EVENT_TYPES = ['news', 'dividend', 'split'];

const Home = () => {
  const [ticker, setTicker] = useState('AAPL');
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('1Y');
  const [activeEventTypes, setActiveEventTypes] = useState(EVENT_TYPES);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [events, setEvents] = useState<StockEvent[]>([]);
  const [loading, setLoading] = useState(false);
  
  const featuresRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Scroll to section if URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      if (hash === 'features' && featuresRef.current) {
        featuresRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (hash === 'contact' && contactRef.current) {
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  // Debounced fetch function to prevent too many API calls
  const fetchData = useCallback(
    debounce(async (currentTicker: string, currentTimeFrame: TimeFrame, currentEventTypes: string[]) => {
      if (!currentTicker.trim()) {
        console.warn('Ticker is empty, skipping fetch');
        return;
      }

      setLoading(true);
      try {
        const startDate = getStartDate(currentTimeFrame);
        const endDate = new Date();

        // Fetch stock data
        const stockDataResponse = await getStockData(currentTicker, startDate, endDate);
        const formattedData = stockDataResponse.map(item => ({
          date: item.date,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          volume: item.volume,
        }));
        setStockData(formattedData);

        // Only fetch events if we have stock data
        if (formattedData.length > 0) {
          const allEvents: StockEvent[] = [];
          
          // Only fetch the event types that are active
          const fetchPromises: Promise<StockEvent[]>[] = [];
          
          if (currentEventTypes.includes('news')) {
            fetchPromises.push(getStockNews(currentTicker, startDate, endDate));
          } else {
            fetchPromises.push(Promise.resolve([]));
          }
          
          if (currentEventTypes.includes('dividend') || currentEventTypes.includes('split')) {
            fetchPromises.push(getStockEvents(currentTicker, startDate, endDate));
          } else {
            fetchPromises.push(Promise.resolve([]));
          }
          
          const [newsEvents, stockEvents] = await Promise.all(fetchPromises);
          console.log('News events:', newsEvents);
          console.log('Stock events (dividends/splits):', stockEvents);
          allEvents.push(...newsEvents, ...stockEvents);
          console.log('All events:', allEvents);
          setEvents(allEvents);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setStockData([]);
        setEvents([]);
        // Consider adding a toast/notification
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchData(ticker, timeFrame, activeEventTypes);
    
    // Cleanup
    return () => {
      fetchData.cancel();
    };
  }, [ticker, timeFrame, activeEventTypes, fetchData]);

  const handleTickerChange = (newTicker: string) => {
    setTicker(newTicker.toUpperCase());
  };

  const handleEventTypeToggle = (type: string) => {
    setActiveEventTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredEvents = events.filter(event => 
    activeEventTypes.includes(event.type)
  );

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-[#1a1a1a] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Professional Stock Analysis</span>
                  <span className="block text-blue-500">Made Simple</span>
                </h1>
                <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                  Track stocks, dividends, and market events in real-time with our advanced analytics platform.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Main Stock App Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Controls
          ticker={ticker}
          onTickerChange={handleTickerChange}
          timeFrame={timeFrame}
          onTimeFrameChange={setTimeFrame}
          eventTypes={EVENT_TYPES}
          activeEventTypes={activeEventTypes}
          onEventTypeToggle={handleEventTypeToggle}
        />

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-[#2a2a2a] rounded-lg shadow-xl border border-[#374151]">
              {stockData.length > 0 ? (
                <StockChart
                  data={stockData}
                  events={filteredEvents}
                />
              ) : (
                <div className="p-6 text-center text-gray-400">No stock data available</div>
              )}
            </div>
            <div>
              <EventList events={filteredEvents} />
            </div>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div id="features" ref={featuresRef} className="py-24 bg-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Advanced Trading Features
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Everything you need to make informed investment decisions
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#374151]">
              <div className="text-blue-500 text-2xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-white">Real-Time Analytics</h3>
              <p className="mt-4 text-gray-300">
                Track stock prices and market events as they happen with our real-time data feeds.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#374151]">
              <div className="text-green-500 text-2xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-white">Event Tracking</h3>
              <p className="mt-4 text-gray-300">
                Never miss important events with our comprehensive event tracking system.
              </p>
            </div>

            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#374151]">
              <div className="text-orange-500 text-2xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white">Advanced Charts</h3>
              <p className="mt-4 text-gray-300">
                Visualize market data with our professional-grade charting tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" ref={contactRef} className="py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">
              Get In Touch
            </h2>
            <p className="mt-4 text-xl text-gray-300">
              Have questions? We're here to help.
            </p>
          </div>

          <div className="mt-12 max-w-lg mx-auto">
            <form className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    className="py-3 px-4 block w-full bg-[#2a2a2a] border border-[#374151] rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="py-3 px-4 block w-full bg-[#2a2a2a] border border-[#374151] rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <div className="mt-1">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="py-3 px-4 block w-full bg-[#2a2a2a] border border-[#374151] rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 