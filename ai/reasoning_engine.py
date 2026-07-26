import pandas as pd


class ReasoningEngine:

    def __init__(self, dataframe):

        self.df = dataframe

    # =====================================================
    # Main Process
    # =====================================================

    def process(self, question):

        question = question.lower().strip()

        if (
            "future" in question
            or "prediction" in question
            or "future crime" in question
            or "future risk" in question
        ):
            return self.future_risk()

        if (
            "priority crime" in question
            or "dangerous crime" in question
        ):
            return self.priority_crime()

        if (
            "needs more patrol" in question
            or "increase patrol" in question
            or "patrol recommendation" in question
        ):
            return self.city_needing_patrol()

        if (
            "crime intelligence summary" in question
            or "overall summary" in question
        ):
            return self.overall_summary()

        return None

    # =====================================================
    # Patrol Analysis
    # =====================================================

    def city_needing_patrol(self):

        city_counts = self.df["City"].value_counts()

        city = city_counts.idxmax()

        count = city_counts.max()

        open_cases = len(
            self.df[
                (self.df["City"] == city)
                &
                (self.df["Status"] == "Open")
            ]
        )

        return (
            "========== AI Reasoning ==========\n\n"
            f"Recommended City : {city}\n\n"
            "Reasoning:\n"
            f"• Highest recorded crimes ({count})\n"
            f"• Open Cases : {open_cases}\n"
            "• Higher probability of repeated incidents\n\n"
            "Recommendation:\n"
            "Increase patrol frequency."
        )

    # =====================================================
    # Priority Crime
    # =====================================================

    def priority_crime(self):

        crime_counts = self.df["Crime_Type"].value_counts()

        crime = crime_counts.idxmax()

        count = crime_counts.max()

        return (
            "========== Crime Analysis ==========\n\n"
            f"Crime : {crime}\n"
            f"Reported Cases : {count}\n\n"
            "Reasoning:\n"
            "Highest occurrence among all recorded crimes.\n\n"
            "Recommendation:\n"
            f"Launch prevention programs against {crime}."
        )

    # =====================================================
    # Crime Summary
    # =====================================================

    def overall_summary(self):

        total = len(self.df)

        city = self.df["City"].value_counts().idxmax()

        crime = self.df["Crime_Type"].value_counts().idxmax()

        open_cases = len(
            self.df[
                self.df["Status"] == "Open"
            ]
        )

        return (
            "========== AI Crime Summary ==========\n\n"
            f"Total Cases : {total}\n"
            f"Highest Crime City : {city}\n"
            f"Priority Crime : {crime}\n"
            f"Open Cases : {open_cases}\n\n"
            "AI Conclusion:\n"
            "Allocate more police resources to hotspot regions."
        )

    # =====================================================
    # Future Risk
    # =====================================================

    def future_risk(self):

        city = self.df["City"].value_counts().idxmax()

        crime = self.df["Crime_Type"].value_counts().idxmax()

        return (
            "========== Future Risk Assessment ==========\n\n"
            "Based on historical crime distribution,\n\n"
            f"{city} is expected to remain the highest-risk city.\n\n"
            f"{crime} will likely remain the dominant crime type.\n\n"
            "Suggested Actions:\n"
            "• Predictive patrol\n"
            "• AI CCTV Monitoring\n"
            "• Community policing\n"
            "• Rapid response units"
        )