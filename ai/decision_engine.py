class DecisionEngine:

    def __init__(self):
        pass

    # =====================================================
    # Decide which AI module should answer
    # =====================================================

    def decide(self, question):

        question = question.lower().strip()

        # ----------------------------
        # Knowledge
        # ----------------------------

        if any(word in question for word in [
            "procedure",
            "investigate",
            "how to",
            "guideline",
            "manual",
            "law"
        ]):
            return "knowledge"

        # ----------------------------
        # Reports
        # ----------------------------

        if any(word in question for word in [
            "report",
            "executive report",
            "crime report",
            "summary report"
        ]):
            return "report"

        # ----------------------------
        # Analytics
        # ----------------------------

        if any(word in question for word in [
            "trend",
            "analytics",
            "statistics",
            "distribution",
            "analysis"
        ]):
            return "analytics"

        # ----------------------------
        # Planning
        # ----------------------------

        if any(word in question for word in [
            "plan",
            "operation",
            "strategy",
            "mission"
        ]):
            return "planner"

        # ----------------------------
        # Explanation
        # ----------------------------

        if any(word in question for word in [
            "why",
            "explain",
            "reason"
        ]):
            return "explanation"

        # ----------------------------
        # Confidence
        # ----------------------------

        if any(word in question for word in [
            "confidence",
            "accurate",
            "certainty"
        ]):
            return "confidence"

        # ----------------------------
        # Intelligence
        # ----------------------------

        if any(word in question for word in [
            "highest risk",
            "safest",
            "priority crime",
            "operational risk"
        ]):
            return "intelligence"

        # ----------------------------
        # Recommendation
        # ----------------------------

        if any(word in question for word in [
            "deploy",
            "patrol",
            "cctv",
            "recommend",
            "summary"
        ]):
            return "recommendation"

        # ----------------------------
        # Reasoning
        # ----------------------------

        if any(word in question for word in [
            "future",
            "prediction",
            "hotspot"
        ]):
            return "reasoning"

        # ----------------------------
        # Default
        # ----------------------------

        return "query"