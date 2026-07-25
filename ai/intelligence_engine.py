import pandas as pd


class IntelligenceEngine:

    def __init__(self, dataframe):

        self.df = dataframe

    # ======================================================
    # Main Entry
    # ======================================================

    def process(self, question):

        question = question.lower().strip()

        if (
            "highest risk city" in question
            or "most dangerous city" in question
            or "highest crime city" in question
        ):
            return self.highest_risk_city()

        if (
            "safest city" in question
            or "lowest crime city" in question
        ):
            return self.safest_city()

        if (
            "priority crime" in question
            or "highest priority crime" in question
        ):
            return self.priority_crime()

        if (
            "operational risk" in question
            or "risk assessment" in question
        ):
            return self.operational_risk()

        if (
            "intelligence report" in question
            or "generate intelligence report" in question
            or "crime intelligence report" in question
        ):
            return self.intelligence_report()

        return None

    # ======================================================
    # Highest Risk City
    # ======================================================

    def highest_risk_city(self):

        counts = self.df["City"].value_counts()

        city = counts.idxmax()
        total = counts.max()

        return (
            "========== Highest Risk City ==========\n\n"
            f"City : {city}\n"
            f"Total Cases : {total}\n"
            "Threat Level : HIGH"
        )

    # ======================================================
    # Safest City
    # ======================================================

    def safest_city(self):

        counts = self.df["City"].value_counts()

        city = counts.idxmin()
        total = counts.min()

        return (
            "========== Safest City ==========\n\n"
            f"City : {city}\n"
            f"Total Cases : {total}\n"
            "Threat Level : LOW"
        )

    # ======================================================
    # Highest Priority Crime
    # ======================================================

    def priority_crime(self):

        counts = self.df["Crime_Type"].value_counts()

        crime = counts.idxmax()
        total = counts.max()

        return (
            "========== Priority Crime ==========\n\n"
            f"Crime : {crime}\n"
            f"Reported Cases : {total}"
        )

    # ======================================================
    # Operational Risk
    # ======================================================

    def operational_risk(self):

        city = self.df["City"].value_counts().idxmax()

        crime = self.df["Crime_Type"].value_counts().idxmax()

        open_cases = len(
            self.df[
                self.df["Status"] == "Open"
            ]
        )

        return (
            "========== Operational Risk ==========\n\n"
            f"Highest Risk City : {city}\n"
            f"Priority Crime : {crime}\n"
            f"Open Cases : {open_cases}\n"
        )

    # ======================================================
    # Complete Intelligence Report
    # ======================================================

    def intelligence_report(self):

        total = len(self.df)

        city_counts = self.df["City"].value_counts()

        crime_counts = self.df["Crime_Type"].value_counts()

        highest_city = city_counts.idxmax()
        highest_city_count = city_counts.max()

        priority_crime = crime_counts.idxmax()
        priority_count = crime_counts.max()

        open_cases = len(
            self.df[
                self.df["Status"] == "Open"
            ]
        )

        closed_cases = len(
            self.df[
                self.df["Status"] == "Closed"
            ]
        )

        investigation_cases = len(
            self.df[
                self.df["Status"] == "Under Investigation"
            ]
        )

        return (
            "========== Crime Intelligence Report ==========\n\n"
            f"Total Records : {total}\n\n"
            f"Highest Risk City : {highest_city} ({highest_city_count})\n"
            f"Highest Crime Type : {priority_crime} ({priority_count})\n\n"
            f"Open Cases : {open_cases}\n"
            f"Closed Cases : {closed_cases}\n"
            f"Under Investigation : {investigation_cases}\n"
        )