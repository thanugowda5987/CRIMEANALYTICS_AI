import random
from datetime import datetime, timedelta
import pandas as pd
from faker import Faker

fake = Faker("en_IN")

crime_types = [
    "Theft",
    "Robbery",
    "Murder",
    "Cyber Crime",
    "Fraud",
    "Assault",
    "Kidnapping",
    "Drug Trafficking"
]

cities = [
    "Bengaluru",
    "Mysuru",
    "Hubballi",
    "Mangaluru",
    "Belagavi",
    "Shivamogga"
]

status = [
    "Open",
    "Closed",
    "Under Investigation"
]

records = []

for i in range(1000):
    crime_date = datetime.now() - timedelta(days=random.randint(0, 365))

    records.append({
        "Crime_ID": i + 1,
        "Crime_Type": random.choice(crime_types),
        "City": random.choice(cities),
        "Area": fake.street_name(),
        "Latitude": round(random.uniform(11.8, 18.5), 6),
        "Longitude": round(random.uniform(74.0, 78.6), 6),
        "Date": crime_date.strftime("%Y-%m-%d"),
        "Victim_Age": random.randint(18, 70),
        "Suspect_Age": random.randint(18, 60),
        "Status": random.choice(status)
    })

df = pd.DataFrame(records)

df.to_csv("datasets/crime_dataset.csv", index=False)

print("Dataset generated successfully!")
print(df.head())