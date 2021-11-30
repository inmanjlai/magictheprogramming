from app.models import db, Card


# Adds a demo user, you can add other users here if you want
def seed_cards():
    YTP = Card(
        name="Yawgmoth, Thran Physician", 
        type_line="Legendary Creature — Human Cleric",
        oracle_text="Protection from Humans\nPay 1 life, Sacrifice another creature: Put a -1/-1 counter on up to one target creature and draw a card.\n{B}{B}, Discard a card: Proliferate. (Choose any number of permanents and/or players, then give each another counter of each kind already there.)",
        mana_value=4,
        mana_cost="{2}{B}{B}",
        colors="B",
        image_url="https://c1.scryfall.com/file/scryfall-cards/normal/front/8/6/8690cbcc-f8fd-41f7-9e28-e61c12b04014.jpg?1562201785",
        art_crop="https://c1.scryfall.com/file/scryfall-cards/art_crop/front/8/6/8690cbcc-f8fd-41f7-9e28-e61c12b04014.jpg?1562201785"
    )
    
    DR = Card(
        name="Dark Ritual", 
        type_line="Instant",
        oracle_text="Add {B}{B}{B} to your mana pool",
        mana_value=1,
        mana_cost="{B}",
        colors="B",
        image_url="https://c1.scryfall.com/file/scryfall-cards/normal/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg?1628801678",
        art_crop="https://c1.scryfall.com/file/scryfall-cards/art_crop/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg?1628801678"
    )

    KMB = Card(
        name="Krenko, Mob Boss", 
        type_line="Legendary Creature — Goblin Warrior",
        oracle_text="{T}: Create X 1/1 red Goblin creature tokens, where X is the number of Goblins you control.",
        mana_value=4,
        mana_cost="{2}{R}{R}",
        colors="R",
        image_url="https://c1.scryfall.com/file/scryfall-cards/normal/front/c/d/cd9fec9d-23c8-4d35-97c1-9499527198fb.jpg?1601078209",
        art_crop="https://c1.scryfall.com/file/scryfall-cards/art_crop/front/c/d/cd9fec9d-23c8-4d35-97c1-9499527198fb.jpg?1601078209"
    )

    db.session.add(YTP)
    db.session.add(DR)
    db.session.add(KMB)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
