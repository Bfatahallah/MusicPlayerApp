const qInput = document.getElementById('q');
const searchBtn = document.getElementById('searchBtn');
const results = document.getElementById('results');

searchBtn.addEventListener('click', () => search(qInput.value.trim()));
qInput.addEventListener('keydown', e => { if(e.key === 'Enter') search(qInput.value.trim()); });

async function search(term){
  if(!term) return;
  results.innerHTML = '<p>Loading…</p>';
  const url = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) + '&media=music&limit=20';
  try{
    const res = await fetch(url);
    const data = await res.json();
    renderResults(data.results || []);
  }catch(err){
    results.innerHTML = '<p>Error fetching results</p>';
    console.error(err);
  }
}

function renderResults(items){
  if(!items.length) { results.innerHTML = '<p>No results</p>'; return; }
  results.innerHTML = items.map(it => `
    <div class="card" data-preview="${it.previewUrl}" data-title="${escapeHtml(it.trackName||'')}" data-artist="${escapeHtml(it.artistName||'')}">
      <img src="${it.artworkUrl100}" alt="${escapeHtml(it.trackName)}" style="width:100%;border-radius:8px" />
      <div class="meta"><strong>${it.trackName}</strong><div>${it.artistName}</div></div>
      <button class="playBtn">Preview</button>
    </div>
  `).join('');
  attachPlayHandlers();
}

function attachPlayHandlers(){
  document.querySelectorAll('.card .playBtn').forEach(btn => {
    btn.onclick = e => {
      const card = e.target.closest('.card');
      const preview = card.dataset.preview;
      playPreview(preview, card.dataset.title, card.dataset.artist, card.querySelector('img').src);
    }
  });
}

let audio;
function playPreview(url, title, artist, art){
  if(audio){ audio.pause(); audio = null; }
  audio = new Audio(url);
  audio.play();
  document.getElementById('playerBar').classList.remove('hidden');
  document.getElementById('playerArt').src = art;
  document.getElementById('playerTitle').textContent = title;
  document.getElementById('playerArtist').textContent = artist;
}
function escapeHtml(s){ return String(s); }
document.getElementById('pauseBtn').onclick = () => {
  if(audio){ audio.pause(); audio = null; }
  document.getElementById('playerBar').classList.add('hidden');
};  