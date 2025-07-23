import fs from "fs";
import path from "path";
import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

type Property = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  area: number;
  images: string[];
  features: string[];
  mapEmbedUrl?: string;
  floor?: string;
  reference?: string;
  seller?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website?: string;
  };
};

type Props = {
  property: Property;
};

export default function PropertyPage({ property }: Props) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 space-y-12">
        {/* Naslov, lokacija, ref št. */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
          <p className="text-gray-600">{property.location}</p>
          {property.reference && (
            <p className="text-sm text-gray-400 mt-1">
              Referenčna št.: {property.reference}
            </p>
          )}
        </div>

        {/* Kvadratura, nadstropje, cena */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-lg text-gray-800">
          <div>
            Velikost: <span className="font-semibold">{property.area} m²</span>
          </div>
          {property.floor && (
            <div>
              Nadstropje:{" "}
              <span className="font-semibold">{property.floor}</span>
            </div>
          )}
          <div>
            Cena:{" "}
            <span className="text-green-700 font-bold text-xl">
              {property.price.toLocaleString()} €
            </span>
          </div>
        </div>

        {/* Galerija z lightboxom */}
        <div>
          <img
            src={property.images[0]}
            alt="Glavna slika"
            className="w-full h-[450px] object-cover rounded-lg shadow mb-4 cursor-pointer"
            onClick={() => openLightbox(0)}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {property.images.slice(1).map((img, idx) => (
              <img
                key={idx + 1}
                src={img}
                alt={`slika ${idx + 2}`}
                className="w-full h-24 object-cover rounded border cursor-pointer hover:opacity-80"
                onClick={() => openLightbox(idx + 1)}
              />
            ))}
          </div>

          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={lightboxIndex}
            slides={property.images.map((src) => ({ src }))}
            plugins={[Zoom, Captions]}
            render={{
              buttonClose: () => (
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="absolute top-4 right-4 text-white text-3xl font-bold z-[9999]"
                  aria-label="Zapri"
                >
                  ×
                </button>
              ),
            }}
            styles={{
              container: {
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(6px)",
              },
            }}
          />
        </div>

        {/* Opis + Kontaktni obrazec ob strani */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Opis */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-2xl font-semibold mb-2">Dodaten opis</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* RIGHT: Kontaktni obrazec */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">
                Pošljite povpraševanje
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Lastnosti */}
        {property.features?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              Lastnosti nepremičnine
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 list-disc list-inside">
              {property.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Mapa */}
        {property.mapEmbedUrl && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Lokacija</h2>
            <iframe
              src={property.mapEmbedUrl}
              loading="lazy"
              className="w-full h-96 border rounded-md"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        )}

        {/* Kontaktni podatki ponudnika */}
        {property.seller && (
          <div className="bg-white border p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Kontaktni podatki</h2>
            <p>
              <strong>{property.seller.name}</strong>
            </p>
            <p>{property.seller.address}</p>
            <p>
              Telefon:{" "}
              <a
                href={`tel:${property.seller.phone}`}
                className="text-blue-700"
              >
                {property.seller.phone}
              </a>
            </p>
            <p>
              Email:{" "}
              <a
                href={`mailto:${property.seller.email}`}
                className="text-blue-700"
              >
                {property.seller.email}
              </a>
            </p>
            {property.seller.website && (
              <p>
                Spletna stran:{" "}
                <a
                  href={property.seller.website}
                  target="_blank"
                  className="text-blue-700 underline"
                >
                  {property.seller.website}
                </a>
              </p>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "properties.json"
  );
  const fileData = fs.readFileSync(filePath, "utf-8");
  const properties: Property[] = JSON.parse(fileData);

  const paths = properties.map((property) => ({
    params: { id: property.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "properties.json"
  );
  const fileData = fs.readFileSync(filePath, "utf-8");
  const properties: Property[] = JSON.parse(fileData);

  const property = properties.find((p) => p.id.toString() === params?.id);

  return {
    props: {
      property,
    },
  };
};
