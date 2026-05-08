from flask import Blueprint, request, jsonify

auth_bp = Blueprint("auth", __name__)

MANAGER_USERNAME = "manager"
MANAGER_PASSWORD = "storesense123"


@auth_bp.post("/api/auth/login")
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username == MANAGER_USERNAME and password == MANAGER_PASSWORD:
        return jsonify({
            "id": 1,
            "name": "Store Manager",
            "username": username,
            "role": "manager",
        })

    return jsonify({"error": "Invalid credentials"}), 401
