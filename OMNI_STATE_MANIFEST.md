GENESIS::OMNI_STATE_MANIFEST

[STRUCTURE]
- Declared Modules      : PARTIAL
- Orphan Components     : FOUND (2)
  - `backend/api/statistics_calculator.py`
  - `backend/models/session_model.py`
- Redundant Concepts    : FOUND (1)
  - Hardcoded API URLs (`http://localhost:5000`) in `frontend/src/App.js` when `process.env.REACT_APP_API_URL` could be used.

[CONCEPTUAL LAYER]
- Core Philosophy       : COHERENT
- Naming Consistency    : STABLE
- Undefined Semantics   : NONE

[CURRENT REALITY]
- Active Capabilities   : Game Link Processing, Monte Carlo Simulation, Forensic Report Generation.
- Dormant Designs       : Statistical session calculation (`StatisticalAnalyzer`), DB Session storage.
- Abandoned Threads     : None found.

[RISKS]
- Structural Risk       : LOW
- Semantic Drift Risk   : LOW
- Future Bug Vectors    :
  - Backend bound to `127.0.0.1` (due to missing `host='0.0.0.0'` in `app.run()`), preventing external access.
  - Hardcoded URLs in React application logic.

[RECOMMENDATION]
- Freeze Expansion      : NO
- Refactor Priority     :
  1. Fix backend `app.run` host to allow external connections.
  2. Centralize API base URL in frontend components.
  3. Purge or integrate orphan models and calculators.
- Safe Extension Zones  : Further modules inside `backend/api/` can be extended, provided they are wired into `app.py`.

[GENESIS NOTE]
“The system is alive, but it must decide whether to grow or to remember who it is.”