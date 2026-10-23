<div align="center">
  <img src="assets/compass-mark.svg" width="84" height="84" alt="UIU Compass mark" />
  <h1>UIU Compass</h1>
  <p><strong>A multi-department academic planning workspace for UIU students.</strong></p>
  <p>
    <a href="https://mshlikhon.github.io/uiu-compass-multi-department/">Open the live app</a>
    ·
    <a href="https://github.com/MSHLIKHON/uiu-compass-multi-department/issues">Report a problem</a>
  </p>
  <p>
    <img src="https://img.shields.io/github/actions/workflow/status/MSHLIKHON/uiu-compass-multi-department/pages.yml?branch=main&label=Pages%20deploy" alt="GitHub Pages deployment status" />
    <img src="https://img.shields.io/badge/departments-multi--program-F37021" alt="Multi-program support" />
    <img src="https://img.shields.io/badge/app-static%20%26%20browser--based-0f172a" alt="Static browser-based app" />
  </p>
</div>

---

UIU Compass brings academic records and planning tools together in one browser-based app. Choose a program and curriculum, track courses and grades, estimate CGPA and fees, and check a planned course list for exam-slot clashes.

> UIU Compass is an independent student project, not an official UIU service. Academic rules and published information can change. Confirm important decisions with UIU and your department adviser.

## What you can do

- Track completed, current, and planned courses against a selected curriculum.
- Calculate CGPA, estimate a target CGPA, and plan retakes.
- Review degree progress, prerequisites, course advising, and graduation requirements.
- Estimate tuition and fees using the program and student settings in the app.
- Search courses for pre-advising, assign each one a generic **Day 1–7** and **T1–T4** exam slot, and flag same-slot conflicts.
- Import supported UCAM course history and export or print planning information where available.
- Keep your workspace in the browser; no account is required.

The exam planner does not contain a fixed trimester routine. Use the current official routine to assign each course's day and slot.

## Try the app

Open the [live UIU Compass app](https://mshlikhon.github.io/uiu-compass-multi-department/). On first use, select your program, curriculum, and admission information. Your planning data is saved in that browser, so use the app's backup tools before clearing browser data or switching devices.

## Run locally

This is a static site. Serve the repository root over HTTP so the browser can load `src/data.json`:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. The app uses public CDNs for some fonts and interface libraries, so those resources require an internet connection.

## Project layout

```text
.
├── assets/
│   └── compass-mark.svg       # App and repository icon
├── src/
│   ├── app.js                 # UI, planning tools, and calculations
│   ├── data.js                # Loads the academic data, then starts the app
│   ├── data.json              # Programs, curricula, grade policy, and sample data
│   └── styles.css             # App-specific styles
├── .github/workflows/
│   └── pages.yml              # Deploys the site to GitHub Pages
├── index.html                 # Page structure and library setup
└── README.md
```

`src/data.json` is the single source of academic data used at runtime. To update a curriculum or fee assumption, edit that dataset and keep its source and verification notes with the relevant records. Sample offerings are examples and should be checked against current department notices.

## Deployment

GitHub Actions deploys the contents of `main` to GitHub Pages whenever a commit is pushed. The workflow is in [`.github/workflows/pages.yml`](.github/workflows/pages.yml). You can also run it manually from the repository's **Actions** tab.

## Data and privacy

The app is browser-based and does not require a server account. Academic records are stored in the browser's local storage. They are not automatically synchronized between devices. Treat imports and exported backups as personal academic information and store them accordingly.

## Feedback

Please open a [GitHub issue](https://github.com/MSHLIKHON/uiu-compass-multi-department/issues) with the page, what you expected, and what happened. For academic data corrections, include a current official UIU source link so the information can be checked.
