from flask import Flask, request, jsonify
import yfinance as yf
from flask_cors import CORS
import pandas as pd
from functools import lru_cache
from datetime import datetime, timedelta
import logging
import os
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

# Configure CORS to be completely open
CORS(app, 
     resources={r"/*": {
         "origins": "*",
         "methods": ["GET", "POST", "OPTIONS"],
         "allow_headers": "*"
     }})

# Add rate limiting
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Cache for 5 minutes
@lru_cache(maxsize=100)
def fetch_yf_data(ticker: str, start: str, end: str):
    try:
        logger.info(f"Fetching data for {ticker} from {start} to {end}")
        data = yf.download(ticker, start=start, end=end, progress=False)
        if data.empty:
            raise ValueError(f"No data found for ticker {ticker}")
        logger.info(f"Received data for {ticker}: {len(data)} rows")
        return data
    except Exception as e:
        logger.error(f"Error in fetch_yf_data: {str(e)}")
        raise

# Cache for 1 hour
@lru_cache(maxsize=100)
def fetch_yf_ticker_info(ticker: str):
    try:
        ticker_info = yf.Ticker(ticker)
        # Verify the ticker is valid by accessing a property
        ticker_info.info
        return ticker_info
    except Exception as e:
        logger.error(f"Error fetching ticker info: {str(e)}")
        raise ValueError(f"Invalid ticker symbol: {ticker}")

@app.route('/stock-data', methods=['GET'])
@limiter.limit("30 per minute")
def get_stock_data():
    logger.info("Received request for stock data")
    logger.info(f"Request args: {request.args}")
    
    ticker = request.args.get('ticker')
    if not ticker:
        logger.error("Missing ticker parameter")
        return jsonify({'error': 'Missing ticker parameter'}), 400

    try:
        # Calculate dates: from 1 year ago to yesterday (to avoid future dates)
        end_date = (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
        start_date = (datetime.now() - timedelta(days=365)).strftime('%Y-%m-%d')
        
        logger.info(f"Fetching data for {ticker} from {start_date} to {end_date}")
        data = fetch_yf_data(ticker, start_date, end_date)
        
        if isinstance(data.columns, pd.MultiIndex):
            data.columns = [col[0] for col in data.columns]

        result = []
        for index, row in data.iterrows():
            result.append({
                'date': index.strftime('%Y-%m-%d'),
                'open': float(row['Open']),
                'high': float(row['High']),
                'low': float(row['Low']),
                'close': float(row['Close']),
                'volume': int(row['Volume'])
            })
        
        logger.info(f"Returning {len(result)} data points")
        return jsonify(result)
    except ValueError as ve:
        logger.error(f"Value error: {str(ve)}")
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        logger.error(f"Error fetching data for {ticker}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/stock-events', methods=['GET'])
def get_stock_events():
    ticker = request.args.get('ticker')
    start = request.args.get('start')
    end = request.args.get('end')

    if not all([ticker, start, end]):
        return jsonify({'error': 'Missing required parameters'}), 400

    try:
        stock = fetch_yf_ticker_info(ticker)
        events = []
        
        start_date = pd.to_datetime(start).normalize()
        end_date = pd.to_datetime(end).normalize()

        # Get dividends
        dividends = stock.dividends
        if not dividends.empty:
            dividend_dates = dividends.index.tz_localize(None)
            mask = (dividend_dates >= start_date) & (dividend_dates <= end_date)
            filtered_dividends = dividends[mask]
            
            for date, value in filtered_dividends.items():
                naive_date = date.tz_localize(None)
                events.append({
                    'date': naive_date.strftime('%Y-%m-%d'),
                    'type': 'dividend',
                    'event': f'Dividend: ${value:.2f}',
                    'description': f'${value:.2f} dividend payment',
                })

        # Get stock splits
        splits = stock.splits
        if not splits.empty:
            split_dates = splits.index.tz_localize(None)
            mask = (split_dates >= start_date) & (split_dates <= end_date)
            filtered_splits = splits[mask]
            
            for date, value in filtered_splits.items():
                naive_date = date.tz_localize(None)
                numerator = int(value) if value >= 1 else 1
                denominator = 1 if value >= 1 else int(1/value)
                events.append({
                    'date': naive_date.strftime('%Y-%m-%d'),
                    'type': 'split',
                    'event': f'{numerator}:{denominator} Stock Split',
                    'description': f'{numerator}:{denominator} stock split',
                })

        return jsonify(events)
    except Exception as e:
        logger.error(f"Error fetching events for {ticker}: {str(e)}")
        return jsonify({'error': 'Failed to fetch stock events'}), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    # Get port from environment variable (Render sets this automatically)
    port = int(os.environ.get('PORT', 10000))
    # Bind to 0.0.0.0 for Render
    app.run(host='0.0.0.0', port=port)