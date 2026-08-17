from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import os


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

    prediction = model.predict(features)[0]

    return {
        "message": f"Recommended crop: {prediction} 🌾",
        "crop": prediction
    }