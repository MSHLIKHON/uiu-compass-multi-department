// Load the academic catalog once, then start the app as a classic script so
// existing inline UI actions remain globally available.
const loaderScriptUrl = document.currentScript.src;

Promise.all([
  fetch(new URL('./data.json', loaderScriptUrl)),
  fetch(new URL('./exam-routines.json', loaderScriptUrl))
])
  .then(async ([dataResponse, routineResponse]) => {
    if (!dataResponse.ok) throw new Error(`Academic data request failed (${dataResponse.status}).`);
    if (!routineResponse.ok) throw new Error(`Exam routine data request failed (${routineResponse.status}).`);
    return Promise.all([dataResponse.json(), routineResponse.json()]);
  })
  .then(([data, routines]) => {
    window.UIU_COMPASS_DATA = data;
    window.UIU_COMPASS_EXAM_ROUTINES = routines;
    const app = document.createElement('script');
    app.src = new URL('./app.js', loaderScriptUrl).href;
    app.onerror = () => showDataError('The application script could not be loaded. Refresh the page and try again.');
    document.body.appendChild(app);
  })
  .catch((error) => {
    console.error('UIU Compass could not load its academic data:', error);
    showDataError('Academic data could not be loaded. Run the project from a local web server and refresh.');
  });

function showDataError(message) {
  document.body.innerHTML = `<main style="max-width:42rem;margin:4rem auto;padding:2rem;font:16px/1.6 system-ui,sans-serif"><h1>UIU Compass could not start</h1><p>${message}</p></main>`;
}
