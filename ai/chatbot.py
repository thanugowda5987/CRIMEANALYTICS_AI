import pandas as pd

from ai_brain import AIBrain


class PoliceAIAssistant:

    def __init__(self, dataset_path):

        self.df = pd.read_csv(dataset_path)

        self.brain = AIBrain(self.df)

        print("===================================")
        print(" Karnataka Police AI Assistant ")
        print("===================================")
        print(f"Loaded {len(self.df)} crime records.\n")

    def answer(self, question):

        return self.brain.think(question)


if __name__ == "__main__":

    bot = PoliceAIAssistant("datasets/crime_dataset.csv")

    while True:

        question = input("\nOfficer > ")

        if question.lower().strip() == "exit":

            print("Goodbye Officer.")

            break

        print("\nAI >", bot.answer(question))