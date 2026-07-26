import pandas as pd


class CrimeDataPreprocessor:
    def __init__(self, dataset_path):
        self.dataset_path = dataset_path
        self.df = None

    def load_data(self):
        """Load dataset"""
        self.df = pd.read_csv(self.dataset_path)
        print("Dataset loaded successfully.")
        print(f"Total Records: {len(self.df)}")

    def check_missing_values(self):
        """Check missing values"""
        print("\nMissing Values:")
        print(self.df.isnull().sum())

    def convert_date(self):
        """Convert Date column into datetime format"""
        self.df["Date"] = pd.to_datetime(self.df["Date"])
        print("\nDate column converted.")

    def basic_information(self):
        """Display dataset information"""
        print("\nDataset Information:")
        print(self.df.info())

    def preview(self):
        """Show first five rows"""
        print("\nFirst Five Records:")
        print(self.df.head())


if __name__ == "__main__":

    preprocessor = CrimeDataPreprocessor("datasets/crime_dataset.csv")

    preprocessor.load_data()
    preprocessor.check_missing_values()
    preprocessor.convert_date()
    preprocessor.basic_information()
    preprocessor.preview()