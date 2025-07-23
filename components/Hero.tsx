export default function Hero() {
  return (
    <section
      className="relative h-[80vh] flex items-center justify-center"
      style={{
        backgroundImage: "url('/images/hero_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 text-center text-white max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">MARLON nepremičnine</h1>
        <p className="text-lg md:text-xl mb-6">
          Od ust do ust, od priporočila do priporočila ... Z vami že od leta 2007.
        </p>
        <div className="space-x-4">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded">
            Obvestite me o novih nepremičninah
          </button>
          <button className="bg-white text-gray-800 font-semibold py-2 px-4 rounded hover:bg-gray-100">
            Z nami do vašega novega doma.
          </button>
        </div>
      </div>
    </section>
  );
}
