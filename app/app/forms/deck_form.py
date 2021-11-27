from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.fields.core import BooleanField
from wtforms.validators import DataRequired


class NewDeck(FlaskForm):
    name = StringField("Name", [DataRequired()])
    format = StringField("Format", [DataRequired()])
    description = StringField("Description", [DataRequired()])
    owner_id = IntegerField("Owner_id", [DataRequired()])
    # private = BooleanField("Private", [DataRequired()])

class EditDeck(FlaskForm):
    name = StringField("Name", [DataRequired()])
    format = StringField("Format", [DataRequired()])
    description = StringField("Description", [DataRequired()])
    # private = BooleanField("Private", [DataRequired()])
    
# class DeleteComment(FlaskForm):
#     comment_id = IntegerField("Id")
