from flask import Flask, request, jsonify
import joblib
import pandas as pd
import random
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder

app = Flask(__name__)
CORS(app)

# Load the pre-trained model
model = joblib.load('knn_model_with_tuning.pkl')

# Creating POST api to accept test file as a body
@app.route('/fatal-prediction', methods=['POST'])
def predict():

    test_data = read_request_convert_dataframe()
    result_data = pd.DataFrame({'OBJECTID': random.randrange(1, 101)}, index=range(len(test_data)))

    # Making sure that there is not 
    if not test_data.empty and not result_data.empty:

       # Call the preprocess_data function
        preprocessed_df, encoders = preprocess_data(test_data)
        # print(preprocess_data.shape)
        # doing prediction using model based on test_data
        predictions = predictModel(preprocessed_df)

        predicted_data = targetColumnConversion(predictions, result_data)

        # Return the json formatted dataframe of predicted_data
        return jsonify(predicted_data.to_dict(orient='list'))

def predictModel(preprocessed_data) :
    try:
        return model.predict(preprocessed_data)
    except ValueError as v:
        raise Exception("Error running the model for the attached test data!")

def targetColumnConversion(predictions, result_data):
    # Storng model predcitions to our targer column ACCLASS
    result_data['ACCLASS'] = predictions

    # Our prediction give result in 1 and 0 
    # 1 = Non-Fatal Injury and 0 = Fatal
    # Converting numerical to categorical
    result_data['ACCLASS'] = result_data['ACCLASS'].apply(lambda x: 'Non-Fatal Injury' if x == 1 else 'Fatal')
    return result_data

# Common excpetion handler
@app.errorhandler(Exception)
def handle_exception(e):
    return jsonify(error= str(e)), 500

def read_request_convert_dataframe():
    # Read the form data
    form_data = {
        'TIME': request.form.get('TIME', ''),
        'STREET1': request.form.get('STREET1', ''),
        'STREET2': request.form.get('STREET2', ''),
        'ROAD_CLASS': request.form.get('ROAD_CLASS', ''),
        'DISTRICT': request.form.get('DISTRICT', ''),
        'LATITUDE': request.form.get('LATITUDE', ''),
        'LONGITUDE': request.form.get('LONGITUDE', ''),
        'ACCLOC': request.form.get('ACCLOC', ''),
        'TRAFFCTL': request.form.get('TRAFFCTL', ''),
        'VISIBILITY': request.form.get('VISIBILITY', ''),
        'LIGHT': request.form.get('LIGHT', ''),
        'RDSFCOND': request.form.get('RDSFCOND', ''),
        'IMPACTYPE': request.form.get('IMPACTYPE', ''),
        'INVTYPE': request.form.get('INVTYPE', ''),
        'INVAGE': request.form.get('INVAGE', ''),
        'INJURY': request.form.get('INJURY', ''),
        'VEHTYPE': request.form.get('VEHTYPE', ''),
        'PEDTYPE': request.form.get('PEDTYPE', ''),
        'PEDACT': request.form.get('PEDACT', ''),
        'PEDCOND': request.form.get('PEDCOND', ''),
        'CYCLISTYPE': request.form.get('CYCLISTYPE', ''),
        'CYCACT': request.form.get('CYCACT', ''),
        'CYCCOND': request.form.get('CYCCOND', ''),
        'PEDESTRIAN': request.form.get('PEDESTRIAN', ''),
        'CYCLIST': request.form.get('CYCLIST', ''),
        'AUTOMOBILE': request.form.get('AUTOMOBILE', ''),
        'MOTORCYCLE': request.form.get('MOTORCYCLE', ''),
        'TRUCK': request.form.get('TRUCK', ''),
        'TRSN_CITY_VEH': request.form.get('TRSN_CITY_VEH', ''),
        'EMERG_VEH': request.form.get('EMERG_VEH', ''),
        'PASSENGER': request.form.get('PASSENGER', ''),
        'SPEEDING': request.form.get('SPEEDING', ''),
        'AG_DRIV': request.form.get('AG_DRIV', ''),
        'REDLIGHT': request.form.get('REDLIGHT', ''),
        'ALCOHOL': request.form.get('ALCOHOL', ''),
        'DISABILITY': request.form.get('DISABILITY', ''),
        'HOOD_158': request.form.get('HOOD_158', ''),
        'NEIGHBOURHOOD_158': request.form.get('NEIGHBOURHOOD_158', ''),
        'HOOD_140': request.form.get('HOOD_140', ''),
        'NEIGHBOURHOOD_140': request.form.get('NEIGHBOURHOOD_140', ''),
        'DIVISION': request.form.get('DIVISION', '')
    }

    # Convert the form data to a DataFrame
    return pd.DataFrame([form_data])

def preprocess_data(df):
    """
    Preprocess the DataFrame by applying Label Encoding to all categorical columns.

    Parameters:
    df (pd.DataFrame): The input DataFrame to preprocess.
    target_col (str): The name of the target column (not used in this version).

    Returns:
    pd.DataFrame: A DataFrame with all categorical columns label encoded, retaining original column names.
    """
    df['TIME'] = pd.to_numeric(df['TIME'])
    df['LONGITUDE'] = pd.to_numeric(df['LONGITUDE'])
    df['LATITUDE'] = pd.to_numeric(df['LATITUDE'])
    df['INVAGE'] = pd.to_numeric(df['INVAGE'])

    # Identify categorical columns
    categorical_columns = df.select_dtypes(include=['object']).columns.tolist()

    # Apply Label Encoding to all categorical columns
    label_encoders = {}
    for column in categorical_columns:
        le = LabelEncoder()
        df[column] = le.fit_transform(df[column].astype(str))
        label_encoders[column] = le

    return df, label_encoders


if __name__ == '__main__':
    app.run(debug=True)

