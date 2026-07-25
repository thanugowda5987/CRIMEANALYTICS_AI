from flask import Flask
from flask_cors import CORS
from database import db
from routes import api
import os

# ----------------------------------------
# Create Flask App
# ----------------------------------------

app = Flask(__name__)

# Enable CORS for frontend
CORS(app)

# ----------------------------------------
# Database Configuration
# ----------------------------------------

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DB_PATH = os.path.join(BASE_DIR, "..", "database", "crime.db")

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + DB_PATH.replace("\\", "/")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# ----------------------------------------
# Initialize Database
# ----------------------------------------

db.init_app(app)

# ----------------------------------------
# Register Blueprint
# ----------------------------------------

app.register_blueprint(api)

# ----------------------------------------
# Create Tables
# ----------------------------------------

with app.app_context():
    db.create_all()

# ----------------------------------------
# Home Route
# ----------------------------------------

@app.route("/")
def home():
    return {
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
    }

# ----------------------------------------
# Run Server
# ----------------------------------------

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )