import { create } from 'zustand';

const useMusicStore = create((set) => ({
  searchQuery: '',
  results: [],
  currentTrack: null,
  isPlaying: false,
  audio: null,

  setSearchQuery: (query) => set({ searchQuery: query }),

  // Fetches from the Vercel serverless API route at /api/deezer
  searchDeezer: async (query) => {
    if (!query || !query.trim()) {
      set({ results: [] });
      return;
    }

    try {
      const response = await fetch(`/api/deezer?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        set({ results: [] });
        return;
      }

      const data = await response.json();
      const tracks = Array.isArray(data.data) ? data.data : [];
      set({ results: tracks });
    } catch (err) {
      set({ results: [] });
    }
  },

  selectTrack: (track) => {
    set((state) => {
      if (state.audio) {
        state.audio.pause();
        state.audio.currentTime = 0;
      }

      if (!track || !track.preview) {
        return state;
      }

      const audio = new Audio(track.preview);
      audio.onended = () => set({ isPlaying: false });
      // Attempt to play; ignore play Promise errors in browsers that block autoplay
      audio.play().catch(() => {});

      return {
        currentTrack: track,
        isPlaying: true,
        audio,
      };
    });
  },

  togglePlayPause: () => {
    set((state) => {
      if (!state.audio) return state;

      if (state.isPlaying) {
        state.audio.pause();
      } else {
        state.audio.play().catch(() => {});
      }

      return { isPlaying: !state.isPlaying };
    });
  },

  stopTrack: () => {
    set((state) => {
      if (state.audio) {
        state.audio.pause();
        try {
          state.audio.currentTime = 0;
        } catch (e) {}
      }
      return { currentTrack: null, isPlaying: false };
    });
  },
}));

export default useMusicStore;
