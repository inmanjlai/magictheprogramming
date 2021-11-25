from flask import Blueprint, request
from app.models import Card
import requests
import json

card_routes = Blueprint('cards', __name__)

# WILL MAKE A REQUEST TO THE SCRYFALL API AND RETURN ALL CARD OBJECTS  THAT MATCH THE PARAMETER
def scryfall_find_card(card_name):
    response = requests.get(f"https://api.scryfall.com/cards/search?q={card_name}")
    data = response.json()

    return {"response": data}

@card_routes.route('/')
def get_all_cards():
    cards = Card.query.all()
    return {'cards': [card.to_dict() for card in cards]}


# @card_routes.route('/<path:card_name>', methods=["POST"])
# def create_card():
#     cards = Card.query.all()
#     return {'cards': [card.to_dict() for card in cards]}