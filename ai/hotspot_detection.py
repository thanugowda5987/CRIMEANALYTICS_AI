import pandas as pd
from sklearn.cluster import DBSCAN


class CrimeHotspotDetector:

    def __init__(self, dataset_path):
        self.dataset_path = dataset_path
        self.df = None

    def load_dataset(self):
        self.df = pd.read_csv(self.dataset_path)

        print("Crime dataset loaded successfully.")
        print(f"Total Records: {len(self.df)}")

    def detect_hotspots(self):

        coordinates = self.df[["Latitude", "Longitude"]]

        model = DBSCAN(
            eps=0.3,
            min_samples=5
        )

        self.df["Cluster"] = model.fit_predict(coordinates)

        hotspots = (
            self.df[self.df["Cluster"] != -1]
            .groupby("Cluster")
            .agg({
                "Latitude": "mean",
                "Longitude": "mean",
                "Crime_ID": "count"
            })
            .rename(columns={"Crime_ID": "Crime_Count"})
            .sort_values(by="Crime_Count", ascending=False)
        )

        print("\nTop Crime Hotspots\n")
        print(hotspots.head(10))


if __name__ == "__main__":

    detector = CrimeHotspotDetector(
        "datasets/crime_dataset.csv"
    )

    detector.load_dataset()

    detector.detect_hotspots()