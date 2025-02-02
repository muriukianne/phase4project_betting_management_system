from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(512), nullable=False)
    balance = db.Column(db.Float, nullable=True, default=0.0)

    # Define backref to create 'bets' as an attribute for accessing bets from the User model
    bets = db.relationship('Bet', backref='bet_user', lazy=True)
    transactions = db.relationship('Transaction', backref='user', lazy=True, cascade="all, delete")

# Bet Model
class Bet(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    match_id = db.Column(db.Integer, db.ForeignKey('match.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    outcome = db.Column(db.String, nullable=False)
    bet_date = db.Column(db.DateTime, nullable=False)

    # Relationship to the Match model
    match = db.relationship('Match', backref='bet_details', lazy=True) 

    # Method to calculate winnings
    def calculate_winnings(self):
        match = Match.query.get(self.match_id)
        user = User.query.get(self.user_id)

        if not match or not user:
            return {"Error": "Match or User not found"}, 404

        # If the outcome is 'team_a_win'
        if self.outcome == "team_a_win":
            winnings = self.amount * match.odds_team_a
        # If the outcome is 'team_b_win'
        elif self.outcome == "team_b_win":
            winnings = self.amount * match.odds_team_b
        # If the outcome is something else, like a loss or draw
        else:
            winnings = -self.amount  # Deduct the bet amount from the user balance

        # Update the user's balance
        user.balance += winnings

        # Commit the changes to the database
        db.session.commit()

        return winnings  # Return the winnings (or loss)

# Transaction Model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    transaction_date = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(50), default='confirmed')
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    transaction_type = db.Column(db.String(50), nullable=False)  # Add this column for transaction type (deposit/withdrawal)


# Match Model
class Match(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    odds_team_a = db.Column(db.Float, nullable=False)
    odds_team_b = db.Column(db.Float, nullable=False) 
    outcome = db.Column(db.String(50), nullable=True) 

    bets = db.relationship('Bet', backref='match_bets', lazy=True)  # Change backref name to 'match_bets'

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)

