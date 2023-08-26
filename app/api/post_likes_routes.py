from curses import flash
from flask import Blueprint, request
from app.models import Post, PostLike, db

from sqlalchemy import inspect
from flask_login import current_user, login_required

postlikes_routes = Blueprint('postlikes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@postlikes_routes.route('/posts/<int:id>',methods=['GET'])
@login_required
def get_post_likes(id):

    post_like = PostLike.query.filter(PostLike.user_id == current_user.id and Post.id == id)

    if post_like:
        return {'post_likes': [postLike.to_dict() for postLike in post_like]}

    else:
        return {'message': 'No reations'}


@postlikes_routes.route('/posts/<int:id>', methods=['POST'])
@login_required
def post_upvote_likes(id):

    reaction_check = PostLike.query.filter(
        PostLike.post_id ==id,
        PostLike.user_id == current_user.id
        ).first()
    if reaction_check:
        deleted_like = reaction_check.to_dict()
        db.session.delete(reaction_check)
        db.session.commit()
        return deleted_like
    else:
        new_vote = PostLike(
            post_id = id,
            user_id = current_user.id)

        db.session.add(new_vote)
        db.session.commit()
        return new_vote.to_dict()
