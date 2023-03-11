from flask import Blueprint
from app.models import Reaction, db
from flask_login import current_user, login_required
from sqlalchemy import inspect


reaction_routes = Blueprint('reactions', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@reaction_routes.route('/replies/<int:id>', methods=['GETS'])
@login_required
def get_reply_reactions(id):
    reply_reactions = Reaction.query.filter(
        Reaction.reply_id == id
    ).first()
    return reply_reactions.to_dict()

@reaction_routes.route('/replies/<int:id>/up_vote', methods=['POST'])
@login_required
def post_upvote_reaction(id):

    reaction_check = Reaction.query.filter(
        Reaction.reply_id ==id,
        Reaction.user_id == current_user.id
        ).first()

    if reaction_check:
        if reaction_check.up_vote == True:
            reaction_check.up_vote == False
            db.session.delete(reaction_check)
