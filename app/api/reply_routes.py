from flask import Blueprint, request
from app.models import Post, Reply, db, Image
from app.forms import ReplyForm, ImageForm
from sqlalchemy import inspect
from flask_login import current_user, login_required
from app.aws_helpers import (upload_file_to_s3, get_unique_filename)



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
    all_reply = Reply.query.filter(Reply.postId == str(id))
    return {'replies': [reply.to_dict() for reply in all_reply]}


# create reply
@replies_routes.route('/posts/<int:id>', methods=['POST'])
@login_required
def create_reply(id):
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        created_reply = Reply(
            reply = form.data['reply'],
            replyUrl = form.data['replyUrl'],
            postId = id,
            userId = current_user.id
            )

        db.session.add(created_reply)
        db.session.commit()
        return created_reply.to_dict()

#Update reply
@replies_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_reply(id):
    form = ReplyForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    wanted_reply = Reply.query.get(id)
    if wanted_reply.userId == current_user.id:
       if form.validate_on_submit():
           wanted_reply.reply = form.data['reply']
           wanted_reply.replyUrl = form.data['replyUrl']
           db.session.commit()
           return wanted_reply.to_dict()
    else:
        return {'message': 'You are not allowed to edit this post'}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete reply
@replies_routes.route('/posts/<int:id>', methods=['DELETE'])
@login_required
def delete_reply(id):
    wanted_reply= Reply.query.get(id)
    if wanted_reply.userId == current_user.id:
        db.session.delete(wanted_reply)
        db.session.commit()
        return {'message': 'This reply was successfully deleted'}
    else:
        return {'message': 'This reply doesnt belong to you'}
