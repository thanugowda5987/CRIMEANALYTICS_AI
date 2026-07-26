from datetime import datetime


class ReportEngine:

    def __init__(self, dataframe):

        self.df = dataframe

    # =====================================================
    # Main Router
    # =====================================================

    def process(self, question):

        question = question.lower().strip()

        if (
            "daily report" in question
            or "today report" in question
        ):
            return self.daily_report()

        if "weekly report" in question:
            return self.weekly_report()

        if "monthly report" in question:
            return self.monthly_report()

        if (
            "executive report" in question
            or "management report" in question
        ):
            return self.executive_report()

        return None

    # =====================================================
    # Daily Report
    # =====================================================

    def daily_report(self):

        total = len(self.df)

        highest_city = self.df["City"].value_counts().idxmax()
        top_crime = self.df["Crime_Type"].value_counts().idxmax()

        return (
            "========== Daily Crime Report ==========\n\n"
            f"Date : {datetime.now().strftime('%d-%m-%Y')}\n\n"
            f"Total Cases : {total}\n"
            f"Highest Crime City : {highest_city}\n"
            f"Most Common Crime : {top_crime}\n\n"
            "Operational Note:\n"
            "Maintain normal patrol and monitor hotspot locations."
        )

    # =====================================================
    # Weekly Report
    # =====================================================

    def weekly_report(self):

        return (
            "========== Weekly Crime Report ==========\n\n"
            f"Total Cases Analysed : {len(self.df)}\n\n"
            "Weekly Recommendations\n"
            "• Increase patrol in hotspot cities\n"
            "• Review open investigations\n"
            "• Strengthen intelligence collection\n"
            "• Monitor repeat offenders"
        )

    # =====================================================
    # Monthly Report
    # =====================================================

    def monthly_report(self):

        return (
            "========== Monthly Crime Report ==========\n\n"
            f"Dataset Records : {len(self.df)}\n\n"
            "Monthly Strategic Focus\n"
            "• Crime trend analysis\n"
            "• Resource allocation\n"
            "• Officer deployment review\n"
            "• CCTV effectiveness evaluation"
        )

    # =====================================================
    # Executive Report
    # =====================================================

    def executive_report(self):

        highest_city = self.df["City"].value_counts().idxmax()
        highest_crime = self.df["Crime_Type"].value_counts().idxmax()

        return (
            "========== Executive Intelligence Report ==========\n\n"
            f"Highest Risk City : {highest_city}\n"
            f"Priority Crime : {highest_crime}\n\n"
            "Executive Recommendations\n"
            "1. Increase patrol strength\n"
            "2. Deploy additional officers\n"
            "3. Expand CCTV coverage\n"
            "4. Monitor high-risk zones\n"
            "5. Continue predictive analysis"
        )