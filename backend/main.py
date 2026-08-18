from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os
import pandas as pd


app = FastAPI(
    title="Kisanmitra API",
    description="AI-powered crop recommendation platform",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "ml",
    "model",
    "crop_model.pkl"
)

model = joblib.load(MODEL_PATH)


DATASET_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "ml",
    "data",
    "Crop_recommendation.csv"
)

dataset = pd.read_csv(DATASET_PATH)


class FarmData(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float


@app.get("/")
def home():
    return {
        "message": "Welcome to Kisanmitra 🌾",
        "status": "API is running"
    }


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/recommend")
def recommend(data: FarmData):

    features = [[
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        data.temperature,
        data.humidity,
        data.ph,
        data.rainfall
    ]]

    # Main prediction
    prediction = model.predict(features)[0]

    # Prediction probabilities
    probabilities = model.predict_proba(features)[0]

    # Crop names
    crop_names = model.classes_

    # Sort crops by probability
    ranked_crops = sorted(
        zip(crop_names, probabilities),
        key=lambda x: x[1],
        reverse=True
    )

    # Confidence of recommended crop
    confidence = ranked_crops[0][1] * 100

    # Top alternative crops
    alternatives = [
        {
            "crop": crop,
            "confidence": round(probability * 100, 2)
        }
        for crop, probability in ranked_crops[1:3]
    ]

    # Generate data-driven reasons
    crop_data = dataset[dataset["label"] == prediction]

    input_values = {
        "N": data.nitrogen,
        "P": data.phosphorus,
        "K": data.potassium,
        "temperature": data.temperature,
        "humidity": data.humidity,
        "ph": data.ph,
        "rainfall": data.rainfall
    }

    reasons = []

    display_names = {
        "N": "Nitrogen",
        "P": "Phosphorus",
        "K": "Potassium",
        "temperature": "Temperature",
        "humidity": "Humidity",
        "ph": "pH",
        "rainfall": "Rainfall"
    }

    for feature, value in input_values.items():

        min_value = crop_data[feature].min()
        max_value = crop_data[feature].max()

        if min_value <= value <= max_value:
            reasons.append(
                f"{display_names[feature]} is within the observed range for {prediction}"
            )

    return {
        "message": f"Recommended crop: {prediction} 🌾",
        "crop": prediction,
        "confidence": round(confidence, 2),
        "alternatives": alternatives,
        "reasons": reasons
    }