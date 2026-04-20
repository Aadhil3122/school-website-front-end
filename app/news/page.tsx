"use client";

import Link from "next/link";

const associationItems = [
  {
    title: "Old Boys Association (OBA)",
    description:
      "Our alumni body supports school development, student mentorship and community events.",
  },
  {
    title: "Old Girls Association (OGA)",
    description:
      "Former students work with the school on scholarships, welfare projects, and cultural programs.",
  },
  {
    title: "Students' Council (STC)",
    description:
      "The student body voice organizes leadership activities, clubs, and school campaigns.",
  },
  {
    title: "Parents-Teachers Association (PTA)",
    description:
      "Parents and teachers collaborate to improve school welfare, facilities and student support.",
  },
];

const newsItems = [
  {
    title: "Grade 05 Scholarship Exam Achievements - 2025",
    date: "2025",
    type: "single",
    image: "/scolarship.jpeg",
    summary:
      "We proudly congratulate our talented students for achieving excellent results in the Grade 05 Scholarship Examination 2025 and bringing honour to the school.",
    points: [
      "A. Nuha scored 169 marks.",
      "M.R.F Rusaina scored 147 marks.",
      "M.F Asma scored 146 marks.",
      "M.I Mahi scored 144 marks.",
      "M.S.M Sumair scored 135 marks.",
      "M.A Hairath & M.F.P Minha scored 134 marks.",
    ],
  },

  {
    title: "Akeelians OBA Football Fiesta",
    date: "2024 December 06 & 07",
    type: "single",
    image: "/football match .jpeg",
    summary:
      "The Old Boys Association proudly organized a grand football fiesta at Al Akeel School Ground with past pupils and football lovers joining the exciting tournament.",
    points: [
      "Held at Al Akeel School Ground from 8.00 AM onwards.",
      "Champion and Runner-up trophies awarded.",
      "Best Player and Best Goalkeeper trophies presented.",
      "Open for 2024 O/L batches onwards.",
      "Strong support from past pupils and community.",
    ],
  },

  {
    title: "Building Opening Ceremony",
    date: "2025 October 11",
    type: "gallery",
    images: [
      "/building opening 1.jpeg",
      "/building opening 2.jpeg",
      "/building opening 3.jpeg",
      "/building opening 4.jpeg",
      "/building opening 5.jpeg",
    ],
    summary:
      "A memorable ceremony was held to officially open the new school building with guests, teachers, parents and students.",
    points: [
      "Ribbon cutting ceremony completed successfully.",
      "New classrooms and facilities introduced.",
      "Students performed welcome events.",
      "Special guests delivered speeches.",
      "Refreshments served after ceremony.",
    ],
  },

  {
    title: "Counselling Programme for Girls",
    date: "2025.07.15",
    type: "single",
    image: "/counselling girls.jpeg",
    summary:
      "A special guidance and counselling programme was conducted for girl students.",
    points: [
      "Professional counsellors guided the session.",
      "Focused on confidence and wellbeing.",
      "Students joined interactive activities.",
    ],
  },
];

export default function News() {
  return (
    <div className="min-h-screen bg-[#f4f6fa] py-10 px-4 sm:px-6 lg:px-10">
      <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-white">
        <div className="relative h-[320px] sm:h-[360px] lg:h-[420px]">
          <img
            src="/2024/02/banner-4-1.jpg"
            alt="school"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/60" />

          <div className="absolute inset-0 z-10 flex flex-col justify-end p-8 sm:p-10">
            <p className="text-sm uppercase tracking-[0.3em] text-green-200 mb-4">
              Latest Announcements
            </p>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
              School News & Community Updates
            </h1>

            <p className="max-w-2xl text-sm sm:text-base text-gray-200">
              Stay informed about events, sports, ceremonies and student
              activities.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.5fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
              News Bulletin
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Latest School Notices
            </h2>

            <div className="space-y-8">
              {newsItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-100 bg-white shadow-md overflow-hidden"
                >
                  {item.type === "gallery" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-3">
                      {item.images?.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="gallery"
                          className="w-full h-44 object-cover rounded-2xl"
                        />
                      ))}
                    </div>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-80 object-cover"
                    />
                  )}

                  <div className="p-6">
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                      {item.date}
                    </span>

                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      {item.summary}
                    </p>

                    <ul className="space-y-2">
                      {item.points.map((point, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700 flex gap-2"
                        >
                          <span className="text-green-600">✔</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              School Community
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Student Associations & Alumni
            </h2>

            <div className="space-y-4">
              {associationItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-gray-100 p-5 hover:border-green-200 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
              Quick Links
            </p>

            <div className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/aboutus" },
                { label: "Contact", href: "/contact" },
                { label: "Student Progress", href: "/studentprogressreport" },
                { label: "Login / Portal", href: "/login" },
              ].map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="block rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-sm text-gray-700 hover:bg-green-50 transition"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
