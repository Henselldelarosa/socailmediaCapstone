from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    user1 = User(
        firstName='Demo', lastName='Emo', email='demo@aa.io', password='password', userUrl='https://i.pinimg.com/736x/0a/bb/e5/0abbe546e479edc1eb62f5a8ccd66328.jpg')
    user2 = User(
        firstName='Marnie', lastName='Rose', email='marnie@aa.io', password='password', userUrl='https://thumbs.dreamstime.com/b/funny-face-baby-27701492.jpg')
    user3 = User(
        firstName='Bobbie', lastName='Bob', email='bobbie@aa.io', password='password', userUrl='https://parade.com/.image/t_share/MTkwNTgxMTA1NjY0NDAyNTU3/funny-pictures.jpg')

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.commit()

    user2.follow(user1)
    user3.follow(user1)
    user1.follow(user2)
    user3.follow(user2)
    user1.follow(user3)

    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto,
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
