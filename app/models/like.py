from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Like(db.Model):
    __tablename__ = 'likes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    replyId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('replies.id')), nullable=False)

    user = db.relationship('User', back_populates = 'likes')
    replies = db.relationship('Reply', back_populates = 'likes')

    def to_dict(self):
        return {
          'id': self.id,
          'userId': self.userId,
          'replyId': self.replyId,
          'reply':self.replies.to_like_reply_dict(),
          'user':self.user.to_like_dict()
        }
