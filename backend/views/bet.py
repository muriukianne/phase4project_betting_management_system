from models import db, Bet, User, Match
from flask import jsonify, request, Blueprint
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from datetime import datetime

bet_bp = Blueprint("bet_bp", __name__)

# BETS
# Create/Add a Bet
@bet_bp.route('/bets/place_bet', methods=['POST'])
@jwt_required()
def place_bet():
    data = request.get_json()

    user_id = data.get('user_id')
    amount = data.get('amount')
    outcome = data.get('outcome')
    bet_date = data.get('bet_date', datetime.utcnow())  # Default to current time if not provided
    match_id = data.get('match_id')

    # Validate required fields
    if not user_id or not amount or not outcome or not match_id:
        return jsonify({"Error": "Missing required fields (user_id, amount, outcome, match_id)"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404

    match = Match.query.get(match_id)
    if not match:
        return jsonify({"Error": "Match not found"}), 404

    if isinstance(bet_date, str):
        try:
            bet_date = datetime.fromisoformat(bet_date.replace("Z", "+00:00"))  # Handles the 'Z' at the end (UTC timezone)
        except ValueError:
            return jsonify({"Error": "Invalid date format. Expected format: YYYY-MM-DDTHH:MM:SS+00:00"}), 400



    # Create and add new bet
    new_bet = Bet(
        user_id=user_id,
        amount=amount,
        outcome=outcome,
        bet_date=bet_date,
        match_id=match_id
    )

    db.session.add(new_bet)
    db.session.commit()

    return jsonify({
        "success": "Bet placed successfully",
        "Bet ID": new_bet.id,
        "Amount": new_bet.amount,
        "Outcome": new_bet.outcome,
        "Bet Date": new_bet.bet_date,
        "Match ID": new_bet.match_id
    }), 201

# Fetch for current user
@bet_bp.route("/bets/fetch_bets", methods=["GET"])
@jwt_required()
def fetch_bet():
    current_user_id = get_jwt_identity()
    
    user = User.query.get(current_user_id)
    if user:
        bets = Bet.query.filter_by(user_id=current_user_id).all() 
        bet_list = []
        for bet in bets:
            match = Match.query.get(bet.match_id)  # Assuming the match details are needed for each bet
            bet_list.append({
                "amount": bet.amount,
                'outcome': bet.outcome,
                'bet_date': bet.bet_date,
                "match_id": {
                    "id": match.id,
                    "name": match.name,
                    "odds_team_a": match.odds_team_a,
                    "odds_team_b": match.odds_team_b,
                    "outcome": match.outcome
                }
            })

        return jsonify(bet_list)
    
    return jsonify({"error": "Bet not found or unauthorized access"}), 404 

# Fetch all Bets
@bet_bp.route("/bets", methods=["GET"])
def fetch_bets():
    bets = Bet.query.all()  # Fetch all bets from the database
    bet_list = []

    # Loop through all bets and append them to the bet_list
    for bet in bets:
        bet_list.append({
            'id': bet.id,
            'match_name': bet.match.name,
            'amount': bet.amount,
            'outcome': bet.outcome,
            'bet_date': bet.bet_date,
            'user_id': bet.user_id,
            'match_id': bet.match_id
        })

    # Return the full bet list after the loop
    return jsonify(bet_list)

# Fetch a Single Bet
@bet_bp.route('/bets/fetch_bet/<int:bet_id>', methods=['GET'])
def get_bet(bet_id):
    bet = Bet.query.get(bet_id)
    if not bet:
        return jsonify({"message": "Bet not found"}), 404
    
    return jsonify({
        'id': bet.id,
        'amount': bet.amount,
        'outcome': bet.outcome,
        'bet_date': bet.bet_date,
        'user_id': bet.user_id,
        'match_id': bet.match_id
    }), 200

# Update a Bet
@bet_bp.route('/bets/<int:bet_id>', methods=['PUT'])
def update_bet(bet_id):
    data = request.get_json()
    bet = Bet.query.get(bet_id)

    if not bet:
        return jsonify({"message": "Bet not found"}), 404

    user_id = data.get('user_id')

    # Check if user_id is provided and matches the bet's user
    if not user_id or bet.user_id != user_id:
        return jsonify({"message": "Unauthorized: You cannot update a bet that doesn't belong to you"}), 403

    # Update fields
    bet.amount = data.get('amount', bet.amount)
    bet.outcome = data.get('outcome', bet.outcome)
    bet.match_id = data.get('match_id', bet.match_id)

    db.session.commit()

    return jsonify({"message": "Bet updated successfully"}), 200

# Delete a Bet
@bet_bp.route('/bets/<int:bet_id>', methods=['DELETE'])
@jwt_required()
def delete_bet(bet_id):
    current_user_id = get_jwt_identity()

    # Query for the bet based on the provided bet_id and the current user's ID
    bet = Bet.query.filter_by(id=bet_id, user_id=current_user_id).first()

    if not bet:
        return jsonify({"message": "Bet not found"}), 404

    # Add the bet amount back to the user's balance if the bet is deleted
    user = User.query.get(bet.user_id)
    user.balance += bet.amount

    # Delete the bet and commit the transaction
    db.session.delete(bet)
    db.session.commit()

    return jsonify({"message": "Bet deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)
