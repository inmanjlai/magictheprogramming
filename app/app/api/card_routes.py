from flask import Blueprint, request
from app.forms.card_form import NewCard
from app.models import db, Card
import requests
from colors import *

card_routes = Blueprint('cards', __name__)

# WILL MAKE A REQUEST TO THE SCRYFALL API AND RETURN ALL CARD OBJECTS  THAT MATCH THE PARAMETER
def scryfall_find_card(card_name):
    response = requests.get(f"https://api.scryfall.com/cards/search?q={card_name}")
    data = response.json()
    return data

# GET ALL CARDS
@card_routes.route('/')
def get_all_cards():
    cards = Card.query.all()
    return {'cards': [card.to_dict() for card in cards]}

# FIND CARDS BASED ON PARAMETER
@card_routes.route('/<path:card_name>/')
def find_cards(card_name):
    cards = scryfall_find_card(card_name)
    return cards

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
