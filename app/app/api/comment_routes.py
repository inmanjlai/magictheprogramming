from flask import Blueprint
from app.models import Comment
from colors import *

comment_routes = Blueprint('comments', __name__)

# READ ALL COMMENTS
@comment_routes.route('/')
def read_all_comments():
    comments = Comment.query.all()
    return {'comments': [comment.to_dict() for comment in comments]}

# READ A SINGLE DECK'S COMMENTS
@comment_routes.route('/<int:deck_id>/')
def read_comments(deck_id):
    comments = Comment.query.filter(deck_id == Comment.deck_id).all()
    print(CREDBG + "\n Comments: \n", comments, "\n" + CEND)
    return {'comments': [comment.to_dict() for comment in comments]}
