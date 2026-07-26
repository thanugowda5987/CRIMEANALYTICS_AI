from query_engine import QueryEngine
from recommendation_engine import RecommendationEngine
from reasoning_engine import ReasoningEngine
from intelligence_engine import IntelligenceEngine
from memory_engine import MemoryEngine
from entity_extractor import EntityExtractor
from intent_classifier import IntentClassifier
from decision_engine import DecisionEngine


class AIBrain:

    def __init__(self, dataframe):

        self.df = dataframe

        # ===============================
        # Core AI Modules
        # ===============================

        self.query = QueryEngine(self.df)
        self.recommendation = RecommendationEngine(self.df)
        self.reasoning = ReasoningEngine(self.df)
        self.intelligence = IntelligenceEngine(self.df)

        # ===============================
        # NLP Modules
        # ===============================

        self.memory = MemoryEngine()
        self.extractor = EntityExtractor(self.df)
        self.intent = IntentClassifier()

        # ===============================
        # Decision Layer
        # ===============================

        self.decision = DecisionEngine()

    # ===================================================
    # MAIN THINKING FUNCTION
    # ===================================================

    def think(self, question):

        question = question.strip()

        # Remember conversation
        self.memory.remember(question)

        # Extract entities (for future use)
        entities = self.extractor.extract(question)

        # Detect intent
        intent = self.intent.classify(question)

        # Decide which engine should answer
        module = self.decision.decide(question)

        # =====================================
        # Route Question
        # =====================================

        if module == "intelligence":

            answer = self.intelligence.process(question)

            if answer is not None:
                return answer

        elif module == "recommendation":

            answer = self.recommendation.process(question)

            if answer is not None:
                return answer

        elif module == "reasoning":

            answer = self.reasoning.process(question)

            if answer is not None:
                return answer

        else:

            answer = self.query.process_query(question)

            if answer is not None:
                return answer

        # =====================================
        # Memory Follow-up
        # =====================================

        answer = self.memory.follow_up(question)

        if answer is not None:
            return answer

        # =====================================
        # Unknown
        # =====================================

        return (
            f"Intent : {intent}\n"
            "Sorry Officer, I couldn't understand the request."
        )