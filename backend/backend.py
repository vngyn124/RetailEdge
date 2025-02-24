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
    logger.info(f"Fetching FMP data for {ticker} from {start} to {end}")
    api_key = os.getenv('FMP_API_KEY')
    url = f"https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?from={start}&to={end}&apikey={api_key}"
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        if 'historical' not in data:
            logger.warning(f"No historical data found for {ticker}")
            return pd.DataFrame()
            
        # Convert to pandas DataFrame and sort by date
        df = pd.DataFrame(data['historical'])
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values('date')
        
        logger.info(f"Received {len(df)} data points for {ticker}")
        return df
    except Exception as e:
        logger.error(f"Error fetching FMP data: {str(e)}")
        raise

@lru_cache(maxsize=100)
def fetch_stock_events(ticker: str, start: str, end: str):
    try:
        logger.info(f"Fetching events for {ticker} from {start} to {end}")
        events = []
        api_key = os.getenv('FMP_API_KEY')
        
        # Fetch dividends
        dividend_url = f"https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/{ticker}?apikey={api_key}"
        dividend_response = requests.get(dividend_url)
        dividend_response.raise_for_status()
        dividend_data = dividend_response.json()
        
        if 'historical' in dividend_data:
            for div in dividend_data['historical']:
                div_date = div['date']
                if start <= div_date <= end:
                    events.append({
                        'date': div_date,
                        'type': 'dividend',
                        'event': f"Dividend: ${float(div['dividend']):.2f}",
                        'description': f"${float(div['dividend']):.2f} dividend payment"
                    })
        
        # Fetch stock splits
        split_url = f"https://financialmodelingprep.com/api/v3/historical-price-full/stock_split/{ticker}?apikey={api_key}"
        split_response = requests.get(split_url)
        split_response.raise_for_status()
        split_data = split_response.json()
        
        if 'historical' in split_data:
            for split in split_data['historical']:
                split_date = split['date']
                if start <= split_date <= end:
                    numerator = int(float(split['numerator']))
                    denominator = int(float(split['denominator']))
                    events.append({
                        'date': split_date,
                        'type': 'split',
                        'event': f"{numerator}:{denominator} Stock Split",
                        'description': f"{numerator}:{denominator} stock split"
                    })
        
        return events
    except Exception as e:
        logger.error(f"Error fetching events for {ticker}: {str(e)}")
        raise

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
        data = fetch_fmp_data(ticker, start, end)
        if data.empty:
            logger.warning(f"No data found for {ticker}")
            return jsonify([])
        
        result = []
        for _, row in data.iterrows():
            result.append({
                'date': row['date'].strftime('%Y-%m-%d'),
                'open': float(row['open']),
                'high': float(row['high']),
                'low': float(row['low']),
                'close': float(row['close']),
                'volume': int(row['volume'])
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
        events = fetch_stock_events(ticker, start, end)
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