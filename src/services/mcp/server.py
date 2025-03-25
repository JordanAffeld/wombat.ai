from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
from pydantic import BaseModel
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="TensorFlow MCP Server")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model (we'll use a simple model for demonstration)
model = None

class PredictionRequest(BaseModel):
    inputs: list
    language: str

class PredictionResponse(BaseModel):
    prediction: list
    confidence: float

@app.on_event("startup")
async def startup_event():
    global model
    try:
        # Initialize your model here
        # For demonstration, we'll create a simple model
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu'),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(2, activation='softmax')
        ])
        model.build(input_shape=(None, 100))  # Adjust input shape as needed
        print("Model initialized successfully")
    except Exception as e:
        print(f"Error loading model: {e}")
        raise

@app.get("/")
async def root():
    return {"status": "running", "service": "TensorFlow MCP Server"}

@app.post("/predict")
async def predict(request: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not initialized")
    
    try:
        # Convert inputs to numpy array
        inputs = np.array(request.inputs)
        
        # Make prediction
        prediction = model.predict(inputs)
        
        # Get confidence score
        confidence = float(np.max(prediction))
        
        return PredictionResponse(
            prediction=prediction.tolist(),
            confidence=confidence
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": model is not None
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080) 