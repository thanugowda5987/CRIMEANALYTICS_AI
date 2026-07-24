from database import db


# ==========================
# Crime Model
# ==========================

class Crime(db.Model):

    __tablename__ = "Crime"

    crime_id = db.Column(db.Integer, primary_key=True)
    crime_type = db.Column(db.String(100))
    description = db.Column(db.String(255))
    location = db.Column(db.String(100))
    district = db.Column(db.String(100))
    status = db.Column(db.String(50))


    def to_dict(self):
        return {
            "crime_id": self.crime_id,
            "crime_type": self.crime_type,
            "description": self.description,
            "location": self.location,
            "district": self.district,
            "status": self.status
        }



# ==========================
# Criminal Model
# ==========================

class Criminal(db.Model):

    __tablename__ = "Criminal"

    criminal_id = db.Column(db.Integer, primary_key=True)
    criminal_name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    address = db.Column(db.String(200))
    gang_name = db.Column(db.String(100))
    previous_cases = db.Column(db.Integer)



# ==========================
# Victim Model
# ==========================

class Victim(db.Model):

    __tablename__ = "Victim"

    victim_id = db.Column(db.Integer, primary_key=True)
    victim_name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(20))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))



# ==========================
# Officer Model
# ==========================

class Officer(db.Model):

    __tablename__ = "Officer"

    officer_id = db.Column(db.Integer, primary_key=True)
    officer_name = db.Column(db.String(100))
    rank = db.Column(db.String(50))
    station_id = db.Column(db.Integer)
    phone = db.Column(db.String(20))



# ==========================
# FIR Model
# ==========================

class FIR(db.Model):

    __tablename__ = "FIR"

    fir_id = db.Column(db.Integer, primary_key=True)
    fir_number = db.Column(db.String(50))
    filing_date = db.Column(db.String(50))
    station_id = db.Column(db.Integer)
    officer_id = db.Column(db.Integer)



# ==========================
# Police Station Model
# ==========================

class PoliceStation(db.Model):

    __tablename__ = "PoliceStation"

    station_id = db.Column(db.Integer, primary_key=True)
    station_name = db.Column(db.String(100))
    district = db.Column(db.String(100))
    city = db.Column(db.String(100))
    phone = db.Column(db.String(20))



# ==========================
# Evidence Model
# ==========================

class Evidence(db.Model):

    __tablename__ = "Evidence"

    evidence_id = db.Column(db.Integer, primary_key=True)
    crime_id = db.Column(db.Integer)
    evidence_type = db.Column(db.String(100))
    description = db.Column(db.String(255))