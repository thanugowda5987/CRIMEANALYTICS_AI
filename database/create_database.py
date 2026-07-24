import sqlite3
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker("en_IN")

# -------------------------------
# Connect to SQLite Database
# -------------------------------
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "crime.db")
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

# -------------------------------
# Drop existing tables
# -------------------------------
cursor.executescript("""

DROP TABLE IF EXISTS Evidence;
DROP TABLE IF EXISTS Crime;
DROP TABLE IF EXISTS FIR;
DROP TABLE IF EXISTS Victim;
DROP TABLE IF EXISTS Criminal;
DROP TABLE IF EXISTS Officer;
DROP TABLE IF EXISTS PoliceStation;

""")

# -------------------------------
# Police Stations
# -------------------------------
cursor.execute("""
CREATE TABLE PoliceStation(
    station_id INTEGER PRIMARY KEY AUTOINCREMENT,
    station_name TEXT,
    district TEXT,
    city TEXT,
    phone TEXT
)
""")

# -------------------------------
# Officers
# -------------------------------
cursor.execute("""
CREATE TABLE Officer(
    officer_id INTEGER PRIMARY KEY AUTOINCREMENT,
    officer_name TEXT,
    rank TEXT,
    station_id INTEGER,
    phone TEXT,
    FOREIGN KEY(station_id)
    REFERENCES PoliceStation(station_id)
)
""")

# -------------------------------
# Criminal
# -------------------------------
cursor.execute("""
CREATE TABLE Criminal(
    criminal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    criminal_name TEXT,
    age INTEGER,
    gender TEXT,
    address TEXT,
    gang_name TEXT,
    previous_cases INTEGER
)
""")

# -------------------------------
# Victim
# -------------------------------
cursor.execute("""
CREATE TABLE Victim(
    victim_id INTEGER PRIMARY KEY AUTOINCREMENT,
    victim_name TEXT,
    age INTEGER,
    gender TEXT,
    phone TEXT,
    address TEXT
)
""")

# -------------------------------
# FIR
# -------------------------------
cursor.execute("""
CREATE TABLE FIR(
    fir_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fir_number TEXT,
    filing_date TEXT,
    station_id INTEGER,
    officer_id INTEGER,
    FOREIGN KEY(station_id)
    REFERENCES PoliceStation(station_id),
    FOREIGN KEY(officer_id)
    REFERENCES Officer(officer_id)
)
""")

# -------------------------------
# Crime Table
# -------------------------------
cursor.execute("""
CREATE TABLE Crime(
    crime_id INTEGER PRIMARY KEY AUTOINCREMENT,
    crime_type TEXT,
    crime_date TEXT,
    district TEXT,
    location TEXT,
    latitude REAL,
    longitude REAL,
    status TEXT,
    weapon_used TEXT,
    criminal_id INTEGER,
    victim_id INTEGER,
    fir_id INTEGER,
    FOREIGN KEY(criminal_id)
    REFERENCES Criminal(criminal_id),
    FOREIGN KEY(victim_id)
    REFERENCES Victim(victim_id),
    FOREIGN KEY(fir_id)
    REFERENCES FIR(fir_id)
)
""")

# -------------------------------
# Evidence
# -------------------------------
cursor.execute("""
CREATE TABLE Evidence(
    evidence_id INTEGER PRIMARY KEY AUTOINCREMENT,
    crime_id INTEGER,
    evidence_type TEXT,
    description TEXT,
    FOREIGN KEY(crime_id)
    REFERENCES Crime(crime_id)
)
""")

print("Tables Created Successfully.")
# =====================================================
# INSERT SAMPLE POLICE STATIONS
# =====================================================

districts = [
    "Bengaluru Urban",
    "Bengaluru Rural",
    "Mysuru",
    "Mangaluru",
    "Belagavi",
    "Hubballi",
    "Dharwad",
    "Kalaburagi",
    "Ballari",
    "Shivamogga",
    "Tumakuru",
    "Kodagu",
    "Udupi",
    "Hassan",
    "Vijayapura",
    "Raichur",
    "Bidar",
    "Kolar",
    "Mandya",
    "Chikkamagaluru"
]

stations = []

