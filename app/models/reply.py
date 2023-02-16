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

     def to_dic(self):
         return{
          'id': self.id,
          'reply': self.reply,
          'replyUrl': self.replyUrl,
          'dateCreated': self.dateCreated,
          'postId': self.postId,
          'userId': self.userId
         }
