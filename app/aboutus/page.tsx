"use client";
import Link from "next/link";

export default function aboutus() {
  const cards = [
    {
      front: "Mission",
      title: "A Journey of Hope and Impact",
      desc: "Our journey began with a simple yet powerful belief that education has the power to transform lives and communities",
    },
    {
      front: "Vision",
      title: "Creating Opportunities, Transforming Lives",
      desc: "We envision a world where every child has access to quality education.",
    },
    {
      front: "Our Story",
      title: "Growing with Excellence",
      desc: "Al Akeel MMV continues to serve the community with dedication and excellence.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <div className="relative w-full h-[400px]">
        <img
          src="/2024/02/banner-4-1.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-3">About Us</h1>
          <p className="text-lg font-semibold">
            <Link href="/">Home</Link>
          </p>
        </div>
      </div>

      {/* YOUR ORIGINAL FLIP CARDS */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600 font-semibold tracking-widest mb-2">
            NONPROFIT FOCUS
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            School Education For Rural Empowerment
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Education serves as the cornerstone of empowerment.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <div key={i} className="group perspective-[1000px]">
                <div className="relative h-64 w-full transition-all duration-700 transform-3d group-hover:rotate-y-180">
                  
                  {/* FRONT */}
                  <div className="absolute inset-0 bg-red-700 text-white rounded-xl flex items-center justify-center backface-hidden">
                    <h3 className="text-2xl font-bold">{card.front}</h3>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 bg-yellow-400 text-black rounded-xl p-6 flex flex-col justify-center rotate-y-180 backface-hidden">
                    <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                    <p className="text-sm">{card.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRINCIPAL (FIXED PROPERLY) */}
      <section className="bg-[#0b3d2e] py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          {/* TEXT */}
          <div className="text-white">
            <h2 className="text-3xl font-bold text-yellow-400 mb-4">
              Principal’s Message
            </h2>

            <p className="mb-4">
              Welcome to <strong>Al Akeel Muslim Maha Vidyalaya, Kotiyakumbura</strong>.
            </p>

            <p className="mb-4">
              Our school provides education from Grade 1 to Grade 13 and focuses on discipline, academic excellence, and character development.
            </p>

            <p className="mb-4">
              We encourage participation in academics, sports, and extracurricular activities.
            </p>

            <p className="font-semibold mt-6">
              Principal – M.R.M. Reeza
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center">
            <img
              src="/2020/09/principal.png"  
              className="w-[280px] h-[350px] object-cover rounded-xl shadow-xl border-4 border-white"
            />
          </div>
        </div>
      </section>

      {/* A/L STREAMS */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Advanced Level Streams</h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl shadow">
            Science Stream
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow">
            Commerce Stream
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow">
            Arts Stream
          </div>
        </div>
      </section>

      {/* LABS */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Laboratories</h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Physics Lab", "Chemistry Lab", "Biology Lab", "ICT Lab"].map(
            (lab, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                {lab}
              </div>
            )
          )}
        </div>
      </section>

      {/* SPORTS */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-10">Sports</h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Cricket", "Football", "Volleyball", "Athletics"].map(
            (sport, i) => (
              <div key={i} className="bg-red-50 p-6 rounded-xl shadow">
                {sport}
              </div>
            )
          )}
        </div>
      </section>

      {/* FACILITIES */}
      <section className="py-16 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">Facilities</h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["Library", "Smart Classes", "Computer Lab", "Playground"].map(
            (item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow">
                {item}
              </div>
            )
          )}
        </div>
      </section>
    </>
  );
}