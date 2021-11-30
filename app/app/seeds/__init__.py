from flask.cli import AppGroup
from .users import seed_users, undo_users
from .decks import seed_decks, undo_decks
from .cards import seed_cards, undo_cards
from .comments import seed_comments, undo_comments
from .decklists import seed_decklists, undo_decklists

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_cards()
    seed_decks()
    seed_comments()
    seed_decklists()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_cards()
    undo_decks()
    undo_comments()
    undo_decklists()
    # Add other undo functions here
