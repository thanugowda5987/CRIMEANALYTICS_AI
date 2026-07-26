import pandas as pd


class QueryEngine:

    def __init__(self, dataframe):

        self.df = dataframe.copy()

        if "Date" in self.df.columns:
            self.df["Date"] = pd.to_datetime(
                self.df["Date"],
                errors="coerce"
            )

    # =====================================================
    # MAIN QUERY PROCESSOR
    # =====================================================

    def process_query(self, question):

        question = question.lower().strip()

        filtered = self.df.copy()

        # -------------------------
        # Crime Filter
        # -------------------------

        crime = None

        for value in self.df["Crime_Type"].unique():

            if value.lower() in question:

                crime = value

                filtered = filtered[
                    filtered["Crime_Type"] == value
                ]

                break

        # -------------------------
        # City Filter
        # -------------------------

        city = None

        for value in self.df["City"].unique():

            if value.lower() in question:

                city = value

                filtered = filtered[
                    filtered["City"] == value
                ]

                break

        # -------------------------
        # Status Filter
        # -------------------------

        status = None

        for value in self.df["Status"].unique():

            if value.lower() in question:

                status = value

                filtered = filtered[
                    filtered["Status"] == value
                ]

                break

        # =====================================================
        # TOTAL CRIMES
        # =====================================================

        if (
            "total" in question
            and "crime" in question
        ):

            return f"Total Crime Records : {len(filtered)}"

        # =====================================================
        # COUNT
        # =====================================================

        if (
            "how many" in question
            or "count" in question
            or "cases" in question
        ):

            response = f"{len(filtered)} case(s)"

            if crime:
                response += f" of {crime}"

            if city:
                response += f" in {city}"

            if status:
                response += f" ({status})"

            return response

        # =====================================================
        # OPEN CASES
        # =====================================================

        if question == "open cases":

            count = len(
                self.df[
                    self.df["Status"] == "Open"
                ]
            )

            return f"Open Cases : {count}"

        # =====================================================
        # CLOSED CASES
        # =====================================================

        if question == "closed cases":

            count = len(
                self.df[
                    self.df["Status"] == "Closed"
                ]
            )

            return f"Closed Cases : {count}"

        # =====================================================
        # UNDER INVESTIGATION
        # =====================================================

        if (
            "under investigation" in question
            or question == "investigation"
        ):

            count = len(
                self.df[
                    self.df["Status"] == "Under Investigation"
                ]
            )

            return f"Under Investigation Cases : {count}"

        # =====================================================
        # AVERAGE VICTIM AGE
        # =====================================================

        if "victim age" in question:

            if filtered.empty:
                return "No matching records."

            age = round(
                filtered["Victim_Age"].mean(),
                2
            )

            return f"Average Victim Age : {age} years"

        # =====================================================
        # AVERAGE SUSPECT AGE
        # =====================================================

        if "suspect age" in question:

            if filtered.empty:
                return "No matching records."

            age = round(
                filtered["Suspect_Age"].mean(),
                2
            )

            return f"Average Suspect Age : {age} years"

        # =====================================================
        # HIGHEST CRIME CITY
        # =====================================================

        if (
            "highest crime city" in question
            or "highest crime" in question
        ):

            city_name = self.df["City"].value_counts().idxmax()

            total = self.df["City"].value_counts().max()

            return f"{city_name} has the highest crime count ({total})."

        # =====================================================
        # LIST CITIES
        # =====================================================

        if (
            question == "cities"
            or "show all cities" in question
        ):

            return "\n".join(
                sorted(
                    self.df["City"].unique()
                )
            )

        # =====================================================
        # LIST CRIME TYPES
        # =====================================================

        if (
            "crime types" in question
            or "crime categories" in question
        ):

            return str(
                self.df["Crime_Type"].value_counts()
            )

        return None