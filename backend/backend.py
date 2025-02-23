from flask import Flask, request, jsonify
import yfinance as yf
from flask_cors import CORS
import pandas as pd
from functools import lru_cache
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

# Cache for 5 minutes
@lru_cache(maxsize=100)
def fetch_yf_data(ticker: str, start: str, end: str):
    data = yf.download(ticker, start=start, end=end, progress=False)
    return data

# Cache for 1 hour
@lru_cache(maxsize=100)
def fetch_yf_ticker_info(ticker: str):
    return yf.Ticker(ticker)

@app.route('/stock-data', methods=['GET'])
def get_stock_data():
    ticker = request.args.get('ticker')
    start = request.args.get('start')
    end = request.args.get('end')

    try:
        # Use cached data
        data = fetch_yf_data(ticker, start, end)
        if data.empty:
            return jsonify([])

        data = data[(data.index >= pd.to_datetime(start)) & (data.index <= pd.to_datetime(end))]
        data.reset_index(inplace=True)
        
        if isinstance(data.columns, pd.MultiIndex):
            data.columns = [col[0] for col in data.columns]

        # Only get required columns
        result = []
        for _, row in data[['Date', 'Open', 'High', 'Low', 'Close', 'Volume']].iterrows():
            result.append({
                'date': row['Date'].strftime('%Y-%m-%d'),
                'open': row['Open'],
                'high': row['High'],
                'low': row['Low'],
                'close': row['Close'],
                'volume': row['Volume']
            })
        
        return jsonify(result)
    except Exception as e:
        print(f"Error fetching data for {ticker}: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/stock-events', methods=['GET'])
def get_stock_events():
    ticker = request.args.get('ticker')
    start = request.args.get('start')
    end = request.args.get('end')

    print(f"Fetching events for {ticker} from {start} to {end}")

    try:
        # Use cached ticker info
        stock = fetch_yf_ticker_info(ticker)
        events = []
        
        # Convert dates to naive datetime for comparison
        start_date = pd.to_datetime(start).normalize()
        end_date = pd.to_datetime(end).normalize()

        # Get dividends
        dividends = stock.dividends
        print(f"Raw dividends data: {dividends}")
        if not dividends.empty:
            # Convert dividend dates to naive datetime
            dividend_dates = dividends.index.tz_localize(None)
            mask = (dividend_dates >= start_date) & (dividend_dates <= end_date)
            filtered_dividends = dividends[mask]
            print(f"Filtered dividends: {filtered_dividends}")
            
            for date, value in filtered_dividends.items():
                # Convert to naive datetime for consistent formatting
                naive_date = date.tz_localize(None)
                events.append({
                    'date': naive_date.strftime('%Y-%m-%d'),
                    'type': 'dividend',
                    'event': f'Dividend: ${value:.2f}',
                    'description': f'${value:.2f} dividend payment',
                })

        # Get stock splits
        splits = stock.splits
        print(f"Raw splits data: {splits}")
        if not splits.empty:
            # Convert split dates to naive datetime
            split_dates = splits.index.tz_localize(None)
            mask = (split_dates >= start_date) & (split_dates <= end_date)
            filtered_splits = splits[mask]
            print(f"Filtered splits: {filtered_splits}")
            
            for date, value in filtered_splits.items():
                # Convert to naive datetime for consistent formatting
                naive_date = date.tz_localize(None)
                numerator = int(value) if value >= 1 else 1
                denominator = 1 if value >= 1 else int(1/value)
                events.append({
                    'date': naive_date.strftime('%Y-%m-%d'),
                    'type': 'split',
                    'event': f'{numerator}:{denominator} Stock Split',
                    'description': f'{numerator}:{denominator} stock split',
                })

        print(f"Final events: {events}")
        return jsonify(events)
    except Exception as e:
        print(f"Error fetching events for {ticker}: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)