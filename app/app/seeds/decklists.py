from app.models import db, Decklist


# Adds a demo user, you can add other users here if you want
def seed_decklists():
    one = Decklist(
        deck_id=1, 
        card_id=1,
        quantity=1,
        commander=True
    )
    two = Decklist(
        deck_id=1, 
        card_id=2,
        quantity=1,
    )
    two = Decklist(
        deck_id=2, 
        card_id=3,
        quantity=1,
        commander=True
    )

    db.session.add(one)
    db.session.add(two)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_decklists():
    db.session.execute('TRUNCATE decklists RESTART IDENTITY CASCADE;')
    db.session.commit()
