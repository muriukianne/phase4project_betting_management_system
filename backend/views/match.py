from models import db, Match, Bet
from flask import jsonify, request, Blueprint

match_bp = Blueprint("match_bp", __name__)


# MATCHES
# CREATE a match
@match_bp.route('/matches/add_match', methods=['POST'])
def create_match():
    data = request.get_json()
    name = data.get('name')
    odds_team_a = data.get('odds_team_a')
    odds_team_b = data.get('odds_team_b')
    outcome = data.get('outcome', 'pending') 

    new_match = Match(name=name, odds_team_a=odds_team_a, odds_team_b=odds_team_b, outcome = outcome)
    db.session.add(new_match)
    db.session.commit()

    return jsonify({'message': 'Match created', 'match': new_match.id}), 201

# READ a match by ID
@match_bp.route('/matches/fetch_match/<int:match_id>', methods=['GET'])
def get_match(match_id):
    match = Match.query.get_or_404(match_id)
    return jsonify({
        'id': match.id,
        'name': match.name,
        'odds_team_a': match.odds_team_a,
        'odds_team_b': match.odds_team_b,
        'outcome': match.outcome
   
    })

# Fetch all Matches
@match_bp.route("/matches", methods=["GET"])
def fetch_matches():
    matches = Match.query.all()  # Fetch all matches from the database
    match_list = []

    # Loop through all matches and append them to the match_list
    for match in matches:
        match_list.append({
            'id': match.id,
            'name': match.name,
            'odds_team_a': match.odds_team_a,
            'odds_team_b': match.odds_team_b
        })

    # Return the list of matches
    return jsonify(match_list)


# UPDATE a match
@match_bp.route('/matches/update_match/<int:match_id>', methods=['PUT'])
def update_match(match_id):
    match = Match.query.get_or_404(match_id)
    data = request.get_json()

    match.name = data.get('name', match.name)
    match.odds_team_a = data.get('odds_team_a', match.odds_team_a)
    match.odds_team_b = data.get('odds_team_b', match.odds_team_b)

    db.session.commit()

    return jsonify({'message': 'Match updated', 'match': match.id})

# DELETE a match
@match_bp.route('/matches/delete_match/<int:match_id>', methods=['DELETE'])
def delete_match(match_id):
    match = Match.query.get_or_404(match_id)
    db.session.delete(match)
    db.session.commit()

    return jsonify({'message': 'Match deleted'}), 200

if __name__ == '__main__':
    app.run(debug=True)


