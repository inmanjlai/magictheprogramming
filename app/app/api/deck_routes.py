from flask import Blueprint
from app.models import db, Card, Deck, Decklist, User
from colors import *

deck_routes = Blueprint('decks', __name__)

# Read all decks that exist
@deck_routes.route('/')
def get_all_decks():
    decks = Deck.query.all()
    return {"decks": [deck.to_dict() for deck in decks]}

# Read a single user's decks
@deck_routes.route('/<int:user_id>/')
def get_users_decks(user_id):
    user = User.query.get(user_id)
    if user:
        return user.get_decks()
    else: 
        return {"error": "user doesn't exist"}

@deck_routes.route('/<int:deck_id>/<int:card_id>/', methods=["POST"]) # /deck_1/card_1/
def add_card(deck_id, card_id):
    card_to_add = Card.query.get(card_id)
    deck = Deck.query.get(deck_id)

    # find the decklist where deck_id == deck.id AND card_id == card.id
        # if this is truthy ==> decklist.quantity += 1
        # else new Decklist(deck_id=deck.id, card_id=card.id)

    decklist = Decklist.query.filter((Decklist.deck_id == deck.id) and (Decklist.card_id == card_to_add.id)).first()
    if decklist:
        print(CREDBG + "\n DECKLIST: \n", decklist.to_dict(), "\n" + CEND)
        decklist.quantity = decklist.quantity + 1

    else:
        decklist_to_create = Decklist(deck_id=deck.id, card_id=card_to_add.id)
        db.session.add(decklist_to_create)
        db.session.commit()
        return decklist_to_create.to_dict()
    
    db.session.commit()

    return {"message": f"{card_to_add.name} added to {deck.name}"}


