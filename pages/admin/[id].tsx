import { GetServerSideProps } from "next";
import fs from "fs";
import path from "path";
import { useRouter } from "next/router";
import PropertyForm from "@/components/PropertyForm";

type Property = {
  id: number;
  title: string;
  location: string;
  description: string;
  price: number;
  area: number;
  floor?: string;
  features: string[];
  rooms?: number;
  heating?: string;
  energyClass?: string;
  seller: {
    name: string;
    phone: string;
    email: string;
  };
  images: string[];
};

type Props = {
  property: Property;
};

export default function EditPropertyPage({ property }: Props) {
  const router = useRouter();

  const handleUpdate = async (data: any) => {
    const updated = {
      ...property,
      ...data,
    };

    const res = await fetch(`/api/properties/${property.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Napaka pri posodabljanju.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-6">✏️ Uredi nepremičnino</h1>
        <PropertyForm initialData={property} onSubmit={handleUpdate} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const filePath = path.join(process.cwd(), "public", "data", "properties.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const properties: Property[] = JSON.parse(fileData);

  const property = properties.find((p) => p.id.toString() === params?.id);

  if (!property) {
    return { notFound: true };
  }

  return {
    props: {
      property,
    },
  };
};
