"use client";

import { useEffect, useState } from "react";
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

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  points: string[];
}

export default function News() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/news")
      .then((res) => res.json())
      .then((data) => {
        setNewsList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setNewsList([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#f4f6fa] py-10 px-4 sm:px-6 lg:px-10">
      {/* HERO BANNER */}
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
          {/* NEWS LIST */}
          <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-2">
              News Bulletin
            </p>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Latest School Notices
            </h2>

            {/* Loading */}
            {loading && (
              <div className="text-center py-10 text-gray-400 text-sm">
                Loading news...
              </div>
            )}

            {/* No news */}
            {!loading && newsList.length === 0 && (
              <div className="text-center py-10 text-gray-400 text-sm">
                No news available at the moment.
              </div>
            )}

            {/* News items from MongoDB */}
            <div className="space-y-8">
              {newsList.map((item) => (
                <div
                  key={item._id}
                  className="rounded-3xl border border-gray-100 bg-white shadow-md overflow-hidden"
                >
                  {/* Image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-80 object-cover"
                    />
                  )}

                  <div className="p-6">
                    {/* Date badge */}
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                      {item.date}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-gray-600 leading-7 mb-4">
                      {item.summary}
                    </p>

                    {/* Points */}
                    {item.points && item.points.length > 0 && (
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
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ASSOCIATIONS */}
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

        {/* SIDEBAR */}
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
