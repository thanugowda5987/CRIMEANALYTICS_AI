class ResponseGenerator:

    def __init__(self):
        pass

    # ===========================================
    # Generic Response
    # ===========================================

    def success(self, message):

        return (
            "===================================\n"
            " Karnataka Police AI Assistant\n"
            "===================================\n\n"
            f"{message}"
        )

    # ===========================================
    # Crime Count Response
    # ===========================================

    def crime_count(self, count, crime=None, city=None, status=None):

        text = f"{count} case(s)"

        if crime:
            text += f" of {crime}"

        if city:
            text += f" in {city}"

        if status:
            text += f" ({status})"

        return (
            "========== Crime Report ==========\n\n"
            f"Result : {text}"
        )

    # ===========================================
    # Average Age Response
    # ===========================================

    def average_age(self, label, age):

        return (
            "========== Statistical Report ==========\n\n"
            f"{label} : {age:.2f} years"
        )

    # ===========================================
    # Recommendation Response
    # ===========================================

    def recommendation(self, title, recommendation):

        return (
            f"========== {title} ==========\n\n"
            f"{recommendation}"
        )

    # ===========================================
    # Intelligence Response
    # ===========================================

    def intelligence(self, report):

        return (
            "========== Intelligence ==========\n\n"
            f"{report}"
        )

    # ===========================================
    # Error Response
    # ===========================================

    def unknown(self):

        return (
            "Sorry Officer.\n"
            "I couldn't understand the request."
        )