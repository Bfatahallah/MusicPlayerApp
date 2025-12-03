// Music Player App - Wireframe JavaScript

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const trackGrid = document.getElementById('track-grid');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress');
const volumeSlider = document.getElementById('volume-slider');

// State
let isPlaying = false;
let currentTrackIndex = 0;

// Sample track data (wireframe placeholder)
const sampleTracks = [
    { title: 'Track Title 1', artist: 'Artist Name' },
    { title: 'Track Title 2', artist: 'Artist Name' },
    { title: 'Track Title 3', artist: 'Artist Name' },
    { title: 'Track Title 4', artist: 'Artist Name' },
    { title: 'Track Title 5', artist: 'Artist Name' },
    { title: 'Track Title 6', artist: 'Artist Name' }
];

// Initialize the app
function init() {
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Player controls
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', playPrevious);
    nextBtn.addEventListener('click', playNext);

    // Volume control
    volumeSlider.addEventListener('input', handleVolumeChange);

    // Track card click events
    document.querySelectorAll('.track-card').forEach((card, index) => {
        card.addEventListener('click', () => selectTrack(index));
    });

    // Navigation menu
    document.querySelectorAll('.nav-item').forEach((item) => {
        item.addEventListener('click', () => handleNavigation(item));
    });
}

// Handle search
function handleSearch() {
    const query = searchInput.value.trim();
    if (query) {
        // Wireframe: Just log the search query
        console.log('Searching for:', query);
        // In the full implementation, this will call the Deezer API
        alert(`Search functionality coming soon!\nSearching for: "${query}"`);
    }
}

// Toggle play/pause
function togglePlayPause() {
    isPlaying = !isPlaying;
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
    
    // Update now playing info if a track is selected
    if (isPlaying) {
        console.log('Playing track:', currentTrackIndex);
    } else {
        console.log('Paused');
    }
}

// Play previous track
function playPrevious() {
    if (currentTrackIndex > 0) {
        currentTrackIndex--;
        selectTrack(currentTrackIndex);
    }
    console.log('Previous track');
}

// Play next track
function playNext() {
    if (currentTrackIndex < sampleTracks.length - 1) {
        currentTrackIndex++;
        selectTrack(currentTrackIndex);
    }
    console.log('Next track');
}

// Select and play a track
function selectTrack(index) {
    currentTrackIndex = index;
    const track = sampleTracks[index];
    
    // Update now playing section
    const nowPlayingTitle = document.querySelector('.now-playing-title');
    const nowPlayingArtist = document.querySelector('.now-playing-artist');
    
    nowPlayingTitle.textContent = track.title;
    nowPlayingArtist.textContent = track.artist;
    
    // Highlight selected track
    document.querySelectorAll('.track-card').forEach((card, i) => {
        if (i === index) {
            card.style.backgroundColor = '#282828';
        } else {
            card.style.backgroundColor = '';
        }
    });
    
    // Auto play when track is selected
    if (!isPlaying) {
        togglePlayPause();
    }
    
    console.log('Selected track:', track.title);
}

// Handle volume change
function handleVolumeChange() {
    const volume = volumeSlider.value;
    console.log('Volume:', volume);
    // In the full implementation, this will control audio volume
}

// Handle navigation
function handleNavigation(item) {
    document.querySelectorAll('.nav-item').forEach((navItem) => {
        navItem.classList.remove('active');
    });
    item.classList.add('active');
    console.log('Navigated to:', item.textContent.trim());
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
