"use client";

import { useState } from "react";
import Link from "next/link";

export default function ProgressReportPage() {
  const [form, setForm] = useState({
    index: "",
    grade: "",
    term: "",
    year: "2025",
  });

  const [showResult, setShowResult] = useState(false);
  const [report, setReport] = useState<{
    name: string;
    indexNo: string;
    grade: string;
    term: string;
    year: string;
    subjects: Array<{ subject: string; mark: number; grade: string }>;
  } | null>(null);
  const [searchError, setSearchError] = useState("");

  // Handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loadSavedReport = () => {
    if (typeof window === "undefined") return null;

    const studentStorage = localStorage.getItem("school-students");
    const marksStorage = localStorage.getItem("school-marks");
    const students = studentStorage ? JSON.parse(studentStorage) : [];
    const marksObj = marksStorage ? JSON.parse(marksStorage) : {};
    const gradeNumber = form.grade.replace("Grade ", "");
    const matchingSubjects: Array<{
      subject: string;
      mark: number;
      grade: string;
      name: string;
      indexNo: string;
    }> = [];

    Object.entries(marksObj).forEach(([key, entries]: any) => {
      const [storedGrade, subject, storedTerm, storedYear] = key.split("|");
      if (
        storedGrade === gradeNumber &&
        storedTerm === form.term &&
        storedYear === form.year
      ) {
        entries.forEach((entry: any) => {
          if (entry.indexNo === form.index) {
            matchingSubjects.push({
              subject,
              mark: entry.mark,
              grade: entry.grade,
              name: entry.name,
              indexNo: entry.indexNo,
            });
          }
        });
      }
    });

    if (matchingSubjects.length === 0) {
      return null;
    }

    const student = students.find(
      (item: any) =>
        String(item.indexNo) === form.index &&
        String(item.grade) === gradeNumber,
    );

    return {
      name: student?.name || matchingSubjects[0].name || "Student",
      indexNo: form.index,
      grade: gradeNumber,
      term: form.term,
      year: form.year,
      subjects: matchingSubjects.map((item) => ({
        subject: item.subject,
        mark: item.mark,
        grade: item.grade,
      })),
    };
  };

  // Submit form
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSearchError("");
    const result = loadSavedReport();
    if (result) {
      setReport(result);
      setShowResult(true);
    } else {
      setReport(null);
      setShowResult(true);
      setSearchError(
        "No result found. Please make sure the index, grade, term, and year are correct.",
      );
    }
  };

  // ✅ FINAL FIXED PDF FUNCTION (NO ERRORS)
  const downloadPDF = async () => {
    const element = document.getElementById("result-section");
    if (!element) return;

    // ✅ FIX: proper dynamic import
    const html2pdfModule = await import("html2pdf.js");
    const html2pdf = html2pdfModule.default || html2pdfModule;

    html2pdf()
      .from(element)
      .set({
        margin: 10,
        filename: `${form.index || "student"}-result.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
      })
      .save();
  };

  return (
    <div>
      <div className="relative w-full h-105">
        <img
          src="/2024/02/banner-4-1.jpg"
          alt="building"
          className="absolute inset-0 w-full object-cover h-105"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-white">
          <h1 className="text-4xl font-bold mb-3">StudentProgressReport</h1>

          <p className="text-lg font-semibold">
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </p>
        </div>
      </div>
      <div className="min-h-screen bg-gray-100 py-16 px-4">
        {/* TITLE */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-900 mb-10">
          ONLINE PROGRESS REPORT
        </h1>

        {/* FORM */}
        <div className="max-w-3xl mx-auto border-4 border-green-700 rounded-xl p-6 bg-white shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* INDEX */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                Index Number
              </label>
              <input
                type="text"
                name="index"
                placeholder="Enter Index Number"
                value={form.index}
                onChange={handleChange}
                required
                className="w-full border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* GRADE */}
            <div>
              <label className="block mb-1 text-sm font-medium">Grade</label>
              <select
                name="grade"
                value={form.grade}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Grade</option>
                {[...Array(13)].map((_, i) => (
                  <option key={i} value={`Grade ${i + 1}`}>
                    Grade {i + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* TERM */}
            <div>
              <label className="block mb-1 text-sm font-medium">Term</label>
              <select
                name="term"
                value={form.term}
                onChange={handleChange}
                required
                className="w-full border rounded px-4 py-2"
              >
                <option value="">Select Term</option>
                <option value="1st Term">1st Term</option>
                <option value="2nd Term">2nd Term</option>
                <option value="3rd Term">3rd Term</option>
              </select>
            </div>

            {/* YEAR */}
            <div>
              <label className="block mb-1 text-sm font-medium">Year</label>
              <select
                name="year"
                value={form.year}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              >
                {[2023, 2024, 2025, 2026].map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800 transition"
            >
              View Results
            </button>
          </form>
        </div>

        {/* RESULT */}
        {showResult && (
          <div className="max-w-4xl mx-auto mt-10">
            {searchError ? (
              <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 p-5">
                {searchError}
              </div>
            ) : report ? (
              <div
                id="result-section"
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
                className="p-6 rounded shadow"
              >
                <h2 className="text-xl font-bold mb-4">Student Result</h2>

                <div className="mb-4 text-sm">
                  <p>
                    <strong>Name:</strong> {report.name}
                  </p>
                  <p>
                    <strong>Index:</strong> {report.indexNo}
                  </p>
                  <p>
                    <strong>Grade:</strong> Grade {report.grade}
                  </p>
                  <p>
                    <strong>Term:</strong> {report.term}
                  </p>
                  <p>
                    <strong>Year:</strong> {report.year}
                  </p>
                </div>

                <table className="w-full border border-black">
                  <thead
                    style={{ backgroundColor: "#15803d", color: "#ffffff" }}
                  >
                    <tr>
                      <th className="p-2 border border-black">Subject</th>
                      <th className="p-2 border border-black">Marks</th>
                      <th className="p-2 border border-black">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.subjects.map((subject) => (
                      <tr key={subject.subject} className="text-center">
                        <td className="border border-black p-2">
                          {subject.subject}
                        </td>
                        <td className="border border-black p-2">
                          {subject.mark}
                        </td>
                        <td className="border border-black p-2">
                          {subject.grade}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  onClick={downloadPDF}
                  className="mt-6 bg-gray-800 text-white px-5 py-2 rounded hover:bg-black"
                >
                  Save as PDF
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
