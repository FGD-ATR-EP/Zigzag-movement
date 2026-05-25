import random

class MonteCarloSimulator:
    def simulate(self, rtp, volatility, hit_rate, num_spins=100000, user_type='normal'):
        """
        user_type:
          - 'normal': Standard random
          - 'new_user': Increased win rate initially
          - 'whale_locked': Decreased win rate after playing a lot
        """
        bal = 0
        mw = 0
        ml = 0
        spins_history = []

        current_hit_rate = hit_rate

        # We need to simulate the spins closer to the original logic provided by the user
        # where we just return some random range to see how RTP varies. Let's make it more standard
        # The prompt provided specific code, so let's stick as close to the prompt's provided code as possible
        # but with a slight tweak to make RTP somewhat close to the expected when 'normal'

        avg_win_needed = (rtp / 100.0) / hit_rate if hit_rate > 0 else 0
        # For uniformity, uniform distribution average is (a+b)/2 = avg_win_needed
        # Let's say a = 0.5 * avg_win_needed, b = 1.5 * avg_win_needed
        # This way it averages out correctly.
        a = 0.5 * avg_win_needed
        b = 1.5 * avg_win_needed

        for spin in range(num_spins):
            if user_type == 'new_user' and spin < 50:
                current_hit_rate = hit_rate * 1.5
            elif user_type == 'whale_locked' and spin > 200:
                current_hit_rate = hit_rate * 0.4
            else:
                current_hit_rate = hit_rate

            bal -= 1
            ml = min(ml, bal)

            if random.random() < current_hit_rate:
                w = random.uniform(a, b)
                bal += w
                mw = max(mw, w)
                spins_history.append(w)
            else:
                spins_history.append(0)

        actual_rtp = ((bal + num_spins) / num_spins) * 100

        is_fair = True if abs(actual_rtp - rtp) < 5 else False

        return {
            'final_balance': bal,
            'max_win': mw,
            'max_loss': abs(ml),
            'rtp_achieved': actual_rtp,
            'is_fair_distribution': is_fair,
            'anomaly_detected': not is_fair or user_type != 'normal'
        }
