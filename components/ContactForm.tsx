import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    property: "",
    captcha: "",
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    const isCheckbox = type === "checkbox";

    setForm({
      ...form,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Osnovna validacija
    if (!form.name || !form.email || !form.message || !form.agree) {
      alert("Prosimo, izpolnite vsa obvezna polja in potrdite pogoje.");
      return;
    }

    // Simulacija pošiljanja
    alert(
      `Sporočilo poslano! (ne zares)\nIme: ${form.name}\nE-mail: ${form.email}`
    );
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src="/images/agent.jpg"
          alt="Agentka"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold">Mojca Žižek Mesarec</p>
          <p className="text-sm text-yellow-700">📞 070 720 050</p>
          <p className="text-sm text-yellow-700">📧 mojca@galea.si</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Ime"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="phone"
          placeholder="Telefon"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="E-pošta"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="message"
          placeholder="Vaše sporočilo"
          value={form.message}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 h-24"
        />
        <div>
          <label className="block text-sm font-medium">Izberite</label>
          <select
            name="property"
            value={form.property}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Izberi</option>
            <option value="Hisa">Hiša</option>
            <option value="Stanovanje">Stanovanje</option>
            <option value="Poslovni prostor">Poslovni prostor</option>
          </select>
        </div>
        <input
          type="text"
          name="captcha"
          placeholder="Prepišite številke: 309117"
          value={form.captcha}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
        <label className="text-sm flex items-center space-x-2">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
          />
          <span>S potrditvijo tega sporočila se strinjam s splošni pogoji</span>
        </label>
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded"
        >
          Pošlji sporočilo
        </button>
      </form>
    </div>
  );
}
