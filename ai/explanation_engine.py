class ExplanationEngine:

    def __init__(self, dataframe):

        self.df = dataframe

    # =====================================================
    # Main Router
    # =====================================================

    def process(self, question):

        question = question.lower().strip()

        if (
            "why" in question
            or "explain" in question
            or "reason" in question
        ):
            return self.generate_explanation(question)

        return None

    # =====================================================
    # Generate Explanation
    # =====================================================

    def generate_explanation(self, question):

        highest_city = self.df["City"].value_counts().idxmax()
        city_cases = self.df["City"].value_counts().max()

        highest_crime = self.df["Crime_Type"].value_counts().idxmax()
        crime_cases = self.df["Crime_Type"].value_counts().max()

        return (
            "========== AI Explanation ==========\n\n"
            "Reasoning Process\n\n"
            f"• Highest crime city : {highest_city} ({city_cases} cases)\n"
            f"• Most frequent crime : {highest_crime} ({crime_cases} cases)\n\n"
            "Conclusion\n"
            "The recommendation is based on crime frequency "
            "and statistical analysis of the available dataset."
        )