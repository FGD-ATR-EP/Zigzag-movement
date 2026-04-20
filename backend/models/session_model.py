from .game_model import db
class Session(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.String(50), db.ForeignKey('game.id'))
    bet_amount = db.Column(db.Float); win_amount = db.Column(db.Float)
    timestamp = db.Column(db.DateTime, server_default=db.func.now())
