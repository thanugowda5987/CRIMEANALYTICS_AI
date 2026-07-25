from database import db


# ==========================================================
# Crime Model
# ==========================================================

class Crime(db.Model):

    __tablename__ = "Crime"

    crime_id = db.Column(db.Integer, primary_key=True)
    crime_type = db.Column(db.String(100), nullable=False)
    crime_date = db.Column(db.String(50))
    district = db.Column(db.String(100))
    location = db.Column(db.String(100))
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    status = db.Column(db.String(50))
    weapon_used = db.Column(db.String(100))
    criminal_id = db.Column(db.Integer)
    victim_id = db.Column(db.Integer)
    fir_id = db.Column(db.Integer)

    def to_dict(self):
        return {
            "crime_id": self.crime_id,
            "crime_type": self.crime_type,
            "crime_date": self.crime_date,
            "district": self.district,
            "location": self.location,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "status": self.status,
            "weapon_used": self.weapon_used,
            "criminal_id": self.criminal_id,
            "victim_id": self.victim_id,
            "fir_id": self.fir_id
        }


# ==========================================================
# Criminal Model
# ==========================================================

class Criminal(db.Model):

    __tablename__ = "Criminal"

    criminal_id = db.Column(db.Integer, primary_key=True)
    criminal_name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    address = db.Column(db.String(200))
    gang_name = db.Column(db.String(100))
    previous_cases = db.Column(db.Integer)

    def to_dict(self):
        return {
            "criminal_id": self.criminal_id,
            "criminal_name": self.criminal_name,
            "age": self.age,
            "gender": self.gender,
            "address": self.address,
            "gang_name": self.gang_name,
            "previous_cases": self.previous_cases
        }


# ==========================================================
# Victim Model
# ==========================================================

class Victim(db.Model):

    __tablename__ = "Victim"

    victim_id = db.Column(db.Integer, primary_key=True)
    victim_name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))

    def to_dict(self):
        return {
            "victim_id": self.victim_id,
            "victim_name": self.victim_name,
            "age": self.age,
            "gender": self.gender,
            "phone": self.phone,
            "address": self.address
        }


# ==========================================================
# Officer Model
# ==========================================================

class Officer(db.Model):

    __tablename__ = "Officer"

    officer_id = db.Column(db.Integer, primary_key=True)
    officer_name = db.Column(db.String(100), nullable=False)
    rank = db.Column(db.String(50))
    station_id = db.Column(db.Integer)
    phone = db.Column(db.String(20))

    def to_dict(self):
        return {
            "officer_id": self.officer_id,
            "officer_name": self.officer_name,
            "rank": self.rank,
            "station_id": self.station_id,
            "phone": self.phone
        }


# ==========================================================
# FIR Model
# ==========================================================

class FIR(db.Model):

    __tablename__ = "FIR"

    fir_id = db.Column(db.Integer, primary_key=True)
    fir_number = db.Column(db.String(50))
    filing_date = db.Column(db.String(50))
    station_id = db.Column(db.Integer)
    officer_id = db.Column(db.Integer)

    def to_dict(self):
        return {
            "fir_id": self.fir_id,
            "fir_number": self.fir_number,
            "filing_date": self.filing_date,
            "station_id": self.station_id,
            "officer_id": self.officer_id
        }


# ==========================================================
# Police Station Model
# ==========================================================

class PoliceStation(db.Model):

    __tablename__ = "PoliceStation"

    station_id = db.Column(db.Integer, primary_key=True)
    station_name = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100))
    city = db.Column(db.String(100))
    phone = db.Column(db.String(20))

    def to_dict(self):
        return {
            "station_id": self.station_id,
            "station_name": self.station_name,
            "district": self.district,
            "city": self.city,
            "phone": self.phone
        }


# ==========================================================
# Evidence Model
# ==========================================================

class Evidence(db.Model):

    __tablename__ = "Evidence"

    evidence_id = db.Column(db.Integer, primary_key=True)
    crime_id = db.Column(db.Integer)
    evidence_type = db.Column(db.String(100))
    description = db.Column(db.String(255))

    def to_dict(self):
        return {
            "evidence_id": self.evidence_id,
            "crime_id": self.crime_id,
            "evidence_type": self.evidence_type,
            "description": self.description
        }