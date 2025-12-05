const resultsEl = document.getElementById('results');
const qInput = document.getElementById('q');
const searchBtn = document.getElementById('searchBtn');



searchBtn.addEventListener('click', () => search(qInput.value.trim()));
qInput.addEventListener('keydown', e => { if (e.key === 'Enter') search(qInput.value.trim()); });

async function search(term) {
  if (!term) return;
  resultsEl.innerHTML = '<p>Searching…</p>';
  try {
    const url = `${PROXY}https://api.deezer.com/search?q=${encodeURIComponent(term)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Deezer API error: ${res.status}`);
    const data = await res.json();
    renderResults(data.data || []); // Deezer returns { data: [ ... ] }
  } catch (err) {
    console.error(err);
    resultsEl.innerHTML = '<p>Error fetching Deezer</p>';
  }
}

let audio;
function playPreview(url, meta) {
  if (audio) { audio.pause(); audio = null; }
  audio = new Audio(url);
  audio.play();
  // update UI: show player, title, etc.
}

function renderResults(items) {
  if (!items.length) { resultsEl.innerHTML = '<p>No results</p>'; return; }
  resultsEl.innerHTML = items.map(it => {
    const title = it.title;
    const artist = it.artist?.name || '';
    const art = it.album?.cover_big || it.album?.cover || '';
    const preview = it.preview; // 30s mp3
    return `
      <div class="card">
        <img src="${art}" alt="${escapeHtml(title)}" />
        <div class="meta"><strong>${escapeHtml(title)}</strong><div>${escapeHtml(artist)}</div></div>
        <button class="playBtn" data-preview="${preview}">Preview</button>
      </div>
    `;
  }).join('');
  document.querySelectorAll('.playBtn').forEach(b => {
    b.onclick = e => {
      const url = e.currentTarget.dataset.preview;
      const card = e.currentTarget.closest('.card');
      const title = card.querySelector('.meta strong').textContent;
      const artist = card.querySelector('.meta div').textContent;
      playPreview(url, { title, artist });
    };
  });
}
