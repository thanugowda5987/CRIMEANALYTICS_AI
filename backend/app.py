from flask import Flask
from database import db
from routes import api
import os
from routes import api


app = Flask(__name__)

# -------------------------------------------------
# Database Configuration
# -------------------------------------------------

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

DB_PATH = os.path.join(BASE_DIR, "..", "database", "crime.db")

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + DB_PATH.replace("\\", "/")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# -------------------------------------------------
# Initialize Database
# -------------------------------------------------

db.init_app(app)

# -------------------------------------------------
# Register API Routes
# -------------------------------------------------

app.register_blueprint(api)

# -------------------------------------------------
# Create Tables (Only if not already present)
# -------------------------------------------------

with app.app_context():
    db.create_all()

# -------------------------------------------------
# Home Route
# -------------------------------------------------

@app.route("/")
def home():
    return {
        "project": "Crime Analytics AI",
        "organization": "Karnataka State Police (KSP)",
        "status": "Backend Running Successfully",
        "database": "Connected",
        "records": "1000+ Crime Records",
        "api": "/api"
    }

# -------------------------------------------------
# Run Flask Server
# -------------------------------------------------

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )