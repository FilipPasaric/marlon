import fs from "fs";
import path from "path";
import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import SearchFilter from "@/components/SearchFilter";
import Link from "next/link";
import Slider from "react-slick";

type Property = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  images: string[];
};

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

export default function Home({ properties }: { properties: Property[] }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero section */}
      <Hero />

      {/* Kategorije */}
      <CategoryGrid />

      {/* Iskalnik */}
      <SearchFilter />

      {/* Main content: seznam nepremičnin */}
      <main className="flex-grow p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Ponudba nepremičnin
        </h2>
        <Slider
          dots={true}
          arrows={true}
          infinite={false}
          speed={500}
          slidesToShow={3}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 1024,
              settings: { slidesToShow: 2 },
            },
            {
              breakpoint: 640,
              settings: { slidesToShow: 1 },
            },
          ]}
        >
          {properties.map((property) => (
            <div key={property.id} className="px-2">
              <Link href={`/nepremicnine/${property.id}`}>
                <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900">
                      {property.title}
                    </h3>
                    <span className="text-sm text-gray-500 mb-1">
                      {property.location}
                    </span>
                    <p className="text-sm text-gray-700 flex-grow">
                      {property.description}
                    </p>
                    <p className="text-green-700 font-bold text-lg mt-3">
                      {property.price.toLocaleString()} €
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Marlon Nepremičnine. Vse pravice
        pridržane.
      </footer>
    </div>
  );
}
