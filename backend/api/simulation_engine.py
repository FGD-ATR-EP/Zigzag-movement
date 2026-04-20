import random
class MonteCarloSimulator:
    def simulate(self, rtp, volatility, hit_rate):
        bal = 0; mw = 0; ml = 0
        for _ in range(1000):
            bal -= 1; ml = min(ml, bal)
            if random.random() < hit_rate:
                w = random.uniform(2, 50); bal += w; mw = max(mw, w)
        return {'final_balance': bal, 'max_win': mw, 'max_loss': abs(ml), 'rtp_achieved': (bal+1000)/10}
