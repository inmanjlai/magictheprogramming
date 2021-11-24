from flask import Blueprint
from app.models import db, Card, Deck
from colors import *

deck_routes = Blueprint('decks', __name__)


@deck_routes.route('/<int:deck_id>/<int:card_id>/', methods=["POST"]) # /deck_1/card_1/
def add_card(deck_id, card_id):
    card = Card.query.get(card_id)
    deck = Deck.query.get(deck_id)

    deck.decklist.append(card)
    db.session.commit()
    
    print(CREDBG + "\n DECK: \n", deck.to_dict(), "\n" + CEND)
    print(CBLUEBG + "\n CARD: \n", card.to_dict(), "\n" + CEND)

    return {"message": f"{card.name} added to {deck.name}"}


