from app.models import db, Like, environment, SCHEMA


def seed_likes():
    like1 = Like( userId=1, replyId=1)
    like2 = Like( userId=1, replyId=2)
    like3 = Like( userId=1, replyId=3)
    like4 = Like( userId=1, replyId=4)
    like5 = Like( userId=2, replyId=5)
    like6 = Like( userId=2, replyId=6)
    like7 = Like( userId=2, replyId=7)
    like8 = Like( userId=1, replyId=7)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)
    db.session.add(like4)
    db.session.add(like5)
    db.session.add(like6)
    db.session.add(like7)
    db.session.add(like8)
    db.session.commit()

def undo_likes():
    if environment == 'production':
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")

    else:
        db.session.execute('DELETE FROM likes')

    db.session.commit()
