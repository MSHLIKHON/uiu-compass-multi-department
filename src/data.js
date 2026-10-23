fetch(new URL('./data.json', import.meta.url))
  .then((response) => {
    if (!response.ok) throw new Error('Could not load UIU Compass data.');
    return response.json();
  })
  .then((data) => {
    window.UIU_COMPASS_DATA = data;
    window.dispatchEvent(new Event('uiu-compass:data-ready'));
  })
  .catch((error) => {
    console.error(error);
    document.body.innerHTML = '<main style="padding:2rem;font-family:sans-serif"><h1>Compass data could not load</h1><p>Run this project from a local web server and refresh.</p></main>';
  });
