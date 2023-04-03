from curses import flash
from flask import Blueprint, request
from app.models import Reply,Like, db

from sqlalchemy import inspect
from flask_login import current_user, login_required


likes_routes = Blueprint('likes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@likes_routes.route('/replies/<int:id>', methods=['GET'])
@login_required
def add_like(id):
    reply = Reply.query.filter(Reply.id == id).first()
    like = Like.query.filter(Like.userId == current_user.id, Like.replyId == id).first()

    if not reply:
        return {'Message':'Reply does not exist'}

    elif like:
        db.session.delete(like)
        db.session.commit()

    else:
        like = Like(userId=current_user.id, replyId=id)
        db.session.add(like)
        db.session.commit()

    return like.to_dict()
