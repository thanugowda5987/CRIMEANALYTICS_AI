class RecommendationEngine:

    def __init__(self, dataframe):

        self.df = dataframe

    def process(self, question):

        question = question.lower().strip()

        # ---------------------------------
        # Patrol Recommendation
        # ---------------------------------

        if "patrol" in question:

            return self.recommend_patrol_city()

        # ---------------------------------
        # Deploy Officers
        # ---------------------------------

        if (
            "deploy" in question
            or "officer" in question
            or "personnel" in question
            or "police" in question
        ):

            return self.recommend_officers()

        # ---------------------------------
        # CCTV Recommendation
        # ---------------------------------

        if "cctv" in question or "camera" in question:

            return self.recommend_cctv()

        # ---------------------------------
        # Crime Summary
        # ---------------------------------

        if "summary" in question:

            return self.crime_summary()

        # ---------------------------------
        # Priority Crime
        # ---------------------------------

        if (
            "priority crime" in question
            or "most common crime" in question
            or "common crime" in question
        ):

            return self.recommend_priority_crime()

        return None

    # ==========================================================
    # Recommendation Methods
    # ==========================================================

    def recommend_patrol_city(self):

        city_counts = self.df["City"].value_counts()

        city = city_counts.idxmax()

        count = city_counts.max()

        return (
            "Recommendation:\n"
            f"Increase police patrol in {city}.\n"
            f"Reason: {count} recorded crime cases."
        )

    def recommend_officers(self):

        city_counts = self.df["City"].value_counts()

        city = city_counts.idxmax()

        return (
            "Recommendation:\n"
            f"Deploy additional officers to {city}."
        )

    def recommend_cctv(self):

        city_counts = self.df["City"].value_counts()

        city = city_counts.idxmax()

        return (
            "Recommendation:\n"
            f"Install additional CCTV cameras in {city}."
        )

    def recommend_priority_crime(self):

        crime_counts = self.df["Crime_Type"].value_counts()

        crime = crime_counts.idxmax()

        count = crime_counts.max()

        return (
            "Recommendation:\n"
            f"Prioritize prevention of {crime}.\n"
            f"Reason: {count} recorded cases."
        )

    def crime_summary(self):

        total = len(self.df)

        highest_city = self.df["City"].value_counts().idxmax()

        highest_count = self.df["City"].value_counts().max()

        top_crime = self.df["Crime_Type"].value_counts().idxmax()

        top_count = self.df["Crime_Type"].value_counts().max()

        open_cases = len(
            self.df[self.df["Status"] == "Open"]
        )

        return (
            "========= Crime Summary =========\n\n"
            f"Total Cases : {total}\n"
            f"Highest Crime City : {highest_city} ({highest_count})\n"
            f"Most Common Crime : {top_crime} ({top_count})\n"
            f"Open Cases : {open_cases}\n\n"
            "Recommendations:\n"
            "- Increase police patrol\n"
            "- Deploy rapid response teams\n"
            "- Improve CCTV surveillance\n"
            "- Strengthen community policing"
        )