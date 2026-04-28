"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  BookOpen,
  LogOut,
  Plus,
  Trash2,
  Save,
  BarChart2,
  ShieldCheck,
  Bell,
  Pencil,
  X,
  Check,
  Newspaper,
  Menu,
  ChevronDown,
} from "lucide-react";

type Tab = "students" | "marks" | "reports" | "news";

interface Student {
  _id: string;
  indexNo: string;
  name: string;
  grade: string;
}

interface NewsItem {
  _id: string;
  title: string;
  date: string;
  summary: string;
  points: string[];
  image: string;
}

const GRADES = [
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
const TERMS = ["1st Term", "2nd Term", "3rd Term"];
const YEARS = ["2023", "2024", "2025", "2026"];
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

const BASE = "http://localhost:5000";

export default function AdminPortal() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [tab, setTab] = useState<Tab>("students");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<{
    [key: string]: boolean;
  }>({});

  // Students state
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({
    indexNo: "",
    name: "",
    grade: "1",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({
    indexNo: "",
    name: "",
    grade: "1",
  });
  const [stuMsg, setStuMsg] = useState("");

  // Marks state
  const [selGrade, setSelGrade] = useState("10");
  const [selSubject, setSelSubject] = useState("Sinhala");
  const [selTerm, setSelTerm] = useState("1st Term");
  const [selYear, setSelYear] = useState("2025");
  const [markRows, setMarkRows] = useState<
    { indexNo: string; name: string; mark: string; grade: string }[]
  >([]);
  const [markMsg, setMarkMsg] = useState("");

  // Report state
  const [repIndex, setRepIndex] = useState("");
  const [repGrade, setRepGrade] = useState("10");
  const [repTerm, setRepTerm] = useState("1st Term");
  const [repYear, setRepYear] = useState("2025");
  const [report, setReport] = useState<any>(null);
  const [repErr, setRepErr] = useState("");

  // News state
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [newsForm, setNewsForm] = useState({
    title: "",
    date: "",
    summary: "",
    image: "",
    points: "",
  });
  const [newsEditId, setNewsEditId] = useState<string | null>(null);
  const [newsMsg, setNewsMsg] = useState("");
  const [showNewsForm, setShowNewsForm] = useState(false);

  // Auth check
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      router.replace("/login");
      return;
    }
    setAuthorized(true);
  }, [router]);

  useEffect(() => {
    if (!authorized) return;
    fetchStudents();
  }, [authorized]);
  useEffect(() => {
    if (!authorized) return;
    loadMarks();
  }, [authorized, selGrade, selSubject, selTerm, selYear]);
  useEffect(() => {
    if (!authorized) return;
    fetchNews();
  }, [authorized]);

  // ── Students ──
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${BASE}/api/students`);
      if (!res.ok) {
        console.error(`Error: ${res.status} - ${res.statusText}`);
        setStuMsg(`❌ Server error: ${res.status}`);
        setTimeout(() => setStuMsg(""), 3000);
        return;
      }
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setStuMsg("❌ Cannot connect to server");
      setTimeout(() => setStuMsg(""), 3000);
    }
  };

  const addStudent = async () => {
    if (!newStudent.indexNo.trim() || !newStudent.name.trim()) {
      setStuMsg("❌ Please fill Index No and Name");
      setTimeout(() => setStuMsg(""), 3000);
      return;
    }
    try {
      const res = await fetch(`${BASE}/api/students`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });
      const data = await res.json();
      if (res.ok) {
        setStuMsg("✅ Student added!");
        setNewStudent({ indexNo: "", name: "", grade: "1" });
        fetchStudents();
      } else {
        setStuMsg(`❌ ${data.message}`);
      }
    } catch {
      setStuMsg("❌ Cannot connect to server");
    }
    setTimeout(() => setStuMsg(""), 3000);
  };

  const deleteStudent = async (id: string) => {
    try {
      const res = await fetch(`${BASE}/api/students/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setStuMsg(`❌ Failed to delete: ${res.status}`);
        setTimeout(() => setStuMsg(""), 3000);
        return;
      }
      setStuMsg("✅ Student deleted!");
      setTimeout(() => setStuMsg(""), 3000);
      fetchStudents();
    } catch (err) {
      console.error("Delete error:", err);
      setStuMsg("❌ Cannot connect to server");
      setTimeout(() => setStuMsg(""), 3000);
    }
  };

  const startEdit = (s: Student) => {
    setEditId(s._id);
    setEditData({ indexNo: s.indexNo, name: s.name, grade: s.grade });
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`${BASE}/api/students/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (!res.ok) {
        setStuMsg(`❌ Failed to update: ${res.status}`);
        setTimeout(() => setStuMsg(""), 3000);
        return;
      }
      setStuMsg("✅ Student updated!");
      setTimeout(() => setStuMsg(""), 3000);
      setEditId(null);
      fetchStudents();
    } catch (err) {
      console.error("Update error:", err);
      setStuMsg("❌ Cannot connect to server");
      setTimeout(() => setStuMsg(""), 3000);
    }
  };

  // ── Marks ──
  const loadMarks = async () => {
    try {
      const res = await fetch(`${BASE}/api/students/grade/${selGrade}`);
      if (!res.ok) {
        console.error(`Error fetching students: ${res.status}`);
        setMarkMsg(`❌ Failed to load students: ${res.status}`);
        setTimeout(() => setMarkMsg(""), 3000);
        return;
      }
      const gradeStudents: Student[] = await res.json();
      const mRes = await fetch(
        `${BASE}/api/marks?grade=${selGrade}&subject=${encodeURIComponent(selSubject)}&term=${encodeURIComponent(selTerm)}&year=${selYear}`,
      );
      let savedMarks: any[] = [];
      if (mRes.ok) {
        const mData = await mRes.json();
        savedMarks = mData.marks || [];
      }
      const rows = Array.isArray(gradeStudents)
        ? gradeStudents.map((s) => {
            const found = savedMarks.find((m: any) => m.indexNo === s.indexNo);
            return {
              indexNo: s.indexNo,
              name: s.name,
              mark: found ? String(found.mark) : "",
              grade: found ? found.grade : "",
            };
          })
        : [];
      setMarkRows(rows);
    } catch (err) {
      console.error("Load marks error:", err);
      setMarkMsg("❌ Cannot connect to server");
      setTimeout(() => setMarkMsg(""), 3000);
    }
  };

  const updateMark = (indexNo: string, value: string) => {
    const num = parseInt(value);
    setMarkRows((prev) =>
      prev.map((r) =>
        r.indexNo === indexNo
          ? {
              ...r,
              mark: value,
              grade: value === "" ? "" : getLetterGrade(isNaN(num) ? 0 : num),
            }
          : r,
      ),
    );
  };

  const saveMarks = async () => {
    try {
      const payload = {
        grade: selGrade,
        subject: selSubject,
        term: selTerm,
        year: selYear,
        marks: markRows.map((r) => ({
          indexNo: r.indexNo,
          name: r.name,
          mark: parseInt(r.mark) || 0,
          grade: r.grade || "F",
        })),
      };
      const res = await fetch(`${BASE}/api/marks/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        console.error(`Save marks error: ${res.status}`);
        setMarkMsg(`❌ Failed to save marks: ${res.status}`);
      } else {
        setMarkMsg("✅ Marks saved!");
      }
    } catch (err) {
      console.error("Save marks error:", err);
      setMarkMsg("❌ Cannot connect to server");
    }
    setTimeout(() => setMarkMsg(""), 3000);
  };

  // ── Reports ──
  const fetchReport = async () => {
    setRepErr("");
    setReport(null);
    try {
      const res = await fetch(
        `${BASE}/api/marks/report?indexNo=${repIndex}&grade=${repGrade}&term=${encodeURIComponent(repTerm)}&year=${repYear}`,
      );
      if (res.ok) {
        setReport(await res.json());
      } else {
        setRepErr("No report found for this student.");
      }
    } catch {
      setRepErr("❌ Cannot connect to server.");
    }
  };

  // ── News ──
  const fetchNews = async () => {
    try {
      const res = await fetch(`${BASE}/api/news`);
      if (!res.ok) {
        console.error(`Error fetching news: ${res.status}`);
        setNewsMsg(`❌ Failed to load news: ${res.status}`);
        setTimeout(() => setNewsMsg(""), 3000);
        return;
      }
      const data = await res.json();
      setNewsList(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fetch news error:", err);
      setNewsMsg("❌ Cannot connect to server");
      setTimeout(() => setNewsMsg(""), 3000);
    }
  };

  const saveNews = async () => {
    if (!newsForm.title.trim() || !newsForm.summary.trim()) {
      setNewsMsg("❌ Title and Summary are required");
      setTimeout(() => setNewsMsg(""), 3000);
      return;
    }
    try {
      const payload = {
        ...newsForm,
        points: newsForm.points
          .split("\n")
          .map((p) => p.trim())
          .filter((p) => p !== ""),
      };
      const url = newsEditId
        ? `${BASE}/api/news/${newsEditId}`
        : `${BASE}/api/news`;
      const method = newsEditId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setNewsMsg(newsEditId ? "✅ News updated!" : "✅ News added!");
        setNewsForm({
          title: "",
          date: "",
          summary: "",
          image: "",
          points: "",
        });
        setNewsEditId(null);
        setShowNewsForm(false);
        fetchNews();
      } else {
        console.error(`Save news error: ${res.status}`);
        setNewsMsg(`❌ Failed to save news: ${res.status}`);
      }
    } catch (err) {
      console.error("Save news error:", err);
      setNewsMsg("❌ Cannot connect to server");
    }
    setTimeout(() => setNewsMsg(""), 3000);
  };

  const editNews = (n: NewsItem) => {
    setNewsEditId(n._id);
    setNewsForm({
      title: n.title,
      date: n.date,
      summary: n.summary,
      image: n.image,
      points: n.points.join("\n"),
    });
    setShowNewsForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteNews = async (id: string) => {
    try {
      const res = await fetch(`${BASE}/api/news/${id}`, { method: "DELETE" });
      if (!res.ok) {
        setNewsMsg(`❌ Failed to delete: ${res.status}`);
        setTimeout(() => setNewsMsg(""), 3000);
        return;
      }
      setNewsMsg("✅ News deleted!");
      setTimeout(() => setNewsMsg(""), 3000);
      fetchNews();
    } catch (err) {
      console.error("Delete news error:", err);
      setNewsMsg("❌ Cannot connect to server");
      setTimeout(() => setNewsMsg(""), 3000);
    }
  };

  if (!authorized)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Checking access…
      </div>
    );

  const navItems = [
    {
      id: "students" as Tab,
      label: "Students",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "marks" as Tab,
      label: "Enter Marks",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      id: "reports" as Tab,
      label: "Reports",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      id: "news" as Tab,
      label: "News",
      icon: <Newspaper className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f0f4f9] font-sans flex-col md:flex-row">
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:relative w-60 bg-linear-to-b from-[#013512] to-[#026a25] text-white flex flex-col shadow-2xl h-full z-20 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-200" />
            </div>
            <div>
              <p className="font-extrabold text-sm">Admin Panel</p>
              <p className="text-xs text-green-300">Al Akeel MMV</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                tab === item.id
                  ? "bg-white/20 text-white shadow"
                  : "text-green-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-4 py-5 border-t border-white/10">
          <button
            onClick={() => {
              localStorage.removeItem("role");
              router.replace("/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-300 hover:bg-red-900/30 transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="w-full flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg md:text-xl font-extrabold text-gray-800">
                {tab === "students"
                  ? "Manage Students"
                  : tab === "marks"
                    ? "Enter Marks"
                    : tab === "reports"
                      ? "Student Reports"
                      : "Manage News"}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                Admin Portal — Al Akeel MMV
              </p>
            </div>
          </div>
          <Bell className="w-5 h-5 text-gray-500" />
        </header>

        <div className="flex-1 p-4 md:p-8 space-y-6">
          {/* STUDENTS TAB */}
          {tab === "students" && (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Add New Student
                </p>
                {stuMsg && (
                  <p className="mb-3 text-sm font-semibold text-center md:text-left">
                    {stuMsg}
                  </p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <input
                    placeholder="Index No"
                    value={newStudent.indexNo}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, indexNo: e.target.value })
                    }
                    className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    placeholder="Full Name"
                    value={newStudent.name}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, name: e.target.value })
                    }
                    className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <select
                    value={newStudent.grade}
                    onChange={(e) =>
                      setNewStudent({ ...newStudent, grade: e.target.value })
                    }
                    className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {GRADES.map((g) => (
                      <option key={g} value={g}>
                        Grade {g}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addStudent}
                    className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition w-full sm:w-auto"
                  >
                    <Plus className="w-4 h-4" /> <span>Add</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 md:px-6 py-4 border-b border-gray-100">
                  <p className="font-extrabold text-gray-700 text-sm">
                    All Students ({students.length})
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left">#</th>
                        <th className="px-4 md:px-6 py-3 text-left">Index</th>
                        <th className="px-4 md:px-6 py-3 text-left">Name</th>
                        <th className="px-4 md:px-6 py-3 text-left">Grade</th>
                        <th className="px-4 md:px-6 py-3 text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center py-8 text-gray-400 text-sm"
                          >
                            No students yet. Add one above.
                          </td>
                        </tr>
                      )}
                      {students.map((s, i) => (
                        <tr
                          key={s._id}
                          className="border-t border-gray-50 hover:bg-gray-50"
                        >
                          <td className="px-4 md:px-6 py-3 text-gray-400 text-xs md:text-sm">
                            {i + 1}
                          </td>
                          {editId === s._id ? (
                            <>
                              <td className="px-4 md:px-6 py-3">
                                <input
                                  value={editData.indexNo}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      indexNo: e.target.value,
                                    })
                                  }
                                  className="border rounded px-2 py-1 text-xs w-full"
                                />
                              </td>
                              <td className="px-4 md:px-6 py-3">
                                <input
                                  value={editData.name}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      name: e.target.value,
                                    })
                                  }
                                  className="border rounded px-2 py-1 text-xs w-full"
                                />
                              </td>
                              <td className="px-4 md:px-6 py-3">
                                <select
                                  value={editData.grade}
                                  onChange={(e) =>
                                    setEditData({
                                      ...editData,
                                      grade: e.target.value,
                                    })
                                  }
                                  className="border rounded px-2 py-1 text-xs w-full"
                                >
                                  {GRADES.map((g) => (
                                    <option key={g} value={g}>
                                      Grade {g}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td className="px-4 md:px-6 py-3 text-center">
                                <div className="flex gap-2 justify-center">
                                  <button
                                    onClick={saveEdit}
                                    className="text-green-600 hover:text-green-800 p-1"
                                  >
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditId(null)}
                                    className="text-gray-400 hover:text-gray-600 p-1"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="px-4 md:px-6 py-3 text-gray-500 text-xs">
                                {s.indexNo}
                              </td>
                              <td className="px-4 md:px-6 py-3 font-semibold text-gray-800 text-xs md:text-sm">
                                {s.name}
                              </td>
                              <td className="px-4 md:px-6 py-3 text-gray-500 text-xs md:text-sm">
                                Grade {s.grade}
                              </td>
                              <td className="px-4 md:px-6 py-3 text-center">
                                <div className="flex gap-2 justify-center md:gap-3">
                                  <button
                                    onClick={() => startEdit(s)}
                                    className="text-blue-500 hover:text-blue-700 p-1"
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteStudent(s._id)}
                                    className="text-red-400 hover:text-red-600 p-1"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* MARKS TAB */}
          {tab === "marks" && (
            <>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Select Class
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 font-semibold">
                      Grade
                    </label>
                    <select
                      value={selGrade}
                      onChange={(e) => {
                        setSelGrade(e.target.value);
                        setSelSubject(
                          SUBJECTS_BY_GRADE[e.target.value]?.[0] || "",
                        );
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {GRADES.map((g) => (
                        <option key={g} value={g}>
                          Grade {g}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 font-semibold">
                      Subject
                    </label>
                    <select
                      value={selSubject}
                      onChange={(e) => setSelSubject(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {(SUBJECTS_BY_GRADE[selGrade] || []).map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 font-semibold">
                      Term
                    </label>
                    <select
                      value={selTerm}
                      onChange={(e) => setSelTerm(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      {TERMS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-2 font-semibold">
                      Year
                    </label>
                    <select
                      value={selYear}
                      onChange={(e) => setSelYear(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
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

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 md:px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <p className="font-extrabold text-gray-700 text-sm">
                    Grade {selGrade} — {selSubject} — {selTerm} {selYear}
                  </p>
                  {markMsg && (
                    <span className="text-sm font-semibold text-green-600">
                      {markMsg}
                    </span>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                      <tr>
                        <th className="px-4 md:px-6 py-3 text-left">#</th>
                        <th className="px-4 md:px-6 py-3 text-left">Name</th>
                        <th className="px-4 md:px-6 py-3 text-left">Index</th>
                        <th className="px-4 md:px-6 py-3 text-center">Mark</th>
                        <th className="px-4 md:px-6 py-3 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {markRows.length === 0 && (
                        <tr>
                          <td
                            colSpan={5}
                            className="text-center py-8 text-gray-400 text-sm"
                          >
                            No students found for Grade {selGrade}.
                          </td>
                        </tr>
                      )}
                      {markRows.map((r, i) => (
                        <tr
                          key={r.indexNo}
                          className="border-t border-gray-50 hover:bg-gray-50"
                        >
                          <td className="px-4 md:px-6 py-3 text-gray-400 text-xs">
                            {i + 1}
                          </td>
                          <td className="px-4 md:px-6 py-3 font-semibold text-gray-800 text-xs md:text-sm">
                            {r.name}
                          </td>
                          <td className="px-4 md:px-6 py-3 text-gray-400 text-xs">
                            {r.indexNo}
                          </td>
                          <td className="px-4 md:px-6 py-3 text-center">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={r.mark}
                              onChange={(e) =>
                                updateMark(r.indexNo, e.target.value)
                              }
                              placeholder="—"
                              className="w-16 md:w-20 text-center border border-gray-200 rounded-lg px-2 md:px-3 py-1.5 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-green-400 font-bold"
                            />
                          </td>
                          <td className="px-4 md:px-6 py-3 text-center">
                            {r.grade ? (
                              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
                                {r.grade}
                              </span>
                            ) : (
                              <span className="text-gray-300 text-xs">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-4 md:px-6 py-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={saveMarks}
                    className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow"
                  >
                    <Save className="w-4 h-4" /> Save Marks
                  </button>
                </div>
              </div>
            </>
          )}

          {/* REPORTS TAB */}
          {tab === "reports" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                Search Student Report
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                <input
                  placeholder="Index Number"
                  value={repIndex}
                  onChange={(e) => setRepIndex(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <select
                  value={repGrade}
                  onChange={(e) => setRepGrade(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      Grade {g}
                    </option>
                  ))}
                </select>
                <select
                  value={repTerm}
                  onChange={(e) => setRepTerm(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {TERMS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <select
                  value={repYear}
                  onChange={(e) => setRepYear(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={fetchReport}
                className="w-full md:w-auto bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow mb-6"
              >
                Search Report
              </button>
              {repErr && (
                <p className="text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg">
                  {repErr}
                </p>
              )}
              {report && (
                <div className="border border-gray-100 rounded-2xl p-4 md:p-6">
                  <p className="font-bold text-lg text-gray-800 mb-1">
                    {report.name}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mb-4">
                    Index: {report.indexNo} · Grade {report.grade} ·{" "}
                    {report.term} {report.year}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                      <thead className="bg-green-700 text-white">
                        <tr>
                          <th className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">
                            Subject
                          </th>
                          <th className="px-3 md:px-4 py-2 text-center text-xs md:text-sm">
                            Mark
                          </th>
                          <th className="px-3 md:px-4 py-2 text-center text-xs md:text-sm">
                            Grade
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.subjects.map((s: any) => (
                          <tr
                            key={s.subject}
                            className="border-t border-gray-100 text-center"
                          >
                            <td className="px-3 md:px-4 py-2 text-left text-xs md:text-sm">
                              {s.subject}
                            </td>
                            <td className="px-3 md:px-4 py-2 text-xs md:text-sm">
                              {s.mark}
                            </td>
                            <td className="px-3 md:px-4 py-2 font-bold text-xs md:text-sm">
                              {s.grade}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* NEWS TAB */}
          {tab === "news" && (
            <>
              {/* Add / Edit News Form */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {newsEditId ? "Edit News" : "Add New News"}
                  </p>
                  <button
                    onClick={() => {
                      setShowNewsForm(!showNewsForm);
                      setNewsEditId(null);
                      setNewsForm({
                        title: "",
                        date: "",
                        summary: "",
                        image: "",
                        points: "",
                      });
                    }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition"
                  >
                    <Plus className="w-4 h-4" />{" "}
                    {showNewsForm ? "Cancel" : "Add News"}
                  </button>
                </div>

                {newsMsg && (
                  <p className="mb-3 text-sm font-semibold text-center md:text-left">
                    {newsMsg}
                  </p>
                )}

                {showNewsForm && (
                  <div className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 font-semibold">
                          Title *
                        </label>
                        <input
                          placeholder="News title"
                          value={newsForm.title}
                          onChange={(e) =>
                            setNewsForm({ ...newsForm, title: e.target.value })
                          }
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-2 font-semibold">
                          Date
                        </label>
                        <input
                          placeholder="e.g. 2025 January 15"
                          value={newsForm.date}
                          onChange={(e) =>
                            setNewsForm({ ...newsForm, date: e.target.value })
                          }
                          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 font-semibold">
                        Image Path (optional)
                      </label>
                      <input
                        placeholder="e.g. /images/news1.jpg"
                        value={newsForm.image}
                        onChange={(e) =>
                          setNewsForm({ ...newsForm, image: e.target.value })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 font-semibold">
                        Summary *
                      </label>
                      <textarea
                        placeholder="News summary..."
                        value={newsForm.summary}
                        rows={3}
                        onChange={(e) =>
                          setNewsForm({ ...newsForm, summary: e.target.value })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 font-semibold">
                        Points (one per line)
                      </label>
                      <textarea
                        placeholder="Point 1&#10;Point 2&#10;Point 3"
                        value={newsForm.points}
                        rows={4}
                        onChange={(e) =>
                          setNewsForm({ ...newsForm, points: e.target.value })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <button
                      onClick={saveNews}
                      className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition shadow"
                    >
                      <Save className="w-4 h-4" />{" "}
                      {newsEditId ? "Update News" : "Save News"}
                    </button>
                  </div>
                )}
              </div>

              {/* News List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-4 md:px-6 py-4 border-b border-gray-100">
                  <p className="font-extrabold text-gray-700 text-sm">
                    All News ({newsList.length})
                  </p>
                </div>
                {newsList.length === 0 && (
                  <p className="text-center py-8 text-gray-400 text-sm">
                    No news yet. Add one above.
                  </p>
                )}
                <div className="divide-y divide-gray-50">
                  {newsList.map((n, i) => (
                    <div
                      key={n._id}
                      className="px-4 md:px-6 py-5 hover:bg-gray-50 flex flex-col md:flex-row items-start justify-between gap-4"
                    >
                      <div className="flex-1 w-full">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="text-xs bg-green-100 text-green-700 font-bold px-2.5 py-1 rounded-full">
                            {n.date}
                          </span>
                        </div>
                        <p className="font-bold text-gray-800 text-sm mb-2">
                          {n.title}
                        </p>
                        <p className="text-xs md:text-sm text-gray-500 mb-3">
                          {n.summary}
                        </p>
                        {n.points.length > 0 && (
                          <ul className="space-y-1">
                            {n.points.map((p, pi) => (
                              <li
                                key={pi}
                                className="text-xs text-gray-600 flex gap-2"
                              >
                                <span className="text-green-600 shrink-0">
                                  ✔
                                </span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="flex gap-2 shrink-0 w-full md:w-auto">
                        <button
                          onClick={() => editNews(n)}
                          className="flex-1 md:flex-none text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-2 rounded-lg transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNews(n._id)}
                          className="flex-1 md:flex-none text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
