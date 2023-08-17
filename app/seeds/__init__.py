from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .replies import seed_replies, undo_replies
from .likes import seed_likes, undo_likes
from .searches import seed_searches, undo_search
from .images import seed_images, undo_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        undo_likes()
        undo_replies()
        undo_posts()
        undo_search()
        undo_images()
        undo_users()
    seed_users()
    seed_images()
    seed_searches()
    seed_posts()
    seed_replies()
    seed_likes()
    db.session.commit()
    # Add other seed functions here

#     db.session.execute(
#             f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     db.session.execute(
#             f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
#     db.session.execute(
#             f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
#     db.session.execute(
#             f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
#     db.session.commit()



# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_likes()
    undo_replies()
    undo_posts()
    undo_search()
    undo_images()
    undo_users()
    # Add other undo functions here


def undo_likes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()

def undo_replies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM replies")

    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()


def undo_searches():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.searches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM searches")

    db.session.commit()


def undo_images():
     if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
     else:
        db.session.execute("DELETE FROM images")

     db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
