from .db import db

class Card(db.Model):
    __tablename__ = 'cards'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(3000), nullable=False)
    type_line = db.Column(db.String(80), nullable=False)
    oracle_text = db.Column(db.String(4000), nullable=True)
    mana_value = db.Column(db.Integer, nullable=False)
    mana_cost = db.Column(db.String(400), nullable=True)
    colors = db.Column(db.String(100), nullable=False)
    image_url = db.Column(db.String(6000), nullable=False)
    art_crop = db.Column(db.String(6000), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'type_line': self.type_line,
            'oracle_text': self.oracle_text,
            'mana_value': self.mana_value,
            'mana_cost': self.mana_cost,
            'colors': self.colors,
            'image_url': self.image_url,
            'art_crop': self.art_crop,
        }