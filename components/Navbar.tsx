"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ShieldCheck,
  UserCog,
  Menu,
  X,
} from "lucide-react";
import { useState, useRef, useEffect, FormEvent } from "react";

export default function Navbar() {
  const router = useRouter();
  const [portalOpen, setPortalOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setPortalOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setShowSearch(false);
      return;
    }

    if (
      query.includes("news") ||
      query.includes("announcement") ||
      query.includes("event")
    ) {
      router.push("/news");
    } else if (query.includes("contact")) {
      router.push("/contact");
    } else if (
      query.includes("progress") ||
      query.includes("report") ||
      query.includes("result") ||
      query.includes("grade") ||
      query.includes("index")
    ) {
      router.push("/studentprogressreport");
    } else if (query.includes("about")) {
      router.push("/aboutus");
    } else {
      router.push("/");
    }

    setSearchQuery("");
    setShowSearch(false);
  };

  return (
    <nav className="relative w-full bg-linear-to-r from-[#013512] to-[#79db7e] text-white px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/2020/09/schoollogo.png"
          alt="Logo"
          width={70}
          height={70}
          className="rounded-full"
        />
        <span className="font-bold text-lg">Al Akeel MMV</span>
      </div>

      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="md:hidden text-white p-2 rounded-full hover:bg-white/10 transition"
      >
        {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Menu */}
      <ul className="hidden md:flex gap-6 font-extrabold justify-center">
        <li>
          <Link href="/" className="hover:text-green-300 transition">
            HOME
          </Link>
        </li>
        <li>
          <Link href="/aboutus" className="hover:text-green-300 transition">
            ABOUT US
          </Link>
        </li>
        <li>
          <Link
            href="/studentprogressreport"
            className="hover:text-green-300 transition"
          >
            STUDENT PROGRESS REPORT
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:text-green-300 transition">
            CONTACTS
          </Link>
        </li>
        <li>
          <Link href="/news" className="hover:text-green-300 transition">
            NEWS
          </Link>
        </li>
      </ul>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 bg-[#013512] border-t border-white/10 md:hidden">
          <div className="flex flex-col px-6 py-4 space-y-3">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold hover:text-green-300 transition"
            >
              HOME
            </Link>
            <Link
              href="/aboutus"
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold hover:text-green-300 transition"
            >
              ABOUT US
            </Link>
            <Link
              href="/studentprogressreport"
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold hover:text-green-300 transition"
            >
              STUDENT PROGRESS REPORT
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold hover:text-green-300 transition"
            >
              CONTACTS
            </Link>
            <Link
              href="/news"
              onClick={() => setMenuOpen(false)}
              className="text-white font-semibold hover:text-green-300 transition"
            >
              NEWS
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="text-white border border-red-500 rounded-full px-4 py-2 text-center font-bold hover:bg-red-500 transition"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      )}

      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Search Icon */}
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => setShowSearch((open) => !open)}
            className="text-white"
            type="button"
          >
            <Search className="w-5 h-5 cursor-pointer hover:text-green-300 transition" />
          </button>
          {showSearch && (
            <form
              onSubmit={handleSearchSubmit}
              className="absolute right-0 top-full mt-2 w-72 rounded-full bg-white px-3 py-2 shadow-2xl"
            >
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news, contact, progress..."
                className="w-full bg-transparent text-sm text-gray-900 outline-none"
              />
            </form>
          )}
        </div>

        {/* Contact Us Button */}
        <Link
          href="/contact"
          className="border-2 border-red-500 text-white px-5 py-2 rounded-full hover:bg-red-500 transition text-sm font-bold"
        >
          CONTACT US
        </Link>

        {/* Portal Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setPortalOpen(!portalOpen)}
            className="flex items-center gap-2 bg-white text-green-900 px-4 py-2 rounded-full font-bold text-sm hover:bg-green-100 transition"
          >
            PORTAL
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${portalOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {portalOpen && (
            <div className="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-100">
              {/* Arrow pointer */}
              <div className="absolute -top-2 right-5 w-4 h-4 bg-white rotate-45 border-l border-t border-gray-100" />

              <div className="py-2">
                <p className="text-xs text-gray-400 font-semibold px-4 py-2 uppercase tracking-widest">
                  Login As
                </p>

                <Link
                  href="/portal/admin"
                  onClick={() => setPortalOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-green-50 hover:text-green-800 transition group"
                >
                  <span className="w-8 h-8 rounded-full bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition">
                    <ShieldCheck className="w-4 h-4 text-green-700" />
                  </span>
                  <div>
                    <p className="font-bold text-sm">Admin Login</p>
                    <p className="text-xs text-gray-400">Full system access</p>
                  </div>
                </Link>

                <div className="mx-4 border-t border-gray-100" />

                <Link
                  href="/portal/staff"
                  onClick={() => setPortalOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-800 transition group"
                >
                  <span className="w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition">
                    <UserCog className="w-4 h-4 text-blue-700" />
                  </span>
                  <div>
                    <p className="font-bold text-sm">Staff Login</p>
                    <p className="text-xs text-gray-400">Marks & reports</p>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
