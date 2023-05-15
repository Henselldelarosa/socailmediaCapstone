from app.models import db, Image, environment, SCHEMA

def seed_images():
    db.session.commit()


def undo_images():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")

    else:
        db.session.execute('DELETE FROM images')

    db.session.commit()
