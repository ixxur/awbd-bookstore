function SortSelect({ sortMethod, setSortMethod }) {
  return (
    <div>
      <label
        htmlFor="SortBy"
        className="block text-xs font-medium text-gray-700"
      >
        Sort By
      </label>
      <select
        id="SortBy"
        value={sortMethod}
        onChange={(e) => setSortMethod(e.target.value)}
        className="mt-1 p-2 bg-gray-100 rounded text-sm shadow-sm"
      >
        <option value="">Select</option>
        <option value="Title, ASC">Title (A-Z)</option>
        <option value="Title, DESC">Title (Z-A)</option>
        <option value="Price, ASC">Price (Low to High)</option>
        <option value="Price, DESC">Price (High to Low)</option>
      </select>
    </div>
  )
}

export default SortSelect
