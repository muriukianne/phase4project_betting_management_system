from models import db, User, Bet, Transaction
from flask import jsonify, request, Blueprint
from werkzeug.security import generate_password_hash
from flask_jwt_extended import  jwt_required, get_jwt_identity, get_jwt

user_bp = Blueprint("user_bp", __name__)


# USER
# Add/Create User
@user_bp.route("/users/add_user", methods = ["POST"])

def add_users():
    data = request.get_json()
    username = data ["username"]
    email = data ["email"]
    password = generate_password_hash(data ["password"])

    check_username = User.query.filter_by(username = username).first ()
    check_email = User.query.filter_by(email = email).first()

    if check_username or check_email:
        return jsonify ({"error": "Username/Email already exists"}),200

    print ("Username",check_username)
    print ("Email",check_email)

    
    new_user = User(username = username, email = email, password = password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"success": "User added successfully"}), 201

#Read /Fetch all Users 
@user_bp.route("/users/fetch_users", methods = ["GET"])
def fetch_users():
    users = User.query.all()
    users_list = []

    for user in users:
        users_list.append({
            "id" : user.id,
            "username" : user.username,
            "email" : user.email,
            "password" : user.password,
             "bets": [{
                "id": bet.id,
                "amount": bet.amount,
                "outcome": bet.outcome,
                "bet_date": bet.bet_date,
                "match_id": bet.match_id,
                "match_name": bet.match.name
            } for bet in user.bets] 

        })

    return jsonify(users_list)

# Read / Fetch Single User 
@user_bp.route("/users/single_user/<int:user_id>", methods = ["GET"])
def fetch_single_user (user_id):

    user = User.query.get(user_id)
    if user:
        return jsonify({
            "id" : user.id,
            "username" : user.username,
            "email" : user.email,
            "password" : user.password

        }),200

    else :
        return jsonify({ "Error" : "User not found"}), 404

# Update User
@user_bp.route("/users/update_user/<int:user_id>", methods = ["PATCH"])
def update_user(user_id):

    user = User.query.get(user_id)

    if user:
        data = request.get_json()
        username = data.get("username" , user.username)
        email = data.get("email" , user.email)
        password = data.get("password" , user.password)
        new_password = data.get("new_password", None)

        check_username = User.query.filter_by(username = username and id != user.id).first()
        check_email = User.query.filter_by(email = email and id != user.id).first()

        if check_username or check_email:
            return ksonify({"Error" : "Username / email already exists"}), 200

        if new_password:
            user.password = new_password 
            db.session.commit()
            return jsonify({"success": ["Password updated successfully"]}), 200
        

        
        user.username=username
        user.email=email
        if password != user.password:
            user.password = password
        db.session.commit()   
        return jsonify({"success":["User updated successfully"]}), 201

    else:
        return jsonify({"Error":["User doesn't exists"]}), 200

#Delete Users
@user_bp.route("/users/delete_user/<int:user_id>", methods=["DELETE"])
def delete_users(user_id):
    user = User.query.get(user_id)

    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"success": ["User deleted successfully"]}), 200
    else:
        return jsonify({"error": ["The user you are trying to delete doesn't exist"]}), 200

if __name__ == '__main__':
    app.run(debug=True)

