import fs from "fs";
import path from "path";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { useState, useMemo } from "react";
import AdminSearchBar from "@/components/AdminSearchBar";

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
};

type Props = {
  properties: Property[];
};

export default function AdminDashboard({ properties }: Props) {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const filteredProperties = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLocation = locationFilter
        ? p.location === locationFilter
        : true;

      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, locationFilter, properties]);

  const uniqueLocations = Array.from(new Set(properties.map((p) => p.location)));

  const handleDelete = async (id: number) => {
    if (!confirm("Si prepričan, da želiš izbrisati to nepremičnino?")) return;

    const res = await fetch(`/api/properties/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.reload();
    } else {
      alert("Napaka pri brisanju.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🛠 Admin nadzorna plošča</h1>
          <Link href="/admin/new">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              ➕ Dodaj nepremičnino
            </button>
          </Link>
        </div>

        {/* Iskalnik & filter */}
        <AdminSearchBar
          onSearch={setSearchQuery}
          onLocationFilter={setLocationFilter}
          locations={uniqueLocations}
        />

        {/* Tabela z rezultati */}
        <table className="w-full border mt-6">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Naslov</th>
              <th className="p-2">Lokacija</th>
              <th className="p-2">Cena</th>
              <th className="p-2">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{property.id}</td>
                <td className="p-2">{property.title}</td>
                <td className="p-2">{property.location}</td>
                <td className="p-2">{property.price.toLocaleString()} €</td>
                <td className="p-2 space-x-2">
                  <Link href={`/admin/${property.id}`}>
                    <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                      ✏️ Uredi
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(property.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    ❌ Izbriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredProperties.length === 0 && (
          <p className="text-gray-500 mt-4">Ni zadetkov.</p>
        )}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const filePath = path.join(process.cwd(), "public", "data", "properties.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const properties: Property[] = JSON.parse(fileData);

  return {
    props: {
      properties,
    },
  };
};
