from app.models import db, environment, SCHEMA, Search

def seed_searches():
    search1 = Search(
        userId = 1, search = 'Demo'
    )

    search2 = Search(
        userId = 1, search = 'Rose'
    )

    search3 = Search(
        userId = 1, search = 'Bobbie Bob'
    )
    db.session.add(search1)
    db.session.add(search2)
    db.session.add(search3)
    db.session.commit()

def undo_search():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.searches RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM searches")

    db.session.commit()
