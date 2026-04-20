import re
class GameLinkProcessor:
    def extract_game_data(self, url):
        if 'pgsoft' in url.lower(): return {'id': 'pg-aztec', 'name': 'Treasures of Aztec', 'provider': 'PG Soft', 'advertised_rtp': 96.71, 'volatility': 'High', 'hit_rate': 0.25}
        return {'id': 'pp-gates', 'name': 'Gates of Olympus', 'provider': 'Pragmatic Play', 'advertised_rtp': 96.50, 'volatility': 'High', 'hit_rate': 0.20}
