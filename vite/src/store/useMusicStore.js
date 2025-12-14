import { create } from 'zustand';

// Helper: Group tracks by album
const groupByAlbum = (tracks) => {
  const albumMap = {};
  tracks.forEach((track) => {
    const albumId = track.album?.id || 'unknown';
    if (!albumMap[albumId]) {
      albumMap[albumId] = {
        id: albumId,
        title: track.album?.title || 'Unknown Album',
        artist: track.artist || { name: 'Unknown Artist' },
        cover: track.album?.cover_medium || null,
        releaseDate: track.album?.release_date || null,
        tracks: [],
      };
    }
    albumMap[albumId].tracks.push(track);
  });
  return Object.values(albumMap);
};

// Helper: Sort albums by different criteria
const sortAlbums = (albums, sortBy) => {
  const copy = [...albums];
  switch (sortBy) {
    case 'name-asc':
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case 'artist-asc':
      return copy.sort((a, b) => a.artist.name.localeCompare(b.artist.name));
    case 'date-new':
      return copy.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    default:
      return copy;
  }
};

// Helper: Filter albums by artist or search term
const filterAlbums = (albums, filterBy) => {
  if (!filterBy || !filterBy.trim()) return albums;
  const lower = filterBy.toLowerCase();
  return albums.filter(
    (album) =>
      album.title.toLowerCase().includes(lower) ||
      album.artist.name.toLowerCase().includes(lower)
  );
};

const useMusicStore = create((set) => ({
  searchQuery: '',
  results: [], // raw tracks from API
  albums: [], // grouped and sorted albums
  currentTrack: null,
  isPlaying: false,
  audio: null,
  isLoading: false,
  sortBy: 'date-new', // date-new, name-asc, artist-asc
  filterBy: '', // artist or album name filter
  offset: 0, // for pagination
  hasMore: true, // whether more results available
  expandedAlbumId: null, // track which album is expanded

  setSearchQuery: (query) => set({ searchQuery: query, offset: 0, hasMore: true, results: [], albums: [] }),

  setSortBy: (sortBy) =>
    set((state) => ({
      sortBy,
      albums: sortAlbums(filterAlbums(groupByAlbum(state.results), state.filterBy), sortBy),
    })),

  setFilterBy: (filterBy) =>
    set((state) => ({
      filterBy,
      albums: sortAlbums(filterAlbums(groupByAlbum(state.results), filterBy), state.sortBy),
    })),

  setExpandedAlbumId: (albumId) => set({ expandedAlbumId: albumId }),

  // Fetches from local backend or Vercel serverless API
  searchDeezer: async (query, pagination = false) => {
    if (!query || !query.trim()) {
      set({ results: [], albums: [], isLoading: false, offset: 0 });
      return;
    }

    set({ isLoading: true });

    try {
      // Use /api/search which works locally and on Vercel
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        console.error(`API Error: ${response.status} ${response.statusText}`);
        set({ results: [], albums: [], isLoading: false });
        return;
      }

      const data = await response.json();
      const tracks = Array.isArray(data.data) ? data.data : [];

      // If pagination, append to existing results; otherwise, replace
      set((state) => {
        const allTracks = pagination ? [...state.results, ...tracks] : tracks;
        const grouped = groupByAlbum(allTracks);
        const filtered = filterAlbums(grouped, state.filterBy);
        const sorted = sortAlbums(filtered, state.sortBy);

        return {
          results: allTracks,
          albums: sorted,
          isLoading: false,
          offset: state.offset + 1,
          hasMore: tracks.length > 0, // simple check
        };
      });
    } catch (err) {
      console.error('Search failed:', err);
      set({ isLoading: false });
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
