from flask import Flask, render_template, request, redirect, url_for, jsonify
from keras.models import load_model
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
import numpy as np
import cv2
import pandas as pd

app = Flask(__name__)

model = load_model('82.82.h5')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    global results_df
    if 'file' not in request.files:
        return "No file part"

    file = request.files['file']

    if file.filename == '':
        return "No selected file"

    image = file.read()
    image = np.frombuffer(image, dtype=np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (224, 224))
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)
    prediction = model.predict(image)
    predicted_class_index = np.argmax(prediction)

    class_names = ["Cataract", "Diabetic Retinopathy", "Glaucoma", "Normal"]
    predicted_class = class_names[predicted_class_index]

    name = request.form.get('name')
    age = request.form.get('age')
    sex = request.form.get('sex')

    result = {"Name": name, "Age": age, "Sex": sex,
              "Predicted Category": predicted_class}
    results_df = pd.DataFrame(result, index=[0])
    
    # Return a JSON response
    return jsonify({})

@app.route('/show_loader')
def show_loader():
    # Render the loader.html page
    return render_template('loader.html')

@app.route('/show_results')
def show_results():
    # Render the results.html page
    return render_template('result.html', results=results_df.to_html(index=False))

if __name__ == '__main__':
    app.run(debug=True)
