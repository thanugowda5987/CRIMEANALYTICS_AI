class MemoryEngine:

    def __init__(self):

        self.last_question = ""

        self.last_city = None

        self.last_crime = None

        self.last_status = None

    # ------------------------------------
    # Save Conversation Context
    # ------------------------------------

    def remember(self, question, crime=None, city=None, status=None):

        self.last_question = question

        if crime is not None:
            self.last_crime = crime

        if city is not None:
            self.last_city = city

        if status is not None:
            self.last_status = status

    # ------------------------------------
    # Recall Previous Context
    # ------------------------------------

    def recall(self):

        return {

            "question": self.last_question,

            "crime": self.last_crime,

            "city": self.last_city,

            "status": self.last_status

        }

    # ------------------------------------
    # Follow-up Questions
    # ------------------------------------

    def follow_up(self, question):

        q = question.lower().strip()

        # Example:
        # Officer:
        # How many murders happened in Mysuru?
        #
        # Officer:
        # What about Bengaluru?
        #
        # AI understands Murder is still the topic.

        if q.startswith("what about"):

            if self.last_city is not None:

                return (
                    f"You were previously asking about "
                    f"{self.last_city}."
                )

        if q == "and there?":

            return (
                "Please mention the city name."
            )

        return None

    # ------------------------------------
    # Reset Memory
    # ------------------------------------

    def clear(self):

        self.last_question = ""

        self.last_city = None

        self.last_crime = None

        self.last_status = None