# UIU Compass — Multi-Department Academic Planning Platform

Standalone prototype organized into separate source files:

- `index.html` — page structure and external library setup
- `src/styles.css` — project-specific styles
- `src/app.js` — interface behavior and calculations
- `src/data.json` — programs, curricula, sample offerings and academic data
- `src/data.js` — loads the data file before starting the app

## Run locally

Because the app loads `src/data.json`, start a local static server from this folder. For example:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Some optional libraries and fonts load from public CDNs, so those features need an internet connection.

## Academic data

This is a prototype. Verify curriculum, fee, course offering and exam information against current official UIU sources before relying on it for academic decisions.
