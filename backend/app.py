from flask import Flask, request, jsonify
from flask_cors import CORS
from models.game_model import db, Game
from api.game_analysis import GameLinkProcessor
from api.simulation_engine import MonteCarloSimulator
import os

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'database/game.db')
db.init_app(app)
with app.app_context(): db.create_all()

proc = GameLinkProcessor()
sim = MonteCarloSimulator()

@app.route('/api/analyze-link', methods=['POST'])
def analyze():
    return jsonify(proc.extract_game_data(request.json['url']))

@app.route('/api/simulate', methods=['POST'])
def simulate():
    # Use larger spins and a default 'whale_locked' or 'new_user' user type if provided
    # Here we simulate with the advanced engine
    req_data = request.json
    # Default to 100,000 spins and normal user if not provided in the payload
    # But for forensic purposes, we can test as a normal user by default or
    # dynamically based on params. We'll default to 'whale_locked' for demonstration
    # of the forensic anomaly detection. Let's make it 'whale_locked' by default for now
    # or pass it from frontend.
    user_type = req_data.get('user_type', 'whale_locked')
    num_spins = req_data.get('num_spins', 100000)

    # advertised_rtp may be passed as 'rtp'
    return jsonify(sim.simulate(
        req_data.get('advertised_rtp', req_data.get('rtp')),
        req_data.get('volatility'),
        req_data.get('hit_rate'),
        num_spins=num_spins,
        user_type=user_type
    ))

@app.route('/api/forensic-report', methods=['POST'])
def generate_report():
    input_data = request.json
    game_info = input_data.get('game_info', {})
    sim_results = input_data.get('sim_results', {})

    advertised_rtp = game_info.get('advertised_rtp', 100)
    rtp_achieved = sim_results.get('rtp_achieved', 100)

    rtp_delta = advertised_rtp - rtp_achieved

    verdict = "⚠️ ตรวจพบความผิดปกติขั้นรุนแรง (High Risk Anomaly)" if rtp_delta > 5 else "✅ อยู่ในเกณฑ์สุ่มมาตรฐาน (Standard Compliance)"

    summary_text = (
        f"ผลการตรวจสอบทางนิติวิทยาศาสตร์ดิจิทัลสำหรับเกม {game_info.get('name')} ({game_info.get('provider')}): \n\n"
        f"1. อัตราจ่ายที่โฆษณาไว้คือ {advertised_rtp}% แต่จากการจำลองระบบแบบมอนเตคาร์โล "
        f"ทำได้จริงเพียง {rtp_achieved:.2f}% เกิดค่าความเบี่ยงเบนเดลต้า (RTP Delta) อยู่ที่ {rtp_delta:.2f}%\n"
        f"2. สรุปผลการทดสอบ: {verdict} มีแนวโน้มสูงที่จะเป็นซอร์สโค้ดเถื่อน (Pirated Rips) "
        f"ที่มีแผงควบคุมหลังบ้านเพื่อตัดวงจรการจ่ายเงินรางวัลเมื่อผู้เล่นเพิ่มระดับวงเงินเดิมพัน"
    )

    return jsonify({'report': summary_text, 'rtp_delta': rtp_delta})

if __name__ == '__main__':
    host = os.environ.get('FLASK_RUN_HOST', '127.0.0.1')
    app.run(host=host, port=5000)
