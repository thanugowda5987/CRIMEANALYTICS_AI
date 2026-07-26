class IntentClassifier:

    def __init__(self):
        pass

    def classify(self, question):

        question = question.lower()

        # -----------------------------
        # Total Crime Count
        # -----------------------------
        if "total" in question and "crime" in question:
            return "TOTAL_CRIMES"

        # -----------------------------
        # Crime Count
        # -----------------------------
        if "how many" in question:
            return "CRIME_COUNT"

        # -----------------------------
        # Highest Crime City
        # -----------------------------
        if "highest" in question:
            return "HIGHEST_CITY"

        # -----------------------------
        # Average Victim Age
        # -----------------------------
        if "victim age" in question:
            return "AVG_VICTIM_AGE"

        # -----------------------------
        # Average Suspect Age
        # -----------------------------
        if "suspect age" in question:
            return "AVG_SUSPECT_AGE"

        # -----------------------------
        # Crime Types
        # -----------------------------
        if "crime types" in question:
            return "CRIME_TYPES"

        # -----------------------------
        # Cities
        # -----------------------------
        if "cities" in question:
            return "CITIES"

        return "UNKNOWN"