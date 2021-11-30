from .db import db

class Decklist(db.Model):
    __tablename__ = 'decklists'

    deck_id = db.Column(db.Integer, db.ForeignKey("decks.id"), primary_key=True, nullable=False)
    card_id = db.Column(db.Integer, db.ForeignKey("cards.id"), primary_key=True, nullable=False)
    quantity = db.Column(db.Integer, default=1)
    commander = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            'deck_id': self.deck_id,
            'card_id': self.card_id,
            'quantity': self.quantity,
            'commander': self.commander
        }

    