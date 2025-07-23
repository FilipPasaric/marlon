import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchFilter() {
  const router = useRouter();

  const [country, setCountry] = useState("Slovenija");
  const [region, setRegion] = useState("Vse regije");
  const [type, setType] = useState("Vse vrste");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: "/list",
      query: {
        country,
        region,
        type,
        page: 1,
        pageSize: 10,
      },
    });
  };

  return (
    <section className="py-8 px-4 bg-white shadow-md -mt-10 z-20 relative max-w-4xl mx-auto rounded-xl">
      <form
        onSubmit={handleSearch}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="text-sm text-gray-700">Država</label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option>Slovenija</option>
            <option>Hrvaška</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-700">Regija</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option>Vse regije</option>
            <option>Ljubljana</option>
            <option>Maribor</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-700">Vrsta</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option>Vse vrste</option>
            <option>Hiša</option>
            <option>Stanovanje</option>
            <option>Poslovni prostor</option>
          </select>
        </div>
        <div className="col-span-1 md:col-span-1">
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
          >
            Najdi nepremičnino
          </button>
        </div>
      </form>
    </section>
  );
}
