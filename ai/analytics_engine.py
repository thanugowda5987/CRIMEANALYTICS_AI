class AnalyticsEngine:

    def __init__(self, dataframe):

        self.df = dataframe

    # =====================================================
    # Main Analytics Router
    # =====================================================

    def process(self, question):

        question = question.lower().strip()

        if (
            "top city" in question
            or "top cities" in question
            or "highest crime cities" in question
        ):
            return self.top_cities()

        if (
            "top crime" in question
            or "crime ranking" in question
            or "crime statistics" in question
        ):
            return self.top_crimes()

        if (
            "city comparison" in question
            or "compare cities" in question
        ):
            return self.city_comparison()

        if (
            "crime distribution" in question
            or "distribution" in question
        ):
            return self.crime_distribution()

        if (
            "status report" in question
            or "case status" in question
        ):
            return self.status_distribution()

        return None

    # =====================================================
    # Top Crime Cities
    # =====================================================

    def top_cities(self):

        counts = self.df["City"].value_counts()

        result = "========== Top Crime Cities ==========\n\n"

        for i, (city, count) in enumerate(counts.items(), start=1):
            result += f"{i}. {city} - {count} cases\n"

        return result

    # =====================================================
    # Top Crime Types
    # =====================================================

    def top_crimes(self):

        counts = self.df["Crime_Type"].value_counts()

        result = "========== Crime Statistics ==========\n\n"

        for i, (crime, count) in enumerate(counts.items(), start=1):
            result += f"{i}. {crime} - {count} cases\n"

        return result

    # =====================================================
    # Compare Cities
    # =====================================================

    def city_comparison(self):

        counts = self.df["City"].value_counts()

        result = "========== City Comparison ==========\n\n"

        for city, count in counts.items():
            result += f"{city:<15} : {count} cases\n"

        return result

    # =====================================================
    # Crime Distribution
    # =====================================================

    def crime_distribution(self):

        total = len(self.df)

        result = "========== Crime Distribution ==========\n\n"

        counts = self.df["Crime_Type"].value_counts()

        for crime, count in counts.items():

            percentage = round((count / total) * 100, 2)

            result += (
                f"{crime:<20}"
                f"{count:>4} cases"
                f" ({percentage}%)\n"
            )

        return result

    # =====================================================
    # Case Status Distribution
    # =====================================================

    def status_distribution(self):

        total = len(self.df)

        result = "========== Case Status ==========\n\n"

        counts = self.df["Status"].value_counts()

        for status, count in counts.items():

            percentage = round((count / total) * 100, 2)

            result += (
                f"{status:<22}"
                f"{count:>4} cases"
                f" ({percentage}%)\n"
            )

        return result