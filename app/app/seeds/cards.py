from app.models import db, Card


# Adds a demo user, you can add other users here if you want
def seed_cards():
    DR = Card(
        name="Dark Ritual", 
        type_line="Instant",
        oracle_text="Add {B}{B}{B} to your mana pool",
        mana_value=1,
        mana_cost="{B}",
        colors="B",
        image_url="https://c1.scryfall.com/file/scryfall-cards/normal/front/9/5/95f27eeb-6f14-4db3-adb9-9be5ed76b34b.jpg?1628801678"
    )

    db.session.add(DR)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
