import utils
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/get_location_names',methods = ['GET'])
def get_location_names():
    response = jsonify(dict(locations=utils.get_location_names()))
    print("The response is: ", utils.get_location_names())
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict_home_price', methods=['GET','POST'])
def predict_home_price():
    total_sqft = float(request.form['total_sqft'])
    location = request.form['location']
    bhk = int(request.form['bhk'])
    bath = int(request.form['bath'])
    response = jsonify({'estimated_price': utils.get_estimated_price(location, total_sqft, bhk, bath)})
    response.headers.add('Access-Control-Allow-Origin', '*')
    #response.headers.add('Access-Control-Allow-Credentials', 'true')
    return response


if __name__ == "__main__":
    utils.load_saved_artifacts()
    print("Starting python Flask Server For Home Price Prediction")
    app.run()
