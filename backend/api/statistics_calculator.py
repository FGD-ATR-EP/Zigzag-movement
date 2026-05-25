class StatisticalAnalyzer:
    def calculate_session_stats(self, sessions):
        if not sessions: return {}
        w = sum(s['bet_amount'] for s in sessions)
        r = sum(s['win_amount'] for s in sessions)

        total_spins = len(sessions)
        actual_rtp = (r / w * 100) if w > 0 else 0
        hit_frequency = (len([s for s in sessions if s['win_amount'] > 0]) / total_spins * 100)

        # Detect Pool Payout Pattern
        # by measuring variance of intervals between wins
        win_intervals = []
        last_win_index = -1
        for idx, s in enumerate(sessions):
            if s['win_amount'] > 0:
                if last_win_index != -1:
                    win_intervals.append(idx - last_win_index)
                last_win_index = idx

        is_hardcoded_pattern = False
        if len(win_intervals) > 5:
            mean_interval = sum(win_intervals) / len(win_intervals)
            variance = sum((x - mean_interval)**2 for x in win_intervals) / len(win_intervals)
            if variance < 10.0:  # low variance means the payout cycle is fixed
                is_hardcoded_pattern = True

        return {
            'total_spins': total_spins,
            'total_wagered': w,
            'total_won': r,
            'actual_rtp': actual_rtp,
            'hit_frequency': hit_frequency,
            'pool_payout_detected': is_hardcoded_pattern
        }
