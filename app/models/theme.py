# from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Theme(db.Model):
#   __tablename__ = 'themes'

#   if environment == 'production':
#     __table_args__ = {'schema':SCHEMA}

#   id = db.Column(db.integer, primary_key=True)
#   userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#   theme = db.Column(db.String(255), nullable=True)

#   user = db.relationship('User', back_populates = 'themes')

#   def to_dict(self):
#     return{
#       'id': self.id,
#       'userId': self.userId,
#       'user': self.user.to_dict()
#     }
