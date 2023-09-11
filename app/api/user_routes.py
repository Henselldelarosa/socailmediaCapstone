from flask import Blueprint, jsonify, request
from app.models import User, db, Like
from app.forms import UserForm
from sqlalchemy import inspect
from flask_login import current_user, login_user, logout_user, login_required


user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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
    return wanted_user.to_dict()
    """
    Query for a user by id and returns that user in a dictionary
    """
    # return user.to_dict()

@user_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_user(id):

    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        wanted_user = User.query.get(id)
        if wanted_user.id == current_user.id:
            wanted_user.firstName = form.data['firstName']
            wanted_user.lastName = form.data['lastName']
            wanted_user.email = form.data['email']
            wanted_user.userUrl = form.data['userUrl']
            wanted_user.profile_url = form.data['profile_url']
            wanted_user.phone_number = form.data['phone_number']
            wanted_user.address = form.data['address']
            wanted_user.country = form.data['country']
            wanted_user.relationship = form.data['relationship']

            db.session.commit()
            return wanted_user.to_dict()

        else:
            return {'message': 'You are not allowed to edit this post'}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400
