from app.models import db, Reply, environment, SCHEMA


def seed_replies():
    reply1 = Reply( reply='How Good?', replyUrl='', userId=2, postId=1)
    reply2 = Reply( reply='Wassup', replyUrl='', userId=2, postId=1)
    reply3 = Reply( reply='Yes it was', replyUrl='', userId=3, postId=3)
    reply4 = Reply( reply='Chest day?', replyUrl='', userId=3, postId=4)
    reply5 = Reply( reply='My day been good', replyUrl='',  userId=1, postId=5)
    reply6 = Reply( reply='That helps', replyUrl='', userId=1, postId=6)
    reply7 = Reply( reply='Not cool', replyUrl='' , userId=1, postId=5)


    db.session.add(reply1)
    db.session.add(reply2)
    db.session.add(reply3)
    db.session.add(reply4)
    db.session.add(reply5)
    db.session.add(reply6)
    db.session.add(reply7)
    db.session.commit()


def undo_replies():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.replies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM replies")

    db.session.commit()
