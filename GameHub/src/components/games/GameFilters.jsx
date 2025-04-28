function GameFilters({ genre, setGenre, platform, setPlatform, sort, setSort, handleReset }) {
  const genres = ['Action', 'Sports', 'Racing', 'Adventure'];
  const platforms = ['PC', 'PlayStation', 'Xbox', 'Nintendo'];
  const sortOptions = [
    { value: '', label: 'None' },
    { value: 'price', label: 'Price: Low to High' },
    { value: 'rating', label: 'Rating: High to Low' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Filter Games</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <select
            id="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
            aria-label="Select game genre"
          >
            <option value="">All Genres</option>
            {genres.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="platform" className="block text-sm font-medium text-gray-700">
            Platform
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
            aria-label="Select game platform"
          >
            <option value="">All Platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
            aria-label="Select sort option"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={() => {
          console.log('Reset button clicked');
          handleReset();
        }}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        aria-label="Reset all filters"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default GameFilters;