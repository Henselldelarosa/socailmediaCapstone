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
    return {'users': [user.to_dict() for user in users]}

# get user by id
@user_routes.route('/<int:id>', methods=['GET'])
@login_required
def user(id):

    wanted_user = User.query.get(id)
    print(wanted_user, 'fsdfsdfsdf')
    return wanted_user.to_dict()
    """
    Query for a user by id and returns that user in a dictionary
    """
    # return user.to_dict()
