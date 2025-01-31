from models import db, User, Bet
from flask import jsonify, request, Blueprint
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity
from datetime import datetime
from datetime import timedelta


auth_bp = Blueprint("auth_bp", __name__)


# login
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    user = User.query.filter_by(email = email).first()

    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity = user.id)
        return jsonify ({"access_token":access_token}), 200
        
    else:
        return jsonify ({"Error":"Either email / password is incorrect"}), 404

@auth_bp.route("/current_user", methods=["GET"])
@jwt_required()
def current_user():
    current_user_id = get_jwt_identity()

    # Fetch the user by their ID
    user = User.query.get(current_user_id)

    if not user:
        return jsonify({"Error": "User not found"}), 404

    # Get the user's bets
    user_bets = Bet.query.filter_by(user_id=current_user_id).all()

    # Construct the user data with their bets
    user_data = {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "password": user.password,
        "bets": [{
            "id": bet.id,
            "amount": bet.amount,
            "outcome": bet.outcome,
            "bet_date": bet.bet_date,
            "match_id": bet.match_id,
            "match_name": bet.match.name
        } for bet in user_bets]  # Use list comprehension to construct bets for the user
    }

    return jsonify(user_data)




# logout
@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    now = datetime.now(timezone.utc)
    db.session.add(TokenBlocklist(jti=jti, created_at=now))
    db.session.commit()
    return jsonify({"Success":"Logged out successfully"})
