from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class PostLike(db.Model):
  __tablename__ = 'post_likes'

  if environment == "production":
        __table_args__ = {'schema': SCHEMA}

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
  post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)
  dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())
  user = db.relationship('User', back_populates = 'post_likes')
  posts = db.relationship('Post', back_populates = 'post_likes')

  def to_dict(self):
      return{
        'id': self.id,
        'user_id': self.user_id,
        'post_id': self.post_id,
        'dateCreated':self.dateCreated,
        'post': self.posts.to_like_post_dict(),
        'user':self.user.to_post_like_dict()
      }
