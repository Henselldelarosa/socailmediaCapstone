from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Post


def valid_picture(form, field):
    picture_url = field.data
    if len(picture_url):
      if not picture_url.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tif', '.tiff')):
            raise ValidationError("Not a valid image.")

class PostForm(FlaskForm):
      post = StringField('post', validators=[DataRequired()])
      postUrl = StringField('postUrl', validators=[valid_picture])
