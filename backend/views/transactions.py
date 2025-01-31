from models import db, Transaction, User
from flask import jsonify, request, Blueprint

transaction_bp = Blueprint("transaction_bp", __name__)



# TRANSACTIONS
# Create transaction
@transaction_bp.route('/transactions/add', methods=['POST'])
def create_transaction():
    data = request.get_json()

    user_id = data.get('user_id')
    amount = data.get('amount')
    transaction_type = data.get('transaction_type')  # "deposit" or "withdrawal"

    # Check if user exists
    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404

    # Convert amount to float
    try:
        amount = float(amount)
    except ValueError:
        return jsonify({"Error": "Invalid amount"}), 400

    # Log the amount and user balance for debugging
    print(f"User ID: {user_id}, Amount: {amount}, Current Balance: {user.balance}")

    # Handle deposit or withdrawal
    if transaction_type == "deposit":
        user.balance += amount  # Add the deposit amount to balance
        print(f"Updated Balance (Deposit): {user.balance}")  # Debugging line

        # Create a new transaction record
        new_transaction = Transaction(
            user_id=user_id,
            amount=amount,
            transaction_type=transaction_type,
            status="completed"
        )
        db.session.add(new_transaction)

        # Commit the transaction and update user balance
        db.session.commit()
        print(f"Transaction ID: {new_transaction.id} committed")  # Debugging line

        return jsonify({
            "New Balance": user.balance,
            "Success": "Deposit successful"
        }), 201

    elif transaction_type == "withdrawal":
        if user.balance < amount:
            return jsonify({"Error": "Insufficient balance"}), 400
        user.balance -= amount  # Subtract the withdrawal amount from balance
        print(f"Updated Balance (Withdrawal): {user.balance}")  # Debugging line

        # Create a new transaction record
        new_transaction = Transaction(
            user_id=user_id,
            amount=amount,
            transaction_type=transaction_type,
            status="completed"
        )
        db.session.add(new_transaction)

        # Commit the transaction and update user balance
        db.session.commit()
        print(f"Transaction ID: {new_transaction.id} committed")  # Debugging line

        return jsonify({
            "New Balance": user.balance,
            "Success": "Withdrawal successful"
        }), 201

    else:
        return jsonify({"Error": "Invalid transaction type"}), 400

@transaction_bp.route('/transactions/<int:user_id>', methods=['GET'])
def get_user_transactions(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"Error": "User not found"}), 404

    # Fetch all transactions for the user
    transactions = Transaction.query.filter_by(user_id=user_id).all()

    # If no transactions exist, return an empty list
    if not transactions:
        return jsonify({"transactions": []}), 200

    # Prepare a list of transactions with the required fields
    transactions_list = [{
        'id': transaction.id,
        'amount': transaction.amount,
        'transaction_date': transaction.transaction_date.isoformat(),  # Format date to ISO 8601
        'status': transaction.status,
        'user': {"id":transaction.user.id, "username": transaction.user.username, "email": transaction.user.email}
    } for transaction in transactions]

    return jsonify({"transactions": transactions_list}), 200


# fetch single transaction
@transaction_bp.route('/transactions/<int:transaction_id>', methods=['GET'])
def get_transaction(transaction_id):

    data = request.get_json()
    user_id = data.get('user_id')  # Get the user_id from the request

    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({"Error": "Transaction not found"}), 404

    if transaction.user_id != user_id:
        return jsonify({"Error": "Unauthorized: You cannot view a transaction that doesn't belong to you"}), 403


    return jsonify({
        'id': transaction.id,
        'amount': transaction.amount,
        'transaction_date': transaction.transaction_date,
        'status': transaction.status,
        'user_id': transaction.user_id
    }), 200

# Update a transaction
@transaction_bp.route('/transactions/<int:transaction_id>/status', methods=['PUT'])
def update_transaction_status(transaction_id):
    data = request.get_json()
    status = data.get('status')
    user_id = data.get('user_id')  # Get the user_id from the request


    # Ensure the status is either 'confirmed' or 'cancelled'
    if status not in ['confirmed', 'cancelled']:
        return jsonify({"Error": "Invalid status"}), 400

    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({"Error": "Transaction not found"}), 404

    # Check if the user_id matches the transaction's user_id
    if transaction.user_id != user_id:
        return jsonify({"Error": "Unauthorized: You cannot update a transaction that doesn't belong to you"}), 403


    transaction.status = status
    db.session.commit()

    return jsonify({
        "Success": "Transaction status updated",
        "Transaction ID": transaction.id,
        "New Status": status
    }), 200

# Delete a transaction
@transaction_bp.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction(transaction_id):
    data = request.get_json()
    user_id = data.get('user_id') 

    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        return jsonify({"Error": "Transaction not found"}), 404


    # Ensure the transaction belongs to the user making the request
    if transaction.user_id != user_id:
        return jsonify({"Error": "Unauthorized: You cannot delete a transaction that doesn't belong to you"}), 403


    user = User.query.get(transaction.user_id)

    # If it's a withdrawal or deposit, reverse the balance change
    if transaction.status == 'confirmed':
        if transaction.amount < 0:  # If it was a withdrawal
            user.balance += abs(transaction.amount)
        else:  # If it was a deposit
            user.balance -= transaction.amount

    db.session.delete(transaction)
    db.session.commit()

    return jsonify({
        "Success": "Transaction deleted successfully",
        "Transaction ID": transaction.id,
        "Reversed Balance": user.balance
    }), 200

if __name__ == '__main__':
    app.run(debug=True)

