class ContextEngine:

    def __init__(self):

        self.reset()

    # ==========================================
    # Save Current Context
    # ==========================================

    def update(self, crime=None, city=None, status=None):

        if crime is not None:
            self.current_crime = crime

        if city is not None:
            self.current_city = city

        if status is not None:
            self.current_status = status

    # ==========================================
    # Read Context
    # ==========================================

    def get(self):

        return {
            "crime": self.current_crime,
            "city": self.current_city,
            "status": self.current_status
        }

    # ==========================================
    # Reset Conversation
    # ==========================================

    def reset(self):

        self.current_crime = None
        self.current_city = None
        self.current_status = None

    # ==========================================
    # Check if Context Exists
    # ==========================================

    def has_context(self):

        return (
            self.current_crime is not None
            or self.current_city is not None
            or self.current_status is not None
        )

    # ==========================================
    # Display Context (Debugging)
    # ==========================================

    def show(self):

        return (
            f"Crime : {self.current_crime}\n"
            f"City : {self.current_city}\n"
            f"Status : {self.current_status}"
        )