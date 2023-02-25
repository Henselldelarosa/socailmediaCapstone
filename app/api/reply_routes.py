from flask import Blueprint, request
from app.models import Post, Reply, db
from app.forms import ReplyForm
from sqlalchemy import inspect
from flask_login import current_user, login_required


replies_routes = Blueprint('replies', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


# Get all Replies
@replies_routes.route('/posts/<int:id>', methods=['GET'])
def get_all_reply(id):
    all_reply = db.session.query(Reply).filter(Reply.postId.like(id))
    return {'replies': [reply.to_dict() for reply in all_reply]}
