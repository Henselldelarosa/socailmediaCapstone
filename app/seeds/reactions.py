from app.models import db, environment, SCHEMA, Reaction

def seed_reactions():
  reaction1 = Reaction(
      reply_id =1 , user_id=1,
  )

  reaction2 = Reaction(
    reply_id =2 , user_id=1,
  )

  reaction3 = Reaction(
      reply_id =3 , user_id=1
  )

  reaction4 = Reaction(
      reply_id =1 , user_id=2
  )

  reaction5 = Reaction(
      reply_id =2 , user_id=2
  )

  reaction6 = Reaction(
      reply_id =3 , user_id=2
  )

  reaction7 = Reaction(
      reply_id =3 , user_id=3
  )

  reaction8 = Reaction(
      reply_id =3 , user_id=3
  )

  reaction9 = Reaction(
      reply_id =4 , user_id=1
  )

  reaction10 = Reaction(
      reply_id =4 , user_id=2
  )

  reaction11 = Reaction(
      reply_id =5 , user_id=1
  )

  reaction12 = Reaction(
      reply_id =5 , user_id=2
  )

  reaction13 = Reaction(
      reply_id =6 , user_id=2
  )

  reaction14 = Reaction(
      reply_id =6 , user_id=1
  )

  reaction15 = Reaction(
      reply_id =7 , user_id=1
  )

  reaction16 = Reaction(
      reply_id =7 , user_id=2
  )

  reaction17 = Reaction(
      reply_id =7 , user_id=3
  )


  db.session.add(reaction1)
  db.session.add(reaction2)
  db.session.add(reaction3)
  db.session.add(reaction4)
  db.session.add(reaction5)
  db.session.add(reaction6)
  db.session.add(reaction7)
  db.session.add(reaction8)
  db.session.add(reaction9)
  db.session.add(reaction10)
  db.session.add(reaction11)
  db.session.add(reaction12)
  db.session.add(reaction13)
  db.session.add(reaction14)
  db.session.add(reaction15)
  db.session.add(reaction16)
  db.session.add(reaction17)
  db.session.commit()

def undo_reactions():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reactions")

    db.session.commit()
