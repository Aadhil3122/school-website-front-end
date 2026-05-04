import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] bg-cover bg-center"
      style={{ backgroundImage: "url('/2024/02/al akkel front photo.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-green-900/70"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <p className="text-yellow-400 font-semibold text-xl mb-4">
          EXCELLENCE IN EDUCATION SINCE 1925
        </p>

        <h1 className="text-white text-4xl md:text-6xl font-extrabold mb-4">
          WELCOME TO AL AKEEL MMV KOTIYAKUMBURA
        </h1>

        <p className="text-gray-200 mb-8 max-w-2xl">
          Graded as 1AB Super School by Ministry of Education Sri Lanka.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/aboutus"
            className="bg-green-600 text-white text-center hover:bg-green-700 px-6 py-3 font-semibold rounded transition"
          >
            LEARN ABOUT US
          </Link>

          <Link
            href="/contact"
            className="border border-white text-white text-center px-6 py-3 font-semibold rounded hover:bg-white hover:text-black transition"
          >
            CONNECT WITH US
          </Link>
        </div>
      </div>
    </section>
  );
}
