from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Demo manager credentials (hardcoded for MVP)
    # Replace with DB lookup in production
    MANAGER_USERNAME = "manager"
    MANAGER_PASSWORD = "storesense123"

    if username == MANAGER_USERNAME and password == MANAGER_PASSWORD:
        return jsonify({
            "id": 1,
            "name": "Store Manager",
            "username": username,
            "role": "manager"
        })

    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True)