for district in districts:
    for i in range(1, 6):

        station_name = f"{district} Police Station {i}"

        city = district

        phone = "9" + "".join(random.choices("0123456789", k=9))

        cursor.execute("""
        INSERT INTO PoliceStation
        (station_name,district,city,phone)
        VALUES(?,?,?,?)
        """,
        (station_name,district,city,phone))

        stations.append(cursor.lastrowid)

print("Police Stations Inserted")

# =====================================================
# INSERT OFFICERS
# =====================================================

ranks = [
    "Inspector",
    "Sub Inspector",
    "ACP",
    "Constable",
    "Head Constable",
    "DSP"
]

for i in range(100):

    cursor.execute("""
    INSERT INTO Officer
    (officer_name,rank,station_id,phone)
    VALUES(?,?,?,?)
    """,
    (
        fake.name(),
        random.choice(ranks),
        random.choice(stations),
        "9" + "".join(random.choices("0123456789", k=9))
    ))

print("100 Officers Added")
# =====================================================
# INSERT CRIMINALS
# =====================================================

gangs = [
    "None",
    "Black Cobra",
    "Red Tigers",
    "Shadow Gang",
    "Cyber Wolves",
    "Golden Mafia",
    "Night Riders",
    "Unknown"
]

criminal_ids = []

for i in range(500):

    cursor.execute("""
    INSERT INTO Criminal
    (criminal_name,age,gender,address,gang_name,previous_cases)
    VALUES(?,?,?,?,?,?)
    """,
    (
        fake.name(),
        random.randint(18,70),
        random.choice(["Male","Female"]),
        fake.address(),
        random.choice(gangs),
        random.randint(0,20)
    ))

    criminal_ids.append(cursor.lastrowid)

print("500 Criminals Inserted")

# =====================================================
# INSERT VICTIMS
# =====================================================

victim_ids = []

for i in range(1000):

    cursor.execute("""
    INSERT INTO Victim
    (victim_name,age,gender,phone,address)
    VALUES(?,?,?,?,?)
    """,
    (
        fake.name(),
        random.randint(18,80),
        random.choice(["Male","Female"]),
        "9" + "".join(random.choices("0123456789", k=9)),
        fake.address()
    ))

    victim_ids.append(cursor.lastrowid)

print("1000 Victims Inserted")

# =====================================================
# INSERT FIR RECORDS
# =====================================================

fir_ids = []

for i in range(1000):

    fir_number = f"FIR-{2020 + random.randint(0,5)}-{100000+i}"

    filing_date = (
        datetime.now()
        - timedelta(days=random.randint(0,1800))
    ).strftime("%Y-%m-%d")

    cursor.execute("""
    INSERT INTO FIR
    (fir_number,filing_date,station_id,officer_id)
    VALUES(?,?,?,?)
    """,
    (
        fir_number,
        filing_date,
        random.choice(stations),
        random.randint(1,100)
    ))

    fir_ids.append(cursor.lastrowid)

print("1000 FIR Records Inserted")
# =====================================================
# INSERT 1000 CRIME RECORDS
# =====================================================

crime_types = [
    "Murder",
    "Attempt to Murder",
    "Theft",
    "Burglary",
    "Robbery",
    "Chain Snatching",
    "Kidnapping",
    "Cyber Crime",
    "Domestic Violence",
    "Fraud",
    "Assault",
    "Rape",
    "Drug Trafficking",
    "Vehicle Theft",
    "Missing Person"
]

crime_status = [
    "Open",
    "Under Investigation",
    "Solved",
    "Closed"
]

weapons = [
    "Knife",
    "Gun",
    "Rod",
    "Stone",
    "Poison",
    "Hands",
    "Vehicle",
    "Computer",
    "Mobile",
    "Unknown"
]

locations = [
    "Market Road",
    "Bus Stand",
    "Railway Station",
    "City Center",
    "School",
    "College",
    "Hospital",
    "Bank",
    "Residential Area",
    "Industrial Area",
    "Highway",
    "Mall",
    "Temple",
    "Park",
    "Airport"
]

# Approximate latitude/longitude ranges for Karnataka
district_coordinates = {
    "Bengaluru Urban": (12.9716, 77.5946),
    "Bengaluru Rural": (13.2250, 77.5750),
    "Mysuru": (12.2958, 76.6394),
    "Mangaluru": (12.9141, 74.8560),
    "Belagavi": (15.8497, 74.4977),
    "Hubballi": (15.3647, 75.1240),
    "Dharwad": (15.4589, 75.0078),
    "Kalaburagi": (17.3297, 76.8343),
    "Ballari": (15.1394, 76.9214),
    "Shivamogga": (13.9299, 75.5681),
    "Tumakuru": (13.3409, 77.1010),
    "Kodagu": (12.3375, 75.8069),
    "Udupi": (13.3409, 74.7421),
    "Hassan": (13.0072, 76.0962),
    "Vijayapura": (16.8302, 75.7100),
    "Raichur": (16.2120, 77.3439),
    "Bidar": (17.9133, 77.5301),
    "Kolar": (13.1377, 78.1299),
    "Mandya": (12.5223, 76.8975),
    "Chikkamagaluru": (13.3153, 75.7754)
}

crime_ids = []

for i in range(1000):

    district = random.choice(districts)

    base_lat, base_lon = district_coordinates[district]

    latitude = round(base_lat + random.uniform(-0.08, 0.08), 6)
    longitude = round(base_lon + random.uniform(-0.08, 0.08), 6)

    crime_date = (
        datetime.now()
        - timedelta(days=random.randint(0, 1800))
    ).strftime("%Y-%m-%d")

    cursor.execute("""
    INSERT INTO Crime(
        crime_type,
        crime_date,
        district,
        location,
        latitude,
        longitude,
        status,
        weapon_used,
        criminal_id,
        victim_id,
        fir_id
    )
    VALUES(?,?,?,?,?,?,?,?,?,?,?)
    """,
    (
        random.choice(crime_types),
        crime_date,
        district,
        random.choice(locations),
        latitude,
        longitude,
        random.choice(crime_status),
        random.choice(weapons),
        random.choice(criminal_ids),
        random.choice(victim_ids),
        random.choice(fir_ids)
    ))

    crime_ids.append(cursor.lastrowid)

print("1000 Crime Records Inserted Successfully")
# =====================================================
# INSERT EVIDENCE RECORDS
# =====================================================

evidence_types = [
    "Fingerprint",
    "DNA Sample",
    "CCTV Footage",
    "Mobile Phone",
    "Weapon",
    "Blood Sample",
    "Vehicle",
    "Laptop",
    "Document",
    "Witness Statement"
]

for crime_id in crime_ids:

    number_of_evidence = random.randint(1, 3)

    for i in range(number_of_evidence):

        cursor.execute("""
        INSERT INTO Evidence
        (crime_id,evidence_type,description)
        VALUES(?,?,?)
        """,
        (
            crime_id,
            random.choice(evidence_types),
            fake.sentence(nb_words=10)
        ))

print("Evidence Records Inserted")

# =====================================================
# DATABASE SUMMARY
# =====================================================

tables = [
    "PoliceStation",
    "Officer",
    "Criminal",
    "Victim",
    "FIR",
    "Crime",
    "Evidence"
]

print("\n========== DATABASE SUMMARY ==========\n")

for table in tables:
    cursor.execute(f"SELECT COUNT(*) FROM {table}")
    count = cursor.fetchone()[0]
    print(f"{table:<20} : {count}")

# =====================================================
# CREATE INDEXES
# =====================================================

cursor.execute("""
CREATE INDEX IF NOT EXISTS idx_crime_type
ON Crime(crime_type)
""")

cursor.execute("""
CREATE INDEX IF NOT EXISTS idx_crime_date
ON Crime(crime_date)
""")

cursor.execute("""
CREATE INDEX IF NOT EXISTS idx_district
ON Crime(district)
""")

cursor.execute("""
CREATE INDEX IF NOT EXISTS idx_status
ON Crime(status)
""")

cursor.execute("""
CREATE INDEX IF NOT EXISTS idx_station
ON PoliceStation(district)
""")

print("\nIndexes Created Successfully")

# =====================================================
# COMMIT DATABASE
# =====================================================

conn.commit()

print("\n======================================")
print(" KSP CRIME DATABASE CREATED SUCCESSFULLY ")
print("======================================")

print("\nDatabase Name : crime.db")
print("Police Stations : 100")
print("Police Officers : 100")
print("Criminals : 500")
print("Victims : 1000")
print("FIR Records : 1000")
print("Crime Records : 1000")
print("Evidence Records : Randomly Generated")

conn.close()

print("\nDatabase Connection Closed.")
