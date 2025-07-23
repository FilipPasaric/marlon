type Props = {
  onSearch: (query: string) => void;
  onLocationFilter: (location: string) => void;
  locations: string[];
};

export default function AdminSearchBar({ onSearch, onLocationFilter, locations }: Props) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="text"
        placeholder="Išči po naslovu ali lokaciji..."
        onChange={(e) => onSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full sm:w-1/2"
      />

      <select
        onChange={(e) => onLocationFilter(e.target.value)}
        className="border rounded px-3 py-2 w-full sm:w-1/3"
      >
        <option value="">Filtriraj po lokaciji</option>
        {locations.map((loc, idx) => (
          <option key={idx} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}
