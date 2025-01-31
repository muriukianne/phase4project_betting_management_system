from flask import Flask, jsonify, request
from flask_migrate import Migrate
from  models import db, User, Transaction, Bet, Match, TokenBlocklist
from datetime import datetime
from flask_jwt_extended import JWTManager
from datetime import timedelta

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///betting.db'
migrate = Migrate(app, db)
db.init_app(app)

# jwt
app.config["JWT_SECRET_KEY"] = "123456789" 
app.config["JWT_ACCESS_TOKEN_ESPIRES"] = timedelta(hours=50)
jwt = JWTManager(app)
jwt.init_app(app)

# import all functions from views
from views import *

# Register my blueprint
app.register_blueprint(user_bp)

app.register_blueprint(transaction_bp)

app.register_blueprint(match_bp)

app.register_blueprint(bet_bp)

app.register_blueprint(auth_bp)


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None

if __name__ == "__main__":
    app.run(debug=True)    

