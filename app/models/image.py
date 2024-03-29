from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    url = db.Column(db.String, nullable=False)

    user = db.relationship("User", back_populates="images")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user.id,
            'url':self.url
        }
