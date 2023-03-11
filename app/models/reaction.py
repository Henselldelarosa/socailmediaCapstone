from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Reaction(db.Model):
     __tablename__='reactions'

     if environment == "production":
         __table_args__ = {'schema': SCHEMA}
     id = db.Column(db.Integer, primary_key=True)
     date_created = db.Column(db.DateTime(timezone=True), server_default=func.now())
     user_id = db.Column(db.Integer, db.ForeignKey
                        (add_prefix_for_prod('users.id')), nullable=False)
     # postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
     reply_id = db.Column(db.Integer, db.ForeignKey
                         (add_prefix_for_prod('replies.id')), nullable=False)


     user = db.relationship('User', back_populates = 'reactions')

     # post = db.relationship('Post', back_populates = 'reactions', cascade='all, delete-orphan')

     replies = db.relationship('Reply', back_populates = 'reactions')

     def to_dict(self):
          return {
               'id':self.id,
               # 'postId':self.postId,
               'user_id':self.user_id,
               'reply_id':self.reply_id,
               # 'user': self.user.to_dict()
          }
