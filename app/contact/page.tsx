"use client";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

import { useState } from "react";
import Link from "next/link";
export default function ContactPage() {
  return (
    <>
      <div className="relative w-full h-[420px]">
        <img
          src="/2024/02/banner-4-1.jpg"
          alt="building"
          className="absolute inset-0 w-full   h- full object-cover h-[420px]"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-3">Contacts</h1>

          <p className="text-lg font-semibold">
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </p>
        </div>
      </div>

      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-green-800">
              CONNECT WITH COLLEGE
            </h2>
            <p className="text-gray-600 text-sm">
              Our Students Share their Success Stories
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* LEFT SIDE */}
            <div>
              {/* Emergency */}
              <div className="bg-green-500 text-white p-6 hover:bg-red-600 rounded-xl mb-6 flex justify-between items-center">
                <div>
                  <p className="text-sm">Contact for Emergency needs only</p>
                  <h3 className="text-xl font-bold">School Emergency Line</h3>
                </div>
                <div className="bg-white text-green-500 p-3 rounded-full">
                  <FaPhone />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <a
                    href="https://maps.google.com/maps?q=Kotiyakumbura%20Kegalle%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaMapMarkerAlt className="text-green-700 hover:bg-yellow-400 w-5 h-5" />
                  </a>
                  <div className="flex flex-col">
                    <p className="text-black">Visit Us</p>
                    <p className="text-sm">AL-AKEEL-MMV</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a href="tel:0352289099">
                    <FaPhone className="text-green-500 hover:bg-yellow-400 w-5 h-5" />
                  </a>

                  <div className="flex flex-col">
                    <p className="text-black">Call Us</p>
                    <p className="text-sm">0352289099</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a href="mailto:contact@alakeelmmv.com">
                    <FaEnvelope className="text-green-700 hover:bg-yellow-400 w-5 h-5" />
                  </a>
                  <div className="flex flex-col">
                    <p className="text-black">Mail Us</p>
                    <p className="text-sm">contact@alakeelmmv.com</p>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="rounded-xl overflow-hidden shadow">
                <iframe
                  src="https://maps.google.com/maps?q=Kotiyakumbura%20Kegalle%20Sri%20Lanka&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="250"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* RIGHT SIDE (FORM) */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                PLACE YOUR INQUIRY
              </h3>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name *"
                  className="w-full border p-2 rounded"
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address *"
                  className="w-full border p-2 rounded"
                  required
                />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border p-2 rounded"
                />

                <textarea
                  placeholder="Message"
                  className="w-full border p-2 rounded h-28"
                />

                <button
                  type="submit"
                  className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
