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


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# @user_routes.route('/likes/<int:id>')
# @login_required
# def get_user_likes(id):
#     user_likes = Like.query.filter(Like.userId =)
