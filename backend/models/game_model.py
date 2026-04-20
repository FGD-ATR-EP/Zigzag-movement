from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
class Game(db.Model):
    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    provider = db.Column(db.String(100), nullable=False)
    advertised_rtp = db.Column(db.Float)
    volatility = db.Column(db.String(20))
    max_win = db.Column(db.String(50))
    hit_rate = db.Column(db.Float)
