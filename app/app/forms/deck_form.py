from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class NewDeck(FlaskForm):
    name = StringField("Name", [DataRequired()])
    format = StringField("Format", [DataRequired()])
    description = StringField("Description", [DataRequired()])
    owner_id = IntegerField("Owner_id", [DataRequired()])

class EditDeck(FlaskForm):
    name = StringField("Name", [DataRequired()])
    format = StringField("Format", [DataRequired()])
    description = StringField("Description", [DataRequired()])
    
# class DeleteComment(FlaskForm):
#     comment_id = IntegerField("Id")
