from app.models import db, Decklist, Card
from random import randint


# Adds a demo user, you can add other users here if you want
def get_random_id():
    return randint(1, 24133)

def seed_decklists():
    for j in range(1, 9):
        for i in range(1, 100):
            card = Card.query.get(get_random_id())
            decklist_already_exists = Decklist.query.filter((Decklist.deck_id == j) & (Decklist.card_id == card.id)).first()
            if decklist_already_exists:
                card = Card.query.get(get_random_id())
            decklist = Decklist(
                deck_id=j,
                card_id=card.id,
                quantity=1
            )
            db.session.add(decklist)
            db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_decklists():
    db.session.execute('TRUNCATE decklists RESTART IDENTITY CASCADE;')
    db.session.commit()
