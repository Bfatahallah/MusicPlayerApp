import { create } from 'zustand';

const useMusicStore = create((set) => ({
  searchQuery: '',
  results: [],
  currentTrack: null,
  isPlaying: false,
  audio: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  searchDeezer: async (query) => {
    if (!query.trim()) {
      set({ results: [] });
      return;
    }

    console.log('Searching for:', query);

    try {
      // Use our backend server to proxy the request
      const backendUrl = `http://localhost:3001/api/search?q=${encodeURIComponent(query)}`;
      
      console.log('Fetching from backend:', backendUrl);
      
      const response = await fetch(backendUrl);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Data received from backend:', data);
      
      const tracks = data.data || [];
      console.log('Found tracks:', tracks.length);
      
      set({ results: tracks });
      
      if (tracks.length === 0) {
        console.warn('No results found for query');
      }
    } catch (error) {
      console.error('Search error:', error);
      set({ results: [] });
    }
  },

  selectTrack: (track) => {
    set((state) => {
      // Stop current audio if playing
      if (state.audio) {
        state.audio.pause();
        state.audio.currentTime = 0;
      }

      // Check if track has preview
      if (!track.preview) {
        console.error('Track does not have a preview');
        return state;
      }

      // Create new audio element
      const audio = new Audio(track.preview);
      audio.onended = () => set({ isPlaying: false });

      // Auto play
      audio.play().catch((err) => console.error('Error playing audio:', err));

      return {
        currentTrack: track,
        isPlaying: true,
        audio: audio,
      };
    });
  },

  togglePlayPause: () => {
    set((state) => {
      if (!state.audio) return state;

      if (state.isPlaying) {
        state.audio.pause();
      } else {
        state.audio.play().catch((err) => console.error('Error playing audio:', err));
      }

      return { isPlaying: !state.isPlaying };
    });
  },

  stopTrack: () => {
    set((state) => {
      if (state.audio) {
        state.audio.pause();
        state.audio.currentTime = 0;
      }
      return { currentTrack: null, isPlaying: false };
    });
  },
}));

export default useMusicStore;
