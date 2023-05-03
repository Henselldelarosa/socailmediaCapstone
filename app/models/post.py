from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Post(db.Model):
    __tablename__= 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    post = db.Column(db.String(1000), nullable=False)
    postUrl = db.Column(db.String(1000), nullable=True)
    dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())
    userId = db.Column(db.Integer,db.ForeignKey
                       (add_prefix_for_prod("users.id")), nullable=False)


    user = db.relationship('User', back_populates='posts')
    replies = db.relationship('Reply', back_populates='posts', cascade='all, delete-orphan')

    def to_dict(self):
        return {
          'id':self.id,
          'post':self.post,
          'postUrl':self.postUrl,
          'dateCreated':self.dateCreated,
          'userId':self.userId,
          'user':self.user.to_post_dict(),
        }
