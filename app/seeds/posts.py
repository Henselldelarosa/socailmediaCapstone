from app.models import db, Post, environment, SCHEMA


def seed_posts():
    post1 = Post(post = 'Today was a good day', postUrl='', userId=1)

    post2 = Post(post = 'Hello World', postUrl='', userId=1)

    post3 = Post(post = 'Great Summer', postUrl='', userId=2)

    post4 = Post(post = 'Great gym day today', postUrl='', userId=3)

    post5 = Post(post = 'Hows Everyone Day?', postUrl='', userId=3)

    post6 = Post(post = 'simply jump inside a body of water. this is better when you add soap', postUrl='', userId=1)

    post7 = Post(post = 'i came here to troll', postUrl='', userId=1)


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.commit()


def undo_posts():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM posts")

    db.session.commit()
