from app.models import db, Deck


# Adds a demo user, you can add other users here if you want
def seed_decks():
    MBA = Deck(
        name='Mono Black Aristocrats', 
        format='Commander', 
        description='Mono Black Aristocrats is an EDH deck header by Yawgmoth, Thran Physician. The main theme is based around sacrificing your own permanents to fuel your value engines. Usual wincons include Gray Merchant of Asphodel, Blood Artist and Torment of Hailfire.',
        owner_id=1
    )

    MRG = Deck(
        name='Mono Red Goblins',
        format='Modern',
        description='Krenko\'s Infinite Combos',
        owner_id=2
    )

    db.session.add(MBA)
    db.session.add(MRG)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
