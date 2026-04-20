"use client";

import Link from "next/link";

import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white px-10 py-12">
      {/* TOP */}
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <Image
            src="/2020/09/schoollogo.png"
            alt="logo"
            width={80}
            height={80}
            className="mb-4"
          />
          <p className="text-sm leading-6">
            Al-Akeel-MMV, Kotiyakumbura has grown to become one of the premier
            national schools in the Sabaragamuwa Province of Sri Lanka.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">QUICK LINKS</h3>
          <ul className="space-y-3">
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Testimonials
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Student Progress Report
            </li>
            <li className="hover:text-yellow-400 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-lg mb-4">TOOLS AND LINKS</h3>
          <ul className="space-y-3">
            <li className="hover:text-yellow-400 cursor-pointer">About Us</li>
            <li className="hover:text-yellow-400 cursor-pointer">
              Testimonials
            </li>
            <li>
              <Link href="/studentprogressreport" className="hover:text-yellow-400 cursor-pointer">
                Student Progress Report
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-yellow-400 cursor-pointer">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className=" text-gray-300 p-6 ">
          {/* Title */}
          <h2 className="text-white font-bold mb-4 tracking-wide">CONTACTS</h2>
          {/* Location */}
          <div className="flex items-center gap-3 mb-4">
            <FaMapMarkerAlt className="text-yellow-500  hover:bg-green-400 w-5 h-5 mt-1" />
            <p className="text-sm leading-6 hover:bg-yellow-400">
              KG/DEHI/ AL AKEEL MMV <br />
              KOTIYAKUMBURA
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 mb-4">
            <FaEnvelope className="text-yellow-500  hover:bg-green-400 w-5 h-5" />
            <p className="text-sm  hover:bg-yellow-400">contact@alakeelmmv.com</p>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3 mb-6">
            <FaPhone className="text-yellow-500  hover:bg-green-400 w-5 h-5" />
            <p className="text-sm  hover:bg-yellow-400">0352289099</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/30 my-8"></div>

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-center md:text-left">
          <p>
            Copyright © 2025, All Rights Reserved Al Akeel MMV Kotiyakumbura.
          </p>
          <p>
            Designed & Developed by{" "}
            <span className="text-yellow-400">Aadhil</span>
          </p>
        </div>

        <div className="flex gap-4 left-4">
          <div className="bg-white text-green-900 p-3 rounded-full hover:bg-yellow-400">
            <FaFacebookF size={16} />
          </div>
          <div className="bg-white text-green-900 p-3 rounded-full hover:bg-yellow-400">
            <FaInstagram size={16} />
          </div>
          <div className="bg-white text-green-900 p-3 rounded-full hover:bg-yellow-400">
            <FaTwitter size={16} />
          </div>
          <div className="bg-white text-green-900 p-3 rounded-full hover:bg-yellow-400">
            <FaYoutube size={16} />
          </div>
        </div>
      </div>
    </footer>
  );
}
