"use client";

export default function VisionCard() {
  const cards = [
    {
      front: "Mission",
      title: "A Journey of Hope and Impact",
      desc: "Our journey began with a simple yet powerful belief that education has the power to transform lives and communities",
    },
    {
      front: "Vision",
      title: "Creating Opportunities, Transforming Lives",
      desc: "We envision a world where every child, regardless of their background, has access to quality education and the opportunity to fulfill their potential.",
    },
    {
      front: "Our Story",
      title: "A Journey of Hope and Impact",
      desc: "Our journey began with a simple yet powerful belief that education has the power to transform lives and communities",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">

        {/* Heading */}
        <p className="text-red-600 font-semibold tracking-widest mb-2">
          NONPROFIT FOCUS
        </p>

        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          School Education For Rural Empowerment
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Education serves as the cornerstone of empowerment for rural communities.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <div key={i} className="group [perspective:1000px]">

              <div className="relative h-64 w-full transition-all duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* FRONT */}
                <div className="absolute inset-0 bg-red-700 text-white rounded-xl flex items-center justify-center [backface-visibility:hidden]">
                  <h3 className="text-2xl font-bold">{card.front}</h3>
                </div>

                {/* BACK */}
                <div className="absolute inset-0 bg-yellow-400 text-black rounded-xl p-6 flex flex-col justify-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  
                  <h3 className="text-lg font-bold mb-2">
                    {card.title}
                  </h3>

                  <p className="text-sm mb-4 leading-relaxed">
                    {card.desc}
                  </p>

                  <span className="underline font-semibold cursor-pointer hover:text-red-700 transition">
                    READ MORE
                  </span>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}