class EntityExtractor:

    def __init__(self, dataframe):

        self.df = dataframe

    def extract(self, question):

        question = question.lower()

        crime = None
        city = None
        status = None

        # -----------------------
        # Crime Type
        # -----------------------

        for value in self.df["Crime_Type"].unique():

            if value.lower() in question:

                crime = value
                break

        # -----------------------
        # City
        # -----------------------

        for value in self.df["City"].unique():

            if value.lower() in question:

                city = value
                break

        # -----------------------
        # Status
        # -----------------------

        for value in self.df["Status"].unique():

            if value.lower() in question:

                status = value
                break

        return crime, city, status