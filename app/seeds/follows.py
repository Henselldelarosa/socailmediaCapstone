# from app.models import db, User, environment, SCHEMA, followers

# def seed_followers():
#     follow1 = User.followers(follower_id = 1, followed_id= 2)
#     follow2 = User.followers(follower_id = 1, followed_id= 3)
#     follow3 = User.followers(follower_id = 2, followed_id= 3)
#     follow4 = User.followers(follower_id = 2, followed_id= 1)
#     follow5 = User.followers(follower_id = 3, followed_id= 1)

#     db.session.add(follow1)
#     db.session.add(follow2)
#     db.session.add(follow3)
#     db.session.add(follow4)
#     db.session.add(follow5)
#     db.session.commit()

# def undo_followers():
#     if environment == 'production':
#         db.session.execute(
#             f"TRUNCATE table {SCHEMA}.follows RESTART IDENTITY CASCADE;")

#     else:
#         db.session.execute('DELETE FROM likes')

#     db.session.commit()
