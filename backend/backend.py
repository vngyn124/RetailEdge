from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import pandas as pd
from functools import lru_cache
from datetime import datetime, timedelta
import logging
import os

app = Flask(__name__)
CORS(app, resources={
    r"/*": {
        "origins": "*",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Cache for 5 minutes
@lru_cache(maxsize=100)
def fetch_fmp_data(ticker: str, start: str, end: str):
    logger.info(f"Fetching FMP data for {ticker}")
    api_key = os.getenv('FMP_API_KEY')
    url = f"https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?from={start}&to={end}&apikey={api_key}"
    response = requests.get(url)
    return pd.DataFrame(response.json()['historical'])

# Cache for 1 hour
@lru_cache(maxsize=100)
def fetch_yf_ticker_info(ticker: str):
    return yf.Ticker(ticker)

@app.route('/stock-data', methods=['GET'])
def get_stock_data():
    logger.info("Received request for stock data")
    logger.info(f"Request args: {request.args}")
    
    ticker = request.args.get('ticker')
    start = request.args.get('start')
    end = request.args.get('end')

    if not all([ticker, start, end]):
        logger.error("Missing required parameters")
        return jsonify({'error': 'Missing required parameters'}), 400

    try:
        logger.info(f"Fetching data for {ticker}")
        data = fetch_yf_data(ticker, start, end)
        if data.empty:
            logger.warning(f"No data found for {ticker}")
            return jsonify([])

        data.reset_index(inplace=True)
        
        if isinstance(data.columns, pd.MultiIndex):
            data.columns = [col[0] for col in data.columns]

        result = []
        for _, row in data[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']].iterrows():
            result.append({
                'date': row['Date'].strftime('%Y-%m-%d'),
                'open': float(row['Open']),
                'high': float(row['High']),
                'low': float(row['Low']),
                'close': float(row['Close']),
                'volume': int(row['Volume'])
            })
        
        logger.info(f"Returning {len(result)} data points")
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error fetching data for {ticker}: {str(e)}")
        return jsonify({'error': 'Failed to fetch stock data'}), 500

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