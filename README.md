# 🌾 Kisanmitra

> **AI-powered crop recommendation and farm decision intelligence platform.**

Kisanmitra is a full-stack AI/ML project designed to help farmers make more informed crop decisions using soil and environmental parameters. The current implementation combines a **React + Vite frontend**, a **FastAPI backend**, and a **Python/scikit-learn machine-learning pipeline**.

---

## 📌 About the Project

Choosing a suitable crop depends on several agricultural and environmental conditions. Kisanmitra provides a simple interface where farm-related parameters can be entered and sent to an ML-powered backend for crop recommendation.

### Current workflow

```text
Farm Parameters
      ↓
React Frontend
      ↓
FastAPI Backend
      ↓
Trained Random Forest Model
      ↓
Crop Prediction
      ↓
Recommendation shown to user
```

The current prototype uses the following input parameters:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- Soil pH
- Rainfall

> **Note:** This repository is a prototype. The current model should not be treated as a guaranteed agricultural decision or yield/profit predictor. Real-world deployment would require validated regional data, agronomic validation, uncertainty handling, field testing, and appropriate expert/government review.

---

## ✨ Features

### 🌱 Crop Recommendation
Predicts a suitable crop from soil and environmental inputs using a trained machine-learning classifier.

### 🧪 Soil & Environmental Inputs
The recommendation form accepts:

- Nitrogen
- Phosphorus
- Potassium
- Temperature
- Humidity
- Soil pH
- Rainfall

### 🤖 Machine Learning Integration
The backend loads a trained `scikit-learn` model saved with `joblib` and exposes the prediction through an API.

### ⚡ FastAPI Backend
Provides a lightweight REST API for:

- Health checking
- Crop recommendation

### ⚛️ React Frontend
A Vite-powered React interface provides:

- Landing/hero section
- Crop recommendation form
- Feature overview
- Recommendation result display

### 🔌 Frontend–Backend Integration
The Vite development server proxies `/api` requests to the local FastAPI server.

### 📱 Responsive UI
The frontend includes responsive layouts for smaller screens.

---

## 🧠 Machine Learning Model

The current ML pipeline uses a **Random Forest Classifier** from `scikit-learn`.

### Dataset

The training script loads:

```text
ml/data/Crop_recommendation.csv
```

The target column is:

```text
label
```

The remaining columns are used as model features.

### Training Pipeline

```text
Crop_recommendation.csv
        ↓
Pandas DataFrame
        ↓
Features (X) + Target (y)
        ↓
Train/Test Split
        ↓
Random Forest Classifier
        ↓
Prediction
        ↓
Accuracy + Classification Report
        ↓
joblib model
        ↓
ml/model/crop_model.pkl
```

### Current Model Configuration

```python
RandomForestClassifier(
    n_estimators=200,
    random_state=42
)
```

The current training script uses an 80/20 train-test split with stratification.

### Model Output

The backend loads:

```text
ml/model/crop_model.pkl
```

and exposes the prediction through:

```text
POST /recommend
```

### Example Request

```json
{
  "nitrogen": 90,
  "phosphorus": 42,
  "potassium": 43,
  "temperature": 20.8,
  "humidity": 82.0,
  "ph": 6.5,
  "rainfall": 202.9
}
```

### Example Response

```json
{
  "message": "Recommended crop: rice 🌾",
  "crop": "rice"
}
```

> Model performance should always be evaluated on the actual dataset and experimental setup being used. Do not assume a high benchmark accuracy automatically means real-world agricultural accuracy.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn
- CORS Middleware

### Machine Learning

- Python
- Pandas
- NumPy
- scikit-learn
- Random Forest
- Joblib

### Development

- Git
- GitHub
- VS Code
- npm

---

## 📂 Project Structure

