from flask import Blueprint, request
from app.forms.comment_form import NewComment, EditComment
from app.models import Comment, db
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
    return {'comments': [comment.to_dict() for comment in comments]}

# POST A SINGLE COMMENT ON A DECK
@comment_routes.route('/', methods=["POST"])
def post_comment():
    form = NewComment()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        new_comment = Comment(
            deck_id = data["deck_id"],
            user_id = data["user_id"],
            content = data["content"]
        )
        db.session.add(new_comment)
        db.session.commit()
        comments = Comment.query.filter(Comment.deck_id == data['deck_id']).all()
        return {'comments': [comment.to_dict() for comment in comments]}
    else:
        return {"create error": "bad data at postroute"}


# EDIT A SINGLE COMMENT
@comment_routes.route('/<int:comment_id>/', methods=["PUT"])
def edit_comment(comment_id):
    form = EditComment()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        comment_to_edit = Comment.query.filter(Comment.id == comment_id).first()
        comment_to_edit.content = data['content']
        db.session.commit()
        return {"success": "comment Edited!"}
    else:
        return {"EDIT ERROR": "bad data at edit route"}

# DELETE A SINGLE COMMENT
@comment_routes.route('/<int:comment_id>/<int:deck_id>/', methods=["DELETE"])
def delete_comment(comment_id, deck_id):
    comment_to_delete = Comment.query.filter(Comment.id == comment_id).first()
    if comment_to_delete:
        db.session.delete(comment_to_delete)
        db.session.commit()
        comments = Comment.query.filter(Comment.deck_id == deck_id).all()
        return {'comments': [comment.to_dict() for comment in comments]}
    else:
        return {"DELETE ERROR": "bad data at delete route"}
