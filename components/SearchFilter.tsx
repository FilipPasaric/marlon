import React from 'react'

export default function SearchFilter() {
  return (
    <section className="py-8 px-4 bg-white shadow-md -mt-10 z-20 relative max-w-4xl mx-auto rounded-xl">
      <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="text-sm text-gray-700">Država</label>
          <select className="w-full border rounded px-3 py-2">
            <option>Slovenija</option>
            <option>Hrvaška</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-700">Regija</label>
          <select className="w-full border rounded px-3 py-2">
            <option>Vse regije</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-700">Vrsta</label>
          <select className="w-full border rounded px-3 py-2">
            <option>Vse vrste</option>
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
  )
}
