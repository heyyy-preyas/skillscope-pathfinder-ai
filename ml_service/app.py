from flask import Flask, request, jsonify
from flask_cors import CORS
from model import CareerPredictor
import os

app = Flask(__name__)
CORS(app) # Enable CORS for all routes (or restrict to Node backend)

# Initialize Model
predictor = CareerPredictor()

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({"status": "AI Service Running", "model_loaded": True})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        answers = data.get('answers')
        
        if not answers:
            return jsonify({"error": "No answers provided"}), 400

        # Run prediction
        result = predictor.predict(answers)
        
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
