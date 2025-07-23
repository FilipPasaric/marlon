import React from 'react'
import { Building2, Home, Briefcase, TreePine, Key, Bookmark } from 'lucide-react'

const categories = [
  { label: 'Hiše', icon: <Home size={36} /> },
  { label: 'Stanovanja', icon: <Building2 size={36} /> },
  { label: 'Poslovni Prostor', icon: <Briefcase size={36} /> },
  { label: 'Zemljišča', icon: <TreePine size={36} /> },
  { label: 'Počitniški objekti', icon: <Key size={36} /> },
  { label: 'Garaže', icon: <Bookmark size={36} /> },
]

export default function CategoryGrid() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 text-center">
          {categories.map((category) => (
            <div
              key={category.label}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow hover:bg-yellow-100 transition"
            >
              <div className="mb-2 text-yellow-600">{category.icon}</div>
              <span className="font-medium text-sm">{category.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

