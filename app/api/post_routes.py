from flask import Blueprint, request
from app.models import Post, Reply, db
from app.forms import PostForm
from sqlalchemy import inspect
from flask_login import current_user, login_required

posts_routes = Blueprint('posts', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages



# get all post
@posts_routes.route('/', methods=['GET'])
def get_all_post():
    all_posts = db.session.query(Post).all()
    return {'posts': [post.to_dict() for post in all_posts]}

# get post by Id
@posts_routes.route("/<int:id>", methods=["GET"])
@login_required
def get_post_by_id(id):
    wanted_post = Post.query.get(id)
    return wanted_post.to_dict()



#create post
@posts_routes.route('/', methods=['POST'])
@login_required
def create_post():
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
       desired_post = Post(
        post = form.data['post'],
        postUrl = form.data['postUrl'],
        userId = current_user.id
       )

       db.session.add(desired_post)
       db.session.commit()
       return desired_post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# edit a post
@posts_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_post(id):

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        desired_post = Post.query.get(id)
        if desired_post.userId == current_user.id:
           desired_post.post = form.data['post']
           desired_post.postUrl = form.data['postUrl']

           db.session.commit()

           return desired_post.to_dict()
        else:
            return {'message': 'You are not allowed to edit this post'}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# delete a post
@posts_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    desired_post = Post.query.get(id)
    if desired_post.userId == current_user.id:
        db.session.delete(desired_post)
        db.session.commit()
        return {'message': 'This post was successfully deleted'}
    else:
        return {'message': 'This post doesnt belong to you'}
