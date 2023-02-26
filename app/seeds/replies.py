from app.models import db, Reply, environment, SCHEMA


def seed_replies():
    reply1 = Reply( reply='How Good?', userId=2, postId=1)
    reply2 = Reply( reply='Wassup', userId=2, postId=1)
    reply3 = Reply( reply='Yes it was', userId=3, postId=2)
    reply4 = Reply( reply='Chest day?', userId=3, postId=2)
    reply5 = Reply( reply='My day been good', userId=1, postId=3)
    reply6 = Reply( reply='That helps', userId=1, postId=4)
    reply7 = Reply( reply='Not cool', userId=1, postId=5)


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
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM replies")

    db.session.commit()
