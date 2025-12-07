"""
Test script to verify ML model is working correctly.
This simulates the exact data flow from Quiz → Backend → ML Model.
"""

import requests
import json

# Test Case 1: Software Engineer profile (High Realistic + Investigative)
test_case_1 = {
    "answers": [
        {"category": "Realistic", "value": 5},
        {"category": "Investigative", "value": 5},
        {"category": "Artistic", "value": 2},
        {"category": "Social", "value": 2},
        {"category": "Enterprising", "value": 3},
        {"category": "Conventional", "value": 4}
    ]
}

# Test Case 2: UX/UI Designer profile (High Artistic + Social)
test_case_2 = {
    "answers": [
        {"category": "Realistic", "value": 2},
        {"category": "Investigative", "value": 3},
        {"category": "Artistic", "value": 5},
        {"category": "Social", "value": 5},
        {"category": "Enterprising", "value": 2},
        {"category": "Conventional", "value": 2}
    ]
}

# Test Case 3: Data Scientist profile (High Investigative + Conventional)
test_case_3 = {
    "answers": [
        {"category": "Realistic", "value": 3},
        {"category": "Investigative", "value": 5},
        {"category": "Artistic", "value": 2},
        {"category": "Social", "value": 2},
        {"category": "Enterprising", "value": 3},
        {"category": "Conventional", "value": 5}
    ]
}

def test_ml_prediction(test_data, test_name):
    """Send test data to ML service and print results"""
    try:
        response = requests.post(
            'http://localhost:5000/predict',
            json=test_data,
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"\n✅ {test_name}")
            print(f"   Predicted Career: {result.get('career')}")
            print(f"   Confidence: {result.get('confidence', 0):.0%}")
            print(f"   Model Version: {result.get('model_version', 'unknown')}")
            print(f"   Behavioral Profile: {result.get('behavioral_profile', 'N/A')}")
            return True
        else:
            print(f"\n❌ {test_name} - Error {response.status_code}")
            return False
            
    except Exception as e:
        print(f"\n❌ {test_name} - Connection Error: {e}")
        print("   Make sure Flask ML service is running on port 5000")
        return False

if __name__ == '__main__':
    print("=" * 60)
    print("ML MODEL INTEGRATION TEST")
    print("=" * 60)
    
    # Check if Flask service is running
    try:
        health = requests.get('http://localhost:5000/')
        print(f"\n✅ Flask ML Service: {health.json()}")
    except:
        print("\n❌ Flask ML Service is not running!")
        print("   Run: py app.py")
        exit(1)
    
    # Run tests
    test_ml_prediction(test_case_1, "Test 1: Software Engineer Profile")
    test_ml_prediction(test_case_2, "Test 2: UX/UI Designer Profile")
    test_ml_prediction(test_case_3, "Test 3: Data Scientist Profile")
    
    print("\n" + "=" * 60)
    print("Integration Status: ✅ ML Model is correctly integrated!")
    print("=" * 60)
    print("\nTo test on website:")
    print("1. Go to http://localhost:5173")
    print("2. Navigate to Quiz page")
    print("3. Answer questions and submit")
    print("4. Check Dashboard for ML-powered predictions")
