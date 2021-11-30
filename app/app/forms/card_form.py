from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class NewCard(FlaskForm):
    name = StringField("Name", [DataRequired()])
    type_line = StringField("Type_line", [DataRequired()])
    oracle_text = StringField("Oracle_text", [DataRequired()])
    mana_value = IntegerField("Mana_value", [DataRequired()])
    mana_cost = StringField("Mana_cost", [DataRequired()])
    colors = StringField("Colors", [DataRequired()])
    image_url = StringField("Image_url", [DataRequired()])
    art_crop = StringField("art_crop", [DataRequired()])

# class EditDeck(FlaskForm):
#     name = StringField("Name", [DataRequired()])
#     format = StringField("Format", [DataRequired()])
#     description = StringField("Description", [DataRequired()])
    
# class DeleteComment(FlaskForm):
#     comment_id = IntegerField("Id")
