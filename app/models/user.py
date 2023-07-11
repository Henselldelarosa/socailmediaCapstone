from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


followers = db.Table('follows',
    db.Column('follower_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.Column('followed_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'))),
    db.UniqueConstraint('follower_id', 'followed_id')
)

if environment == "production":
    followers.schema = SCHEMA

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(40), nullable=False)
    lastName = db.Column(db.String(40), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    userUrl = db.Column(db.String(255), default='https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg', nullable=True)
    profile_url = db.Column(db.String(255), default='https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg', nullable=True)
    phone_number = db.Column(db.String(255), default='N/A')
    address = db.Column(db.String(255), default='N/A')
    country = db.Column(db.String(255), default='N/A')
    relationship = db.Column(db.String(255), default='Single')

    posts = db.relationship('Post', back_populates='user')
    replies = db.relationship('Reply', back_populates='user')
    likes = db.relationship('Like', back_populates='user')
    searches = db.relationship('Search', back_populates='user')
    images = db.relationship('Image', back_populates='user')
    followed = db.relationship(
        'User', secondary=followers,
        primaryjoin=(followers.c.followed_id == id),
        secondaryjoin=(followers.c.follower_id == id),
        backref=db.backref('followers', lazy='dynamic'), lazy='dynamic')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'userUrl': self.userUrl,
            'profile_url': self.profile_url,
            'phone_number': self.phone_number,
            'address': self.address,
            'country': self.country,
            'relationship': self.relationship,
            'followers': [{'userId': follower.id, 'firstName': follower.firstName, 'lastName': follower.lastName, 'userUrl': follower.userUrl} for follower in self.followers],
            'following': [{'userId': follower.id, 'firstName': follower.firstName, 'lastName': follower.lastName, 'userUrl': follower.userUrl} for follower in self.followers],
        }

    def edit_user_dict(self):
        return{
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'email': self.email,
            'userUrl': self.userUrl,
            'profile_url': self.profile_url,
            'phone_number': self.phone_number,
            'address': self.address,
            'country': self.country,
            'relationship': self.relationship,
        }

    def follow(self, user):
        if not self.is_following(user):
            self.followed.append(user)
            return self

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)
            return self

    def is_following(self, user):
        return self.followed.filter(followers.c.followed_id == user.id).count() > 0

    def to_post_dict(self):
        return{
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'userUrl': self.userUrl
        }


    def to_reply_dict(self):
        return{
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'userUrl': self.userUrl
        }

    def to_like_dict(self):
        return{
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'userUrl': self.userUrl
        }
