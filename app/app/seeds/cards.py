from app.models import db, Card
import json
from colors import *

file = open('bulk_data.json')
bulk_data = json.load(file)




# Adds a demo user, you can add other users here if you want
def seed_cards():

    for card in bulk_data:

        if 'card_faces' in card:
            if "Token" in card['card_faces'][0]['type_line']:
                continue

            if 'colors' in card:

                new_card = Card(
                    name=card['card_faces'][0]['name'],
                    type_line=card['card_faces'][0]['type_line'],
                    oracle_text=card['card_faces'][0]['oracle_text'],
                    mana_value=card['cmc'],
                    mana_cost=card['card_faces'][0]['mana_cost'],
                    colors=card['colors'],
                    image_url=card['image_uris']['normal'],
                    art_crop=card['image_uris']['art_crop']
                )
                db.session.add(new_card)
                db.session.commit()
                continue

            

            new_card = Card(
                name=card['card_faces'][0]['name'],
                type_line=card['card_faces'][0]['type_line'],
                oracle_text=card['card_faces'][0]['oracle_text'],
                mana_value=card['cmc'],
                mana_cost=card['card_faces'][0]['mana_cost'],
                colors=card['card_faces'][0]['colors'],
                image_url=card['card_faces'][0]['image_uris']['normal'],
                art_crop=card['card_faces'][0]['image_uris']['art_crop']
            )
            db.session.add(new_card)
            db.session.commit()
        else:
            if "Token" in card['type_line']:
                continue

            new_card = Card(
                name=card['name'],
                type_line=card['type_line'],
                oracle_text=card['oracle_text'],
                mana_value=card['cmc'],
                mana_cost=card['mana_cost'],
                colors=card['colors'],
                image_url=card['image_uris']['normal'],
                art_crop=card['image_uris']['art_crop']
            )
            db.session.add(new_card)
            db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_cards():
    db.session.execute('TRUNCATE cards RESTART IDENTITY CASCADE;')
    db.session.commit()
