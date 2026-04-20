from flask import Flask, request, jsonify
from flask_cors import CORS
from models.game_model import db, Game
from api.game_analysis import GameLinkProcessor
from api.simulation_engine import MonteCarloSimulator
import os
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.getcwd(), 'backend/database/game.db')
db.init_app(app)
with app.app_context(): db.create_all()
proc = GameLinkProcessor(); sim = MonteCarloSimulator()
@app.route('/api/analyze-link', methods=['POST'])
def analyze(): return jsonify(proc.extract_game_data(request.json['url']))
@app.route('/api/simulate', methods=['POST'])
def simulate(): return jsonify(sim.simulate(request.json['rtp'], request.json['volatility'], request.json['hit_rate']))
if __name__ == '__main__': app.run(port=5000)
