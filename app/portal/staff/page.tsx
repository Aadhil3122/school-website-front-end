"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  LogOut,
  UserCog,
  CheckCircle,
  Save,
  BarChart2,
  ClipboardList,
  Bell,
  AlertCircle,
} from "lucide-react";

const BASE = "http://localhost:5000";

type Term = "1st Term" | "2nd Term" | "3rd Term";
type Year = "2023" | "2024" | "2025" | "2026";
type Tab = "enter-marks" | "my-results" | "summary";

interface StudentMark {
  indexNo: string;
  name: string;
  mark: string;
  grade?: string;
}

const GRADES_LIST = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
];
const TERMS: Term[] = ["1st Term", "2nd Term", "3rd Term"];
const YEARS: Year[] = ["2023", "2024", "2025", "2026"];

const SUBJECTS_BY_GRADE: Record<string, string[]> = {
  "1": ["Sinhala", "Mathematics", "English", "Islam", "Tamil", "Art"],
  "2": ["Sinhala", "Mathematics", "English", "Islam", "Tamil", "Art"],
  "3": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "Art",
  ],
  "4": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "Social Studies",
    "Art",
  ],
  "5": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "Social Studies",
    "Art",
  ],
  "6": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "History",
    "Geography",
    "Art",
    "Music",
  ],
  "7": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "History",
    "Geography",
    "Art",
    "Music",
  ],
  "8": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "History",
    "Geography",
    "Art",
    "Music",
  ],
  "9": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "History",
    "Geography",
    "Art",
    "Music",
  ],
  "10": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "History",
    "Geography",
    "ICT",
    "Art",
  ],
  "11": [
    "Sinhala",
    "Mathematics",
    "English",
    "Islam",
    "Tamil",
    "Science",
    "History",
    "Geography",
    "ICT",
    "Art",
  ],
  "12": [
    "Combined Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "ICT",
    "Economics",
    "Accounting",
    "Business Studies",
    "Sinhala",
    "Tamil",
    "English",
  ],
  "13": [
    "Combined Maths",
    "Physics",
    "Chemistry",
    "Biology",
    "ICT",
    "Economics",
    "Accounting",
    "Business Studies",
    "Sinhala",
    "Tamil",
    "English",
  ],
};

function getLetterGrade(mark: number): string {
  if (mark >= 75) return "A";
  if (mark >= 65) return "B";
  if (mark >= 55) return "C";
  if (mark >= 35) return "S";
  return "F";
}

function getGradeColor(g: string): string {
  return g === "A"
    ? "bg-green-100 text-green-800"
    : g === "B"
      ? "bg-blue-100 text-blue-800"
      : g === "C"
        ? "bg-yellow-100 text-yellow-800"
        : g === "S"
          ? "bg-orange-100 text-orange-800"
          : "bg-red-100 text-red-800";
}

