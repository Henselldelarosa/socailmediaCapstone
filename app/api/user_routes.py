from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db, Like

user_routes = Blueprint('users', __name__)


@user_routes.route('/',methods=['GET'])
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = db.session.query(User).all()
    print(users, '----------------------------------')
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    return user.to_dict()


