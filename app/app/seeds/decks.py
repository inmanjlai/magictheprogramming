from app.models import db, Deck
from random import randint


# Adds a demo user, you can add other users here if you want

def get_random_id():
    return randint(1, 24133)

def seed_decks():
    one = Deck(
        name='Mono Black Aristocrats', 
        description='Mono Black Aristocrats is an EDH deck header by Yawgmoth, Thran Physician. The main theme is based around sacrificing your own permanents to fuel your value engines. Usual wincons include Gray Merchant of Asphodel, Blood Artist and Torment of Hailfire.',
        owner_id=1,
        commander_id=1
    )

    two = Deck(
        name='Mono Red Goblins',
        description='Krenko\'s Infinite Combos',
        owner_id=2,
        private=False,
        commander_id=3
    )
    
    three = Deck(
        name='Mono Green Humans',
        description='Basel blows, so he decided to make a human tribal deck to act like he has friends in real life',
        owner_id=2,
        private=False,
        commander_id=get_random_id()
    )
    four = Deck(
        name='Mono White Cats',
        description='Ham',
        owner_id=1,
        private=False,
        commander_id=get_random_id()
    )
    five = Deck(
        name='Mono Blue Fish',
        description='Mole is a fish, its true',
        owner_id=1,
        private=False,
        commander_id=get_random_id()
    )
    six = Deck(
        name='Red Blue White Amoor\'s Flag',
        description='Amer is a patriot, its true',
        owner_id=1,
        private=False,
        commander_id=get_random_id()
    )
    seven = Deck(
        name='Golgari Reanimator',
        description='A green-black reanimator deck built around meren\'s experience counters. You end up killing your own creatures for lots of value',
        owner_id=3,
        private=False,
        commander_id=get_random_id()
    )
    eight = Deck(
        name='Chicken Tribal',
        description='Dajjaj in my garage',
        owner_id=3,
        private=False,
        commander_id=get_random_id()
    )

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.add(seven)
    db.session.add(eight)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_decks():
    db.session.execute('TRUNCATE decks RESTART IDENTITY CASCADE;')
    db.session.commit()
