from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from estimator import calculate_construction_cost
import os

# Configure Flask app with static folder for React build files
app = Flask(__name__, static_folder='../react-frontend/build')

# Update CORS configuration to allow requests from Netlify
CORS(app, resources={r"/*": {"origins": ["https://jade-sawine-d8c064.netlify.app"]}})

@app.route('/api/estimate', methods=['POST'])
def estimate_cost():
    try:
        data = request.get_json()

        # Extract input parameters
        area = float(data.get('area', 0))
        storeys = int(data.get('storeys', 1))
        bhk_size = int(data.get('bhkSize', 1))

        # Validate inputs
        if area <= 0:
            return jsonify({'error': 'Area must be greater than 0'}), 400
        if storeys <= 0:
            return jsonify({'error': 'Number of storeys must be at least 1'}), 400
        if bhk_size <= 0:
            return jsonify({'error': 'BHK size must be at least 1'}), 400

        # Calculate cost
        total_cost = calculate_construction_cost(area, storeys, bhk_size)

        return jsonify({
            'totalCost': total_cost,
            'area': area,
            'storeys': storeys,
            'bhkSize': bhk_size
        })
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500

# Serve React App locally (optional)
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    # Run Flask server on all network interfaces (local IP)
    app.run(debug=True, host='0.0.0.0', port=5000)
