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

# @likes_routes.route('/', methods=['GET'])
# @login_required
# def get_all_likes():
#     all_likes = db.sessio

# @likes_routes.route('/replies/<int:id>', methods=['GET'])
# @login_required
# def add_like(id):
#     # reply = Reply.query.filter(Reply.id == id).first()
#     like = Like.query.filter(Like.userId == current_user.id, Like.replyId == id).first()

#     if like:
#         db.session.delete(like)
#         db.session.commit()

#     else:
#         like = Like(userId=current_user.id, replyId=id)
#         db.session.add(like)
#         db.session.commit()

#     return like.to_dict()


@likes_routes.route('/replies/<int:id>', methods=['POST'])
@login_required
def post_upvote_likes(id):

    reaction_check = Like.query.filter(
        Like.replyId ==id,
        Like.userId == current_user.id
        ).first()
    if reaction_check:
        db.session.delete(reaction_check)
        db.session.commit()
        return {'message':'Reaction deleted'}
    else:
        new_vote = Like(
            replyId = id,
            userId = current_user.id)

        db.session.add(new_vote)
        db.session.commit()
        return new_vote.to_dict()

@likes_routes.route('/replies/<int:id>', methods=['GET'])
@login_required
def get_reply_likes(id):
    # reply_like = Like.query.filter(
    #     Like.replyId == id,
    #     Like.userId == current_user.id
    # ).first()
    reply_like = Like.query.filter(Like.userId == current_user.id and Reply.id == id)
    if reply_like:
     return {'likes': [like.to_dict() for like in reply_like]}

    else:
        return {'message': 'No reactions'}