export default function StaffPortal() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<Tab>("enter-marks");

  const staffName = "Mr. Abdul Hameed";
  const staffSubject = "Mathematics";
  const staffGrade = "10";

  const [selGrade, setSelGrade] = useState(staffGrade);
  const [selSubject, setSelSubject] = useState(staffSubject);
  const [selTerm, setSelTerm] = useState<Term>("1st Term");
  const [selYear, setSelYear] = useState<Year>("2025");

  const [students, setStudents] = useState<StudentMark[]>([]);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // ── Auth ──
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "staff") {
      router.replace("/login");
      return;
    }
    setAuthorized(true);
  }, [router]);

  // ── Load students + marks when filter changes ──
  useEffect(() => {
    if (!authorized) return;
    loadStudentsAndMarks();
  }, [authorized, selGrade, selSubject, selTerm, selYear]);

  const loadStudentsAndMarks = async () => {
    try {
      // Get students for grade
      const res = await fetch(`${BASE}/api/students/grade/${selGrade}`);
      const data = await res.json();
      const roster: StudentMark[] = Array.isArray(data)
        ? data.map((s: any) => ({
            indexNo: s.indexNo,
            name: s.name,
            mark: "",
            grade: undefined,
          }))
        : [];

      // Get saved marks
      const mRes = await fetch(
        `${BASE}/api/marks?grade=${selGrade}&subject=${encodeURIComponent(selSubject)}&term=${encodeURIComponent(selTerm)}&year=${selYear}`,
      );
      let savedMarks: any[] = [];
      if (mRes.ok) {
        const mData = await mRes.json();
        savedMarks = mData.marks || [];
      }

      // Merge
      const merged = roster.map((s) => {
        const found = savedMarks.find((m: any) => m.indexNo === s.indexNo);
        return found
          ? { ...s, mark: String(found.mark), grade: found.grade }
          : s;
      });

      setStudents(merged);
      setSaved(false);
    } catch (err) {
      console.error("loadStudentsAndMarks error:", err);
      setStudents([]);
    }
  };

  const handleGradeChange = (g: string) => {
    setSelGrade(g);
    setSelSubject(SUBJECTS_BY_GRADE[g]?.[0] || "");
    setSaved(false);
  };

  const updateMark = (indexNo: string, value: string) => {
    const num = parseInt(value);
    setStudents((prev) =>
      prev.map((s) =>
        s.indexNo === indexNo
          ? {
              ...s,
              mark: value,
              grade:
                value === "" ? undefined : getLetterGrade(isNaN(num) ? 0 : num),
            }
          : s,
      ),
    );
    setSaved(false);
  };

  const saveMarks = async () => {
    setLoading(true);
    const payload = {
      grade: selGrade,
      subject: selSubject,
      term: selTerm,
      year: selYear,
      marks: students.map((s) => ({
        indexNo: s.indexNo,
        name: s.name,
        mark: parseInt(s.mark) || 0,
        grade: s.grade || "F",
      })),
    };
    try {
      const res = await fetch(`${BASE}/api/marks/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setSaved(true);
    } catch (err) {
      console.error("saveMarks error:", err);
    } finally {
      setLoading(false);
    }
  };

  const filledCount = students.filter((s) => s.mark !== "").length;
  const avgMark =
    filledCount > 0
      ? Math.round(
          students
            .filter((s) => s.mark !== "")
            .reduce((a, s) => a + (parseInt(s.mark) || 0), 0) / filledCount,
        )
      : 0;
  const passCount = students.filter((s) => parseInt(s.mark) >= 35).length;

  const gradeDistribution = ["A", "B", "C", "S", "F"].map((g) => ({
    g,
    count: students.filter((s) => s.grade === g).length,
  }));

  const navItems = [
    {
      id: "enter-marks" as Tab,
      label: "Enter Marks",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      id: "my-results" as Tab,
      label: "My Results",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "summary" as Tab,
      label: "Class Summary",
      icon: <BarChart2 className="w-5 h-5" />,
    },
  ];

  if (!authorized)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f9] text-sm text-gray-500">
        Checking access…
      </div>
    );

  return (
    <div className="flex min-h-screen bg-[#f0f4f9] font-sans">
      {/* SIDEBAR */}
      <aside className="w-60 bg-gradient-to-b from-[#0a2a5e] to-[#1a4fa0] text-white flex flex-col shadow-2xl fixed h-full z-20">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <UserCog className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <p className="font-extrabold text-sm leading-tight">
                {staffName}
              </p>
              <p className="text-xs text-blue-300">{staffSubject} Teacher</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                tab === item.id
                  ? "bg-white/20 text-white shadow"
                  : "text-blue-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-white/10 space-y-2">
          <div className="bg-white/10 rounded-xl px-4 py-3">
            <p className="text-xs text-blue-300">Assigned Grade</p>
            <p className="font-bold text-sm">Grade {staffGrade}</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("role");
              router.replace("/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-300 hover:bg-red-900/30 transition"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="ml-60 flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-xl font-extrabold text-gray-800">
              {tab === "enter-marks"
                ? "Enter Marks"
                : tab === "my-results"
                  ? "My Results"
                  : "Class Summary"}
            </h1>
            <p className="text-xs text-gray-400">Staff Portal — Al Akeel MMV</p>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <div className="w-9 h-9 rounded-full bg-blue-700 flex items-center justify-center text-white font-bold text-sm">
              {staffName
                .split(" ")
                .map((w) => w[0])
                .join("")
                .slice(0, 2)}
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* ENTER MARKS TAB */}
          {tab === "enter-marks" && (
            <div className="space-y-6">
              {/* Filter */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Select Class
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-semibold">
                      Grade
                    </label>
                    <select
                      value={selGrade}
                      onChange={(e) => handleGradeChange(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {GRADES_LIST.map((g) => (
                        <option key={g} value={g}>
                          Grade {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-semibold">
                      Subject
                    </label>
                    <select
                      value={selSubject}
                      onChange={(e) => setSelSubject(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {(SUBJECTS_BY_GRADE[selGrade] || []).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-semibold">
                      Term
                    </label>
                    <select
                      value={selTerm}
                      onChange={(e) => setSelTerm(e.target.value as Term)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {TERMS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1 font-semibold">
                      Year
                    </label>
                    <select
                      value={selYear}
                      onChange={(e) => setSelYear(e.target.value as Year)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {YEARS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: "Entered",
                    value: `${filledCount} / ${students.length}`,
                    color: "bg-blue-50 text-blue-800",
                  },
                  {
                    label: "Class Avg",
                    value: filledCount > 0 ? `${avgMark}%` : "–",
                    color: "bg-green-50 text-green-800",
                  },
                  {
                    label: "Pass Rate",
                    value:
                      filledCount > 0
                        ? `${Math.round((passCount / filledCount) * 100)}%`
                        : "–",
                    color: "bg-yellow-50 text-yellow-800",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`rounded-xl px-5 py-4 ${s.color}`}
                  >
                    <p className="text-xs font-bold opacity-70 uppercase tracking-wide">
                      {s.label}
                    </p>
                    <p className="text-2xl font-extrabold">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Marks table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div>
                    <p className="font-extrabold text-gray-700 text-sm">
                      Grade {selGrade} — {selSubject} — {selTerm} {selYear}
                    </p>
                    <p className="text-xs text-gray-400">
                      {students.length} students · marks out of 100
                    </p>
                  </div>
                  {saved && (
                    <span className="flex items-center gap-1 text-green-600 text-xs font-bold bg-green-50 px-3 py-1.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" /> Saved
                    </span>
                  )}
                </div>

                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">#</th>
                      <th className="px-6 py-3 text-left">Student Name</th>
                      <th className="px-6 py-3 text-left">Index No.</th>
                      <th className="px-6 py-3 text-center">Mark (0–100)</th>
                      <th className="px-6 py-3 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center py-8 text-gray-400 text-sm"
                        >
                          No students found for Grade {selGrade}.
                        </td>
                      </tr>
                    )}
                    {students.map((s, i) => (
                      <tr
                        key={s.indexNo}
                        className="border-t border-gray-50 hover:bg-gray-50"
                      >
                        <td className="px-6 py-3 text-gray-400">{i + 1}</td>
                        <td className="px-6 py-3 font-semibold text-gray-800">
                          {s.name}
                        </td>
                        <td className="px-6 py-3 text-gray-400 text-xs">
                          {s.indexNo}
                        </td>
                        <td className="px-6 py-3 text-center">
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={s.mark}
                            onChange={(e) =>
                              updateMark(s.indexNo, e.target.value)
                            }
                            placeholder="—"
                            className="w-20 text-center border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 font-bold"
                          />
                        </td>
                        <td className="px-6 py-3 text-center">
                          {s.grade ? (
                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full ${getGradeColor(s.grade)}`}
                            >
                              {s.grade}
                            </span>
                          ) : (
                            <span className="text-gray-300 text-xs">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
                  {filledCount < students.length && students.length > 0 ? (
                    <span className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold">
                      <AlertCircle className="w-4 h-4" />
                      {students.length - filledCount} student(s) missing marks
                    </span>
                  ) : filledCount === students.length && students.length > 0 ? (
                    <span className="flex items-center gap-1.5 text-green-600 text-xs font-semibold">
                      <CheckCircle className="w-4 h-4" /> All marks entered
                    </span>
                  ) : (
                    <span />
                  )}
                  <button
                    onClick={saveMarks}
                    disabled={loading || filledCount === 0}
                    className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving…" : "Save Marks"}
                  </button>
                </div>
              </div>

              {/* Grade scale */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  Sri Lanka Grading Scale
                </p>
                <div className="flex flex-wrap gap-3 text-xs font-bold">
                  {[
                    {
                      range: "75 – 100",
                      g: "A",
                      color: "bg-green-100 text-green-800",
                    },
                    {
                      range: "65 – 74",
                      g: "B",
                      color: "bg-blue-100 text-blue-800",
                    },
                    {
                      range: "55 – 64",
                      g: "C",
                      color: "bg-yellow-100 text-yellow-800",
                    },
                    {
                      range: "35 – 54",
                      g: "S",
                      color: "bg-orange-100 text-orange-800",
                    },
                    {
                      range: "0 – 34",
                      g: "F",
                      color: "bg-red-100 text-red-800",
                    },
                  ].map((r) => (
                    <div
                      key={r.g}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl ${r.color}`}
                    >
                      <span className="font-extrabold text-sm">{r.g}</span>
                      <span className="opacity-70">{r.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MY RESULTS TAB */}
          {tab === "my-results" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-extrabold text-gray-700 mb-1">
                  Previously Submitted Results
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Results you have entered and saved.
                </p>
                <div className="space-y-3">
                  {[
                    {
                      grade: "10",
                      subject: "Mathematics",
                      term: "1st Term",
                      year: "2025",
                      count: 6,
                      avg: 72,
                    },
                    {
                      grade: "10",
                      subject: "Mathematics",
                      term: "2nd Term",
                      year: "2024",
                      count: 6,
                      avg: 68,
                    },
                    {
                      grade: "9",
                      subject: "Mathematics",
                      term: "3rd Term",
                      year: "2023",
                      count: 8,
                      avg: 75,
                    },
                  ].map((r, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between border border-gray-100 rounded-xl px-5 py-4 hover:bg-gray-50 transition"
                    >
                      <div>
                        <p className="font-bold text-gray-800 text-sm">
                          Grade {r.grade} — {r.subject}
                        </p>
                        <p className="text-xs text-gray-400">
                          {r.term} {r.year} · {r.count} students
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-gray-700">{r.avg}%</p>
                        <p className="text-xs text-gray-400">avg mark</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUMMARY TAB */}
          {tab === "summary" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-extrabold text-gray-700 mb-1">
                  Class Performance Summary
                </h2>
                <p className="text-sm text-gray-400 mb-6">
                  Grade {selGrade} — {selSubject}
                </p>

                <div className="space-y-3">
                  {gradeDistribution.map((row) => (
                    <div key={row.g} className="flex items-center gap-4">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-extrabold ${getGradeColor(row.g)}`}
                      >
                        {row.g}
                      </span>
                      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                          style={{
                            width:
                              students.length > 0
                                ? `${(row.count / students.length) * 100}%`
                                : "0%",
                          }}
                        />
                      </div>
                      <span className="text-sm font-bold text-gray-600 w-6">
                        {row.count}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-extrabold text-gray-800">
                      {students.length}
                    </p>
                    <p className="text-xs text-gray-400">Total Students</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-green-700">
                      {avgMark > 0 ? `${avgMark}%` : "—"}
                    </p>
                    <p className="text-xs text-gray-400">Class Average</p>
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-blue-700">
                      {filledCount > 0
                        ? `${Math.round((passCount / filledCount) * 100)}%`
                        : "—"}
                    </p>
                    <p className="text-xs text-gray-400">Pass Rate</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
