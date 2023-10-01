from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func

class Story(db.Model):
   __tablename__='stories'

   if environment == "production":
        __table_args__ = {'schema': SCHEMA}

   id = db.Column(db.Integer, primary_key=True)
   story = db.Column(db.String(500))
   storyUrl = db.Column(db.String(1000), nullable=True)
   dateCreated = db.Column(db.DateTime(timezone=True), server_default=func.now())
   userId = db.Column(db.Integer,db.ForeignKey
                       (add_prefix_for_prod("users.id")), nullable=False)

   user = db.relationship('User', back_populates='stories')

   def to_dict(self):
       return{
           'id':self.id,
           'story': self.story,
           'storyUrl': self.storyUrl,
           'dateCreated': self.dateCreated,
           'userId': self.userId,
           'user': self.user.to_post_dict()
       }
