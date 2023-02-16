from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Reply

def valid_picture(form, field):
    # checks if the picture is a .png or .jpg
    picture_url = field.data
    if len(picture_url):
        if picture_url.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tif', '.tiff')):
            return {'message': 'image added successfully'}
        else:
            raise ValidationError("Not a valid image.")
    else:
        pass


class ReplyForm(FlaskForm):
      reply = StringField('reply', validators=[DataRequired()])
      replyUrl = StringField('replyUrl', validators=[valid_picture])
