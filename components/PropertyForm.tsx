import { useState } from "react";

type Props = {
  initialData?: any;
  onSubmit: (data: any) => void;
};

const allFeatures = [
  "Balkon",
  "Klet",
  "Parkirno mesto",
  "Internet",
];

const heatingOptions = [
  "Toplovod",
  "Plin",
  "Toplotna črpalka",
  "Drva / Peleti",
  "Elektrika",
];

const energyOptions = [
  "A+", "A", "B", "C", "D", "E", "F", "G",
];

export default function PropertyForm({ initialData = {}, onSubmit }: Props) {
  const [title, setTitle] = useState(initialData.title || "");
  const [location, setLocation] = useState(initialData.location || "");
  const [price, setPrice] = useState(initialData.price || 0);
  const [area, setArea] = useState(initialData.area || 0);
  const [floor, setFloor] = useState(initialData.floor || "");
  const [rooms, setRooms] = useState(initialData.rooms || 1);
  const [features, setFeatures] = useState<string[]>(initialData.features || []);
  const [heating, setHeating] = useState(initialData.heating || "");
  const [energyClass, setEnergyClass] = useState(initialData.energyClass || "");

  const toggleFeature = (f: string) => {
    setFeatures((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      location,
      price,
      area,
      floor,
      rooms,
      features,
      heating,
      energyClass,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Naslov</label>
        <input
          className="border w-full p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block">Lokacija</label>
        <input
          className="border w-full p-2"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Cena (€)</label>
          <input
            type="number"
            className="border w-full p-2"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block">Velikost (m²)</label>
          <input
            type="number"
            className="border w-full p-2"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label className="block">Število sob</label>
          <input
            type="number"
            className="border w-full p-2"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block">Nadstropje</label>
          <input
            className="border w-full p-2"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Lastnosti</label>
        <div className="flex flex-wrap gap-4">
          {allFeatures.map((f) => (
            <label key={f} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={features.includes(f)}
                onChange={() => toggleFeature(f)}
              />
              <span>{f}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Vrsta ogrevanja</label>
          <select
            className="border w-full p-2"
            value={heating}
            onChange={(e) => setHeating(e.target.value)}
          >
            <option value="">Izberi...</option>
            {heatingOptions.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block">Energijski razred</label>
          <select
            className="border w-full p-2"
            value={energyClass}
            onChange={(e) => setEnergyClass(e.target.value)}
          >
            <option value="">Izberi...</option>
            {energyOptions.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Shrani nepremičnino
      </button>
    </form>
  );
}
