from flask import Blueprint, jsonify
from models import Crime, Criminal, Victim, Officer, FIR, PoliceStation, Evidence

api = Blueprint("api", __name__)


@api.route("/api")
def api_home():
    return jsonify({
        "message": "KSP Crime Analytics API Running"
    })


@api.route("/api/crimes")
def get_all_crimes():
    ...
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