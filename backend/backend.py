from flask import Flask, request, jsonify
import requests
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

# FMP API Key from environment variable
FMP_API_KEY = os.environ.get('FMP_API_KEY')
if not FMP_API_KEY:
    raise ValueError("FMP_API_KEY environment variable is not set")

# Cache for 5 minutes
@lru_cache(maxsize=100)
def fetch_fmp_data(ticker: str, start: str, end: str):
    try:
        logger.info(f"Fetching data for {ticker} from {start} to {end}")
        url = f"https://financialmodelingprep.com/api/v3/historical-price-full/{ticker}?apikey={FMP_API_KEY}&from={start}&to={end}"
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        data = response.json()
        if 'historical' not in data:
            raise ValueError(f"No data found for ticker {ticker}")
            
        # Convert to pandas DataFrame and sort by date
        df = pd.DataFrame(data['historical'])
        df['date'] = pd.to_datetime(df['date'])
        df = df.sort_values('date')
        df.set_index('date', inplace=True)
        
        logger.info(f"Received data for {ticker}: {len(df)} rows")
        return df
    except Exception as e:
        logger.error(f"Error in fetch_fmp_data: {str(e)}")
        raise

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
        data = fetch_fmp_data(ticker, start_date, end_date)

        result = []
        for index, row in data.iterrows():
            try:
                result.append({
                    'date': index.strftime('%Y-%m-%d'),
                    'open': float(row['open']),
                    'high': float(row['high']),
                    'low': float(row['low']),
                    'close': float(row['close']),
                    'volume': int(row['volume'])
                })
            except Exception as e:
                logger.error(f"Error processing row: {e}")
                continue
        
        if not result:
            return jsonify({'error': 'No valid data found'}), 404
            
        logger.info(f"Returning {len(result)} data points")
        return jsonify(result)
    except ValueError as ve:
        logger.error(f"Value error: {str(ve)}")
        return jsonify({'error': str(ve)}), 400
    except Exception as e:
        logger.error(f"Error fetching data for {ticker}: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'}), 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port)