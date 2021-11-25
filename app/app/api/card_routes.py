from flask import Blueprint, request
from app.forms.card_form import NewCard
from app.models import db, Card, Decklist
import requests
from app.models.deck import Deck
from colors import *

card_routes = Blueprint('cards', __name__)

# WILL MAKE A REQUEST TO THE SCRYFALL API AND RETURN ALL CARD OBJECTS  THAT MATCH THE PARAMETER
def scryfall_find_card(card_name):
    response = requests.get(f"https://api.scryfall.com/cards/named?exact={card_name}")
    data = response.json()
    return data

def card_info(card_id):
        card = Card.query.get(card_id)
        return card.to_dict()

# GET ALL CARDS
@card_routes.route('/')
def get_all_cards():
    cards = Card.query.all()
    return {'cards': [card.to_dict() for card in cards]}

# GET ALL CARDS IN A DECK
@card_routes.route('/<int:deck_id>/')
def get_cards_in_deck(deck_id):
    cards = Decklist.query.filter(Decklist.deck_id == deck_id).all()
    return {"cards": [{"card_info": card_info(card.card_id), "quantity": card.quantity} for card in cards]}

# FIND CARDS BASED ON PARAMETER
@card_routes.route('/<int:deck_id>/<path:card_name>/', methods=["POST"])
def find_cards(deck_id, card_name):
    card_already_exists = Card.query.filter(Card.name == card_name).first()
    deck = Deck.query.get(deck_id)

    # IF THE CARD ALREADY EXISTS IN THE DATABASE
    if card_already_exists:
        already_exists_in_deck = Decklist.query.filter((Decklist.deck_id == deck.id) & (Decklist.card_id == card_already_exists.id)).first()
        
        # CHECK IF THAT CARD IS ALREADY IN THE GIVEN DECK
        if already_exists_in_deck:
            # INCREMENT THE QUANTITY OF THAT SPECIFIC CARD IN THE DECK
            already_exists_in_deck.quantity = already_exists_in_deck.quantity + 1
            db.session.commit()
            return {"add_card": f"another copy of {card_already_exists.name} added to {deck.name}"}
        # ELSE IF THE CARD DOESNT EXIST IN THEIR DECK ALREADY BUT DOES EXIST IN THE DATABASE
        else:
            new_card = Decklist(deck_id=deck.id, card_id=card_already_exists.id)
    # IF THE CARD DOESNT EXIST IN THE DATABASE
    else:
        # FIND A CARD WITH THE EXACT NAME SEARCH USING SCRYFALL API
        card = scryfall_find_card(card_name) 
        # CREATE A CARD IN THE DATABASE USING "card" INFO
        if card['object'] == 'error':
            return {"fetch_error": "No card with that name exists"}

        parsed_card = {
            'name': card['name'],
            'type_line': card['type_line'],
            'oracle_text': card['oracle_text'],
            'mana_value': card['cmc'],
            'mana_cost': card['mana_cost'],
            'colors': ", ".join([color for color in card['colors']]),
            'image_url': card['image_uris']['normal']
        }
        new_card = Card(
            name=parsed_card['name'], 
            type_line=parsed_card['type_line'], 
            oracle_text=parsed_card['oracle_text'], 
            mana_value=parsed_card['mana_value'], 
            mana_cost=parsed_card['mana_cost'], 
            colors=parsed_card['colors'], 
            image_url=parsed_card['image_url']

        )
        db.session.add(new_card)
        db.session.commit()

        # ADD THAT CARD TO THE GIVEN DECK
        new_decklist_entry = Decklist(deck_id=deck.id, card_id=new_card.id)
        db.session.add(new_decklist_entry)
        db.session.commit()

        return {"success": f"Added {new_card.name} to {deck.name}"} # CREATE A NEW CARD WITH THE GIVEN INFO FROM THE API
    return {"add_error": "invalid add_card form data"}

# CREATE A CARD
@card_routes.route('/', methods=["POST"])
def create_card():
    form = NewCard()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_card = Card(
            name=data['name'], 
            type_line=data['type_line'], 
            oracle_text=data['oracle_text'], 
            mana_value=data['mana_value'], 
            mana_cost=data['mana_cost'], 
            colors=data['colors'], 
            image_url=data['image_url']
        )
        db.session.add(new_card)
        db.session.commit()
        return {'success': 'card created sucessfully'}
    else:
        return {'create_error': 'invalid card form data'}


