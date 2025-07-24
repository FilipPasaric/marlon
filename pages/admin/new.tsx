import { useRouter } from "next/router";
import PropertyForm from "@/components/PropertyForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import type { Property } from "@/types/property";

export default function NewPropertyPage() {
  const router = useRouter();

  const handleCreate = async (data: Partial<Property>) => {
    const property: Property = {
      ...data,
      id: Date.now(),
      images: data.images ?? [],
      description: data.description ?? "",
      features: data.features ?? [],
      area: data.area ?? 0,
      price: data.price ?? 0,
      floor: data.floor ?? "",
      location: data.location ?? "",
      title: data.title ?? "Neimenovana nepremičnina",
      seller: {
        name: data.seller?.name ?? "",
        phone: data.seller?.phone ?? "",
        email: data.seller?.email ?? "",
      },
      city: data.city ?? "",
      postalCode: data.postalCode ?? "",
      type: data.type ?? "", // npr. stanovanje, hiša, parcela
      yearBuilt: data.yearBuilt ?? null,
    };

    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      alert("Napaka pri dodajanju.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-6">➕ Dodaj nepremičnino</h1>
        <PropertyForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
