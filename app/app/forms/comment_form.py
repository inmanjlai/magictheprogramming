from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class NewComment(FlaskForm):
    deck_id = IntegerField("Deck_id", [DataRequired()])
    user_id = IntegerField("User_id", [DataRequired()])
    content = StringField("Content", [DataRequired()])

class EditComment(FlaskForm):
    content = StringField("Content", [DataRequired()])
    

