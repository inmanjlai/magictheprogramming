from .db import db

class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    format = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(10000), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    owner = db.relationship("User", backref="decks")

    def to_dict(self):
        return {
            'name': self.name,
            'format': self.format,
            'description': self.description,
            'owner': self.owner.to_dict() 
        }