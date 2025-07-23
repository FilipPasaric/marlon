export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-800">marlon Nepremičnine</h1>
        <nav className="space-x-4 text-sm text-gray-600">
          <a href="/" className="hover:text-green-800">Domov</a>
          <a href="/admin" className="hover:text-green-800">Admin</a>
        </nav>
      </div>
    </header>
  )
}
