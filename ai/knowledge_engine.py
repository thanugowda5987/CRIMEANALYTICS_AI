import json
import os


class KnowledgeEngine:

    def __init__(self):

        self.file = "datasets/police_knowledge.json"

        if not os.path.exists(self.file):

            with open(self.file, "w") as f:
                json.dump({}, f, indent=4)

    # =====================================================
    # Load Knowledge
    # =====================================================

    def load(self):

        with open(self.file, "r") as f:
            return json.load(f)

    # =====================================================
    # Save Knowledge
    # =====================================================

    def save(self, knowledge):

        with open(self.file, "w") as f:
            json.dump(knowledge, f, indent=4)

    # =====================================================
    # Add Knowledge
    # =====================================================

    def add(self, topic, information):

        knowledge = self.load()

        knowledge[topic.lower()] = information

        self.save(knowledge)

        return f"Knowledge added for '{topic}'."

    # =====================================================
    # Retrieve Knowledge
    # =====================================================

    def search(self, topic):

        knowledge = self.load()

        topic = topic.lower()

        if topic in knowledge:

            return (
                "========== Police Knowledge ==========\n\n"
                f"Topic : {topic.title()}\n\n"
                f"{knowledge[topic]}"
            )

        return None

    # =====================================================
    # Process Question
    # =====================================================

    def process(self, question):

        knowledge = self.load()

        q = question.lower()

        for topic in knowledge:

            if topic in q:

                return self.search(topic)

        return None