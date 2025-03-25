from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
import os


app = Flask(__name__)
CORS(app)

# Load the trained model
model = tf.keras.models.load_model("C:/Users/user/Desktop/Web-prescription/backendnew/prescription_cnn_model.h5")

# Define image parameters
img_height, img_width = 224, 224
classes = ["Invalid Prescription", "Valid Prescription"]  # Adjust based on your dataset

# Function to preprocess image
def preprocess_image(image_path):
    image = load_img(image_path, target_size=(img_height, img_width))
    image = img_to_array(image) / 255.0  # Normalize pixel values
    image = np.expand_dims(image, axis=0)  # Add batch dimension
    return image

@app.route("/", methods=["GET"])
def home():
    return "Prescription Classification API is Running!"

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Save the uploaded file
    file_path = "temp_image.jpg"
    file.save(file_path)

    # Preprocess and predict
    image = preprocess_image(file_path)
    prediction = model.predict(image)
    predicted_class = classes[int(prediction[0] > 0.5)]  # 0: Invalid, 1: Valid

    # Cleanup the saved file
    os.remove(file_path)

    return jsonify({"prediction": predicted_class, "confidence": float(prediction[0][0])})

if __name__ == "__main__":
    app.run(debug=True)
