from .db import db
import datetime

decklists = db.Table(
    "decklists",
    db.Column(
        "deck_id", 
        db.Integer, 
        db.ForeignKey("decks.id"), 
        primary_key=True
    ),
    db.Column(
        "card_id", 
        db.Integer, 
        db.ForeignKey("cards.id"), 
        primary_key=True
    )
)

class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    format = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(10000), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.String(2000), default=datetime.datetime.now().strftime('%x'))

    owner = db.relationship("User", backref="decks")
    decklist = db.relationship("Card", secondary=decklists, backref="decks")

    def to_dict(self):
        return {
            'name': self.name,
            'format': self.format,
            'description': self.description,
            'owner': self.owner.to_dict(),
            'decklist': [card for card in self.decklist]
        }