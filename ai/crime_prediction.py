import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score


class CrimePredictionModel:

    def __init__(self, dataset_path):
        self.dataset_path = dataset_path
        self.df = None
        self.encoder = LabelEncoder()
        self.model = DecisionTreeClassifier(random_state=42)

    def load_dataset(self):
        self.df = pd.read_csv(self.dataset_path)

        print("Crime dataset loaded successfully.")
        print(f"Total Records: {len(self.df)}")

    def crime_type_statistics(self):

        print("\nCrime Count by Type:\n")
        print(self.df["Crime_Type"].value_counts())

    def prepare_data(self):

        self.df["City"] = self.encoder.fit_transform(self.df["City"])
        self.df["Crime_Type"] = self.encoder.fit_transform(self.df["Crime_Type"])

        X = self.df[["City", "Victim_Age", "Suspect_Age"]]
        y = self.df["Crime_Type"]

        return train_test_split(
            X,
            y,
            test_size=0.2,
            random_state=42
        )

    def train_model(self):

        X_train, X_test, y_train, y_test = self.prepare_data()

        self.model.fit(X_train, y_train)

        predictions = self.model.predict(X_test)

        accuracy = accuracy_score(y_test, predictions)

        print("\nModel trained successfully.")
        print(f"Prediction Accuracy: {accuracy*100:.2f}%")



if __name__ == "__main__":

    predictor = CrimePredictionModel("datasets/crime_dataset.csv")

    predictor.load_dataset()

    predictor.crime_type_statistics()

    predictor.train_model()