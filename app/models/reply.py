from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Reply(db.Model):
     __tablename__= 'replies'

     if environment == "production":
        __table_args__ = {'schema': SCHEMA}


     id =  db.Column(db.Integer, primary_key=True)
     reply = db.Column(db.String(2000), nullable=False)
     replyUrl = db.Column(db.String(1000), nullable=True)
     dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())
     userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
     postId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")), nullable=False)

     user = db.relationship('User', back_populates='replies')
     posts = db.relationship('Post', back_populates='replies')
     likes = db.relationship('Like', back_populates='replies', cascade='all, delete-orphan')

     def to_dict(self):
         return{
          'id': self.id,
          'reply': self.reply,
          'replyUrl': self.replyUrl,
          'dateCreated': self.dateCreated,
          'postId': self.postId,
          'userId': self.userId,
          'user' : self.user.to_reply_dict(),
          'posts': self.posts.to_dict()
         }

     def to_post_reply_dict(self):
          return{
            'id': self.id,
            'reply': self.reply,
            'replyUrl': self.replyUrl,
            'userId': self.userId
          }

     def to_like_reply_dict(self):
         return{
             'id': self.id,
             'reply': self.reply,
             'replyUrl':self.replyUrl,
             'userId': self.userId,
             'post': self.posts.to_dict()
         }