```text
Kisanmitra/
│
├── backend/
│   └── main.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   └── Recommendation.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
│
├── ml/
│   ├── data/
│   │   └── Crop_recommendation.csv
│   ├── model/
│   │   └── crop_model.pkl
│   └── train.py
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Prerequisites

Make sure the following are installed:

- Git
- Python 3.x
- Node.js + npm
- VS Code

### 1. Clone the Repository

```bash
git clone https://github.com/Anshulupadhyay61/Kisanmitra.git
```

### 2. Enter the Project

```bash
cd Kisanmitra
```

### 3. Create the Working Branch

For documentation work, use a separate branch:

```bash
git checkout -b readme-improvement
```

This keeps the `main` branch untouched while the README is being improved.

---

## 🚀 How to Run

Kisanmitra has three parts:

1. Backend
2. Frontend
3. ML training

Run them in separate VS Code terminals.

---

### Backend

Open Terminal 1:

```bash
cd Kisanmitra/backend
```

Create and activate a virtual environment.

#### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

#### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required packages:

```bash
pip install fastapi uvicorn pydantic joblib scikit-learn
```

Start the API:

```bash
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

Health check:

```text
GET /
GET /health
```

Interactive FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

---

### Frontend

Open Terminal 2:

```bash
cd Kisanmitra/frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, normally similar to:

```text
http://localhost:5173
```

The frontend uses the `/api` path for recommendation requests. The Vite configuration proxies these requests to:

```text
http://127.0.0.1:8000
```

---

### ML

Open Terminal 3:

```bash
cd Kisanmitra/ml
```

Install the ML dependencies if they are not already installed:

```bash
pip install pandas scikit-learn joblib
```

Train the model:

```bash
python train.py
```

The training script:

1. Loads `data/Crop_recommendation.csv`
2. Separates features and the `label` target
3. Splits the dataset into training/testing sets
4. Trains a Random Forest classifier
5. Prints accuracy and a classification report
6. Saves the trained model to:

```text
model/crop_model.pkl
```

After training, restart the backend if necessary so that it loads the updated model file.

---

## 📸 Screenshots

Add project screenshots here after capturing the actual running application.

### 🏠 Home / Landing Page

```text
screenshots/home.png
```

![Kisanmitra Home](screenshots/home.png)

### 🌱 Crop Recommendation Form

```text
screenshots/recommendation.png
```

![Crop Recommendation](screenshots/recommendation.png)

### 🤖 Recommendation Result

```text
screenshots/result.png
```

![Recommendation Result](screenshots/result.png)

> **Before merging this README, add the actual screenshot files under `screenshots/` so the images render correctly on GitHub.**

Recommended structure:

```text
Kisanmitra/
└── screenshots/
    ├── home.png
    ├── recommendation.png
    └── result.png
```

---

## 🔮 Future Improvements

The current implementation is a foundation. Possible improvements include:

### Machine Learning

- Cross-validation and stronger model evaluation
- Hyperparameter tuning
- Model comparison using multiple algorithms
- Feature importance and explainability
- Probability calibration and uncertainty estimation
- Better regional/generalization testing

### Agricultural Intelligence

- Location-aware recommendations
- Weather API integration
- Forecast-aware recommendations
- Soil Health Card data integration
- Season-aware crop recommendations
- Top-N crop ranking instead of a single prediction
- Agronomic rule/knowledge layer
- Regional crop suitability

### Platform

- Farmer authentication
- Farm profile management
- Recommendation history
- Database integration
- Multilingual interface
- Mobile-first improvements
- Offline/low-connectivity support
- Recommendation reports

### Production Readiness

- Proper dependency files
- Environment-variable configuration
- Automated testing
- CI/CD
- Monitoring and logging
- Model versioning
- Secure API deployment
- Domain-expert validation
- Field testing with reliable agricultural data

---

## 👥 Contributors

- **Anshul Upadhyay** — Project Lead / Repository Owner
- **Contributors** — See the repository contributor history for current contributors.

Contributions, improvements, testing, and documentation feedback are welcome through GitHub pull requests.

---

## 🔀 Documentation Contribution Workflow

This README improvement is intended to be developed through a feature branch rather than directly on `main`.

```bash
git checkout -b readme-improvement
```

After completing the README:

```bash
git add README.md
git commit -m "Improve project documentation"
git push -u origin readme-improvement
```

Then open the GitHub repository and create a **Pull Request** from:

```text
readme-improvement → main
```

The repository owner can review the changes and merge the pull request.

---

## ⚠️ Disclaimer

Kisanmitra is a software/ML prototype. Crop recommendations generated by the current model should not be treated as guaranteed agricultural advice, yield predictions, or profit guarantees. Real-world agricultural deployment requires reliable regional data, agronomic validation, appropriate testing, uncertainty handling, and expert oversight.
