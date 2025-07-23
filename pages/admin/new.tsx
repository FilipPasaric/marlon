import { useRouter } from "next/router";
import PropertyForm from "@/components/PropertyForm";

export default function NewPropertyPage() {
  const router = useRouter();

  const handleCreate = async (data: any) => {
    const property = {
      ...data,
      id: Date.now(), // začasni ID — zamenjaj s UUID ali auto-increment če greš na bazo
      images: [], // dodaj kasneje
      description: "", // prazno za zdaj
      seller: {
        name: "Admin",
        phone: "",
        email: "",
      },
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
