
# Traffic Collision Analysis and Visualization

This project analyzes real-world traffic collision data from Ontario to uncover patterns and predict fatal outcomes. It uses machine learning models for prediction, handles missing and biased data, and provides interactive visualizations via Power BI and an Angular-based frontend.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Model Training](#model-training)
- [Visualization Dashboard](#visualization-dashboard)
- [License](#license)

---

## Overview

This project helps users understand and predict traffic collision patterns using Ontario’s public dataset. It focuses on predicting fatal collisions and provides visual insights on contributing factors such as weather, time, and location.

---

## Features

- Predicts fatal traffic collisions using classification models
- Handles missing data and mitigates bias during preprocessing
- Angular-based frontend for user interaction
- Power BI dashboard for in-depth visualizations
- Hyperparameter tuning for optimal model performance

---

## Technologies Used

- **Python**: Data analysis, modeling, and preprocessing
- **Jupyter Notebook**: For exploration and model development
- **Scikit-learn**: Machine learning models (e.g., Random Forest, XGBoost, KNN)
- **Angular**: Frontend user interface for prediction
- **Power BI**: For visualization dashboards
- **Pandas, NumPy, Seaborn, Matplotlib**: Data handling and EDA

---

## Project Structure

```
├── traffic-collision.ipynb       # Jupyter notebook for full pipeline
├── angular-frontend/             # Angular app for prediction UI
├── cleaned_traffic_data.csv      # Cleaned dataset used for training
├── models/                       # Saved ML models (pickle or joblib)
└── powerbi/                      # Power BI dashboard files
```

---

## Setup and Installation

### Prerequisites
- Python 3.8+
- Angular CLI
- Power BI Desktop (optional for dashboard)

### Installation Steps

```bash
# Python environment
pip install -r requirements.txt

# Angular setup
cd angular-frontend
npm install
ng serve --port 4200
```

---

## Usage

- Run the notebook `traffic-collision.ipynb` to train and evaluate models
- Launch the Angular frontend to input traffic parameters and receive fatality prediction
- Open Power BI dashboard to explore trends by weather, road type, light conditions, and time

---

## Model Training

- Handled missing values and outliers using imputation and transformation
- Addressed class imbalance through sampling strategies
- Trained multiple classification models:
  - Random Forest
  - XGBoost
  - K-Nearest Neighbors (KNN)
- Performed hyperparameter tuning for best performance
- Evaluated with metrics like accuracy, F1-score, and confusion matrix

---

## Visualization Dashboard

The Power BI report includes:

- Heatmaps by time and day
- Weather and lighting condition breakdowns
- Fatality trends by road surface and collision type

---

## License

This project is licensed under the MIT License.

