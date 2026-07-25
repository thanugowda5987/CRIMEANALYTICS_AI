from flask import Blueprint, jsonify, request
from models import Crime, Criminal, Victim, Officer, FIR, PoliceStation, Evidence

api = Blueprint("api", __name__)

# =========================================================
# HOME
# =========================================================

@api.route("/")
def home():
    return jsonify({
        "project": "Crime Analytics AI",
        "organization": "Karnataka State Police (KSP)",
        "status": "Backend Running Successfully",
        "database": "Connected",
        "api": [
            "/login",
            "/crime",
            "/chat",
            "/prediction",
            "/hotspot",
            "/api/criminals",
            "/api/victims",
            "/api/officers",
            "/api/firs",
            "/api/policestations",
            "/api/evidence"
        ]
    })


# =========================================================
# LOGIN
# =========================================================

@api.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    password = data.get("password")

    if username == "thanu" and password == "123":

        return jsonify({

            "success": True,
            "message": "Login Successful",
            "username": username,
            "role": "Police Officer",
            "token": "ksp-demo-token"

        })

    return jsonify({

        "success": False,
        "message": "Invalid Username or Password"

    }), 401


# =========================================================
# CRIME
# =========================================================

@api.route("/crime", methods=["GET"])
def get_crimes():

    crimes = Crime.query.all()

    result = []

    for c in crimes:

        result.append({

            "crime_id": c.crime_id,
            "crime_type": c.crime_type,
            "location": c.location,
            "district": c.district,
            "status": c.status

        })

    return jsonify(result)


# =========================================================
# CHATBOT
# =========================================================

@api.route("/chat", methods=["POST"])
def chatbot():

    data = request.get_json()

    message = data.get("message", "")

    return jsonify({

        "success": True,

        "reply":
        f"KSP AI Assistant: I received your query '{message}'. Analysis completed."

    })


# =========================================================
# PREDICTION
# =========================================================

@api.route("/prediction", methods=["POST"])
def prediction():

    data = request.get_json()

    district = data.get("district")
    crime = data.get("crime_type")

    return jsonify({

        "prediction":
        f"High probability of {crime}",

        "risk_level": "High",

        "confidence": 92,

        "recommendation":
        f"Increase police patrols and CCTV surveillance in {district}."

    })


# =========================================================
# HOTSPOTS
# =========================================================

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


# =========================================================
# CRIMINALS
# =========================================================

@api.route("/api/criminals")
def criminals():

    data = Criminal.query.all()

    return jsonify([{

        "criminal_id":x.criminal_id,
        "criminal_name":x.criminal_name,
        "age":x.age,
        "gender":x.gender,
        "address":x.address,
        "gang_name":x.gang_name,
        "previous_cases":x.previous_cases

    } for x in data])


# =========================================================
# VICTIMS
# =========================================================

@api.route("/api/victims")
def victims():

    data = Victim.query.all()

    return jsonify([{

        "victim_id":x.victim_id,
        "victim_name":x.victim_name,
        "age":x.age,
        "gender":x.gender,
        "phone":x.phone,
        "address":x.address

    } for x in data])


# =========================================================
# OFFICERS
# =========================================================

@api.route("/api/officers")
def officers():

    data = Officer.query.all()

    return jsonify([{

        "officer_id":x.officer_id,
        "officer_name":x.officer_name,
        "rank":x.rank,
        "station_id":x.station_id,
        "phone":x.phone

    } for x in data])


# =========================================================
# FIR
# =========================================================

@api.route("/api/firs")
def firs():

    data = FIR.query.all()

    return jsonify([{

        "fir_id":x.fir_id,
        "fir_number":x.fir_number,
        "filing_date":str(x.filing_date),
        "station_id":x.station_id,
        "officer_id":x.officer_id

    } for x in data])


# =========================================================
# POLICE STATIONS
# =========================================================

@api.route("/api/policestations")
def stations():

    data = PoliceStation.query.all()

    return jsonify([{

        "station_id":x.station_id,
        "station_name":x.station_name,
        "district":x.district,
        "city":x.city,
        "phone":x.phone

    } for x in data])


# =========================================================
# EVIDENCE
# =========================================================

@api.route("/api/evidence")
def evidence():

    data = Evidence.query.all()

    return jsonify([{

        "evidence_id":x.evidence_id,
        "crime_id":x.crime_id,
        "evidence_type":x.evidence_type,
        "description":x.description

    } for x in data])