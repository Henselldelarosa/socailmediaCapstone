from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import User

class UserForm(FlaskForm):
    firstName = StringField('firstname', validators=[DataRequired()])
    lastName = StringField('lastName', validators=[DataRequired()])
    email = StringField('email', validators=[DataRequired()])
    userUrl = StringField('userUrl')
    profile_url = StringField('profile_url')
    phone_number = StringField('phone_number')
    address = StringField('phone_number')
    country = StringField('country')
    relationship = StringField('relationship')
