from flask import Blueprint, request
from app.forms.deck_form import EditDeck, NewDeck
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
        return {"read error": "user doesn't exist"}

# Create a Deck
@deck_routes.route('/', methods=["POST"])
def create_deck():
    form = NewDeck()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_deck = Deck(
            name=data['name'],
            format=data['format'],
            description=data['description'],
            owner_id=data['owner_id']
        )
        db.session.add(new_deck)
        db.session.commit()
        return {"success": "deck made wow!"}
    else:
        return {"create error": "bad data at postroute"}

# Add a card to a deck
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

# Edit one deck
@deck_routes.route('/<int:deck_id>/', methods=["PUT"])
def edit_deck(deck_id):
    deck = Deck.query.get(deck_id)
    if deck:
        form = EditDeck()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            data = form.data
            deck.name = data['name']
            deck.format = data['format']
            deck.description = data['description']
            db.session.commit()
            return deck.to_dict()
        else:
            return {"edit error": "invalid form data"}

    else: 
        return{"edit error": "deck doesn't exist"}

# Delete one deck
@deck_routes.route('/<int:deck_id>/', methods=["DELETE"])
def delete_deck(deck_id):
    deck = Deck.query.get(deck_id)
    print(CRED + "\n DECK \n", deck, "\n" + CEND)
    if deck:
        db.session.delete(deck)
        db.session.commit()
        return {"success": "deck deleted"}
    else: 
        return {"delete error": "deck does not exist"}
        