from flask import Blueprint
from app.models import User, Search, db
from flask_login import current_user, login_required
from sqlalchemy import inspect

search_routes = Blueprint('searches', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


#! queries the search
@search_routes.route('/users/<query>', methods=['GET'])
@login_required
def get_searches(query):
    if current_user.is_authenticated:
        wanted_search = Search(search = query, userId = current_user.id)
        db.session.add(wanted_search)
        db.commit()

    results = User.query.filter(User.firstName.contains(query) or User.lastName.contains(query))
    if results:
        return results.to_dict()
    else:
        return {'message': 'No results found'}



#! gets the search that you was looking for
@search_routes.route('/user/<int:id>', methods=['GET'])
@login_required
def get_user_searches(id):
    results = Search.query.filter(Search.userId == id)
    final = {'seach': [result.to_dict() for result in results]}
    return final



#! deletes the search history
@search_routes.route('/', methods=['DELETE'])
@login_required
def clear_search_history():
    searches = Search.query.filter(Search.userId == current_user.id)

    if len(list(searches)) == 0:
        return {'message': 'Your search history is clear'}

    if searches:
        for search in searches:
            db.session.delete(search)
            db.session.commit()
        return {'message': 'Search History is Clear'}


@search_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def clear_single_search(id):
    delete_search = Search.query.filter(Search.userId == current_user and Search.id == id):

    if delete_search:
        db.session.delete(delete_search)
        db.session.commit()
