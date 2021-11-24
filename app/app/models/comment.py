from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey("decks.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    content = db.Column(db.String(10000), nullable=False)

    user = db.relationship("User", backref="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'deck_id': self.deck_id,
            'user': self.user.to_dict(),
            'content': self.content,
        }
