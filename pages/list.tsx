// pages/list.tsx
import { useRouter } from "next/router";
import fs from "fs";
import path from "path";
import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// Property type
interface Property {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  images: string[];
  country: string;
  region: string;
  type: string;
}

export async function getStaticProps() {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "properties.json"
  );
  const fileData = fs.readFileSync(filePath, "utf-8");
  const properties: Property[] = JSON.parse(fileData);

  return {
    props: { properties },
  };
}

export default function PropertyListPage({
  properties,
}: {
  properties: Property[];
}) {
  const router = useRouter();
  const { drzava, regija, vrsta, stran, velikost } = router.query;

  const currentPage = parseInt((stran as string) || "1");
  const pageSize = parseInt((velikost as string) || "10");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      return (
        (!drzava || p.country === drzava) &&
        (!regija || p.region === regija) &&
        (!vrsta || p.type === vrsta)
      );
    });
  }, [drzava, regija, vrsta, properties]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Rezultati iskanja</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {paginated.map((property) => (
            <div key={property.id} className="bg-white shadow p-4 rounded">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h2 className="text-xl font-semibold">{property.title}</h2>
              <p className="text-sm text-gray-500">{property.location}</p>
              <p className="text-green-600 font-bold mt-2">
                {property.price.toLocaleString()} €
              </p>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between items-center mt-8">
          <div>
            <label>Rezultatov na stran: </label>
            <select
              value={pageSize}
              onChange={(e) =>
                router.push({
                  pathname: "/list",
                  query: {
                    ...router.query,
                    velikost: e.target.value,
                    stran: "1",
                  },
                })
              }
              className="ml-2 border px-2 py-1 rounded"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div className="space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() =>
                  router.push({
                    pathname: "/list",
                    query: { ...router.query, stran: num },
                  })
                }
                className={`px-3 py-1 border rounded ${
                  num === currentPage ? "bg-yellow-500 text-white" : "bg-white"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
