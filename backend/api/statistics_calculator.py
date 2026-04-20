class StatisticalAnalyzer:
    def calculate_session_stats(self, sessions):
        if not sessions: return {}
        w = sum(s['bet_amount'] for s in sessions)
        r = sum(s['win_amount'] for s in sessions)
        return {'total_spins': len(sessions), 'total_wagered': w, 'total_won': r, 'actual_rtp': (r/w*100) if w > 0 else 0, 'hit_frequency': (len([s for s in sessions if s['win_amount'] > 0])/len(sessions)*100)}
