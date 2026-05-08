from flask import Flask
from flask_cors import CORS

from routes.auth import auth_bp
from routes.products import products_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_bp)
app.register_blueprint(products_bp)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
