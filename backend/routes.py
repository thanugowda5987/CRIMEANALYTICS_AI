from flask import Blueprint, jsonify, request
from models import Crime, Criminal, Victim, Officer, FIR, PoliceStation, Evidence

api = Blueprint("api", __name__)

# ---------------------------------------
# HOME API
# ---------------------------------------

@api.route("/api")
def api_home():
    return jsonify({
        "message": "KSP Crime Analytics API Running Successfully"
    })

# ---------------------------------------
# LOGIN API
# ---------------------------------------

@api.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    # Demo Login
    if username == "thanu" and password == "123":

        return jsonify({
            "message": "Login Successful"
        })

    return jsonify({
        "message": "Invalid Username or Password"
    }), 401


# ---------------------------------------
# CRIME API
# ---------------------------------------

@api.route("/crime", methods=["GET"])
def get_crime():

    crimes = Crime.query.all()

    result = []

    for c in crimes:

        result.append({

            "id": c.crime_id,

            "type": c.crime_type,

            "location": c.location,

            "status": c.status

        })

    return jsonify(result)


# ---------------------------------------
# CHATBOT API
# ---------------------------------------

@api.route("/chat", methods=["POST"])
def chatbot():

    data = request.get_json()

    message = data.get("message")

    return jsonify({

        "reply": f"You asked: {message}. AI module will provide intelligent response."

    })


# ---------------------------------------
# PREDICTION API
# ---------------------------------------

@api.route("/prediction", methods=["POST"])
def prediction():

    data = request.get_json()

    district = data.get("district")
    crime = data.get("crime_type")

    return jsonify({

        "prediction": f"High probability of {crime} cases in {district}.",

        "risk": "High",

        "recommendation": "Increase police patrol and CCTV surveillance."

    })


# ---------------------------------------
# HOTSPOT API
# ---------------------------------------

@api.route("/hotspot", methods=["GET"])
def hotspot():

    return jsonify([

        {

            "area":"Bengaluru South",

            "crime_count":120,

            "risk":"High"

        },

        {

            "area":"Mysuru",

            "crime_count":70,

            "risk":"Medium"

        },

        {

            "area":"Belagavi",

            "crime_count":35,

            "risk":"Low"

        }

    ])


# ---------------------------------------
# EXISTING APIs
# ---------------------------------------

@api.route('/api/criminals')
def get_criminals():

    criminals = Criminal.query.all()

    return jsonify([
        {
            "criminal_id": c.criminal_id,
            "criminal_name": c.criminal_name,
            "age": c.age,
            "gender": c.gender,
            "address": c.address,
            "gang_name": c.gang_name,
            "previous_cases": c.previous_cases
        }
        for c in criminals
    ])


@api.route('/api/victims')
def get_victims():

    victims = Victim.query.all()

    return jsonify([
        {
            "victim_id": v.victim_id,
            "victim_name": v.victim_name,
            "age": v.age,
            "gender": v.gender,
            "phone": v.phone,
            "address": v.address
        }
        for v in victims
    ])


@api.route('/api/officers')
def get_officers():

    officers = Officer.query.all()

    return jsonify([
        {
            "officer_id": o.officer_id,
            "officer_name": o.officer_name,
            "rank": o.rank,
            "station_id": o.station_id,
            "phone": o.phone
        }
        for o in officers
    ])


@api.route('/api/firs')
def get_firs():

    firs = FIR.query.all()

    return jsonify([
        {
            "fir_id": f.fir_id,
            "fir_number": f.fir_number,
            "filing_date": f.filing_date,
            "station_id": f.station_id,
            "officer_id": f.officer_id
        }
        for f in firs
    ])


@api.route('/api/policestations')
def get_stations():

    stations = PoliceStation.query.all()

    return jsonify([
        {
            "station_id": s.station_id,
            "station_name": s.station_name,
            "district": s.district,
            "city": s.city,
            "phone": s.phone
        }
        for s in stations
    ])


@api.route('/api/evidence')
def get_evidence():

    evidence = Evidence.query.all()

    return jsonify([
        {
            "evidence_id": e.evidence_id,
            "crime_id": e.crime_id,
            "evidence_type": e.evidence_type,
            "description": e.description
        }
        for e in evidence
    ])