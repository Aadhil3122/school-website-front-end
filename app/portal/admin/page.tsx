"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  BookOpen,
  BarChart2,
  Settings,
  LogOut,
  PlusCircle,
  Trash2,
  Edit2,
  ShieldCheck,
  ChevronDown,
  GraduationCap,
  UserCheck,
  Bell,
  Search,
  X,
  Check,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────
type Student = {
  id: string;
  name: string;
  indexNo: string;
  grade: string;
  section: string;
};
type Staff = {
  id: string;
  name: string;
  staffId: string;
  subject: string;
  grade: string;
};
type Tab = "dashboard" | "students" | "staff" | "results" | "settings";

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

// ─── Dummy seed data ───────────────────────────────────────
const SEED_STUDENTS: Student[] = [
  {
    id: "s1",
    name: "Ahmed Rilwan",
    indexNo: "2025001",
    grade: "10",
    section: "A",
  },
  {
    id: "s2",
    name: "Fathima Nishfa",
    indexNo: "2025002",
    grade: "10",
    section: "A",
  },
  {
    id: "s3",
    name: "Mohamed Insaf",
    indexNo: "2025003",
    grade: "11",
    section: "B",
  },
  {
    id: "s4",
    name: "Zainab Hasna",
    indexNo: "2025004",
    grade: "12",
    section: "A",
  },
];
const SEED_STAFF: Staff[] = [
  {
    id: "t1",
    name: "Mr. Abdul Hameed",
    staffId: "ST001",
    subject: "Mathematics",
    grade: "10",
  },
  {
    id: "t2",
    name: "Ms. Fathima Asra",
    staffId: "ST002",
    subject: "Science",
    grade: "11",
  },
  {
    id: "t3",
    name: "Mr. Mohamed Niyaz",
    staffId: "ST003",
    subject: "English",
    grade: "12",
  },
];

// ─── Modal helper ──────────────────────────────────────────
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────
function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
          {label}
        </p>
        <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────
export default function admin() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  const [tab, setTab] = useState<Tab>("dashboard");
  const [students, setStudents] = useState<Student[]>(SEED_STUDENTS);
  const [staff, setStaff] = useState<Staff[]>(SEED_STAFF);
  const [search, setSearch] = useState("");

  // modals
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [addStaffOpen, setAddStaffOpen] = useState(false);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [editStaff, setEditStaff] = useState<Staff | null>(null);

  // forms
  const blankStudent: Student = {
    id: "",
    name: "",
    indexNo: "",
    grade: "1",
    section: "A",
  };
  const blankStaff: Staff = {
    id: "",
    name: "",
    staffId: "",
    subject: "",
    grade: "1",
  };
  const [studentForm, setStudentForm] = useState<Student>(blankStudent);
  const [staffForm, setStaffForm] = useState<Staff>(blankStaff);

  useEffect(() => {
    const role =
      typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (role !== "admin") {
      router.replace("/login");
      return;
    }

    setAuthorized(true);
    const storedStudents = localStorage.getItem("school-students");
    const storedStaff = localStorage.getItem("school-staff");

    if (storedStudents) {
      try {
        setStudents(JSON.parse(storedStudents));
      } catch {
        setStudents(SEED_STUDENTS);
      }
    }

    if (storedStaff) {
      try {
        setStaff(JSON.parse(storedStaff));
      } catch {
        setStaff(SEED_STAFF);
      }
    }
  }, [router]);

  useEffect(() => {
    if (!authorized) return;
    localStorage.setItem("school-students", JSON.stringify(students));
  }, [students, authorized]);

  useEffect(() => {
    if (!authorized) return;
    localStorage.setItem("school-staff", JSON.stringify(staff));
  }, [staff, authorized]);

  // ── Student CRUD ──
  const saveStudent = () => {
    if (!studentForm.name || !studentForm.indexNo) return;
    if (studentForm.id) {
      setStudents((s) =>
        s.map((x) => (x.id === studentForm.id ? studentForm : x)),
      );
    } else {
      setStudents((s) => [...s, { ...studentForm, id: Date.now().toString() }]);
    }
    setAddStudentOpen(false);
    setEditStudent(null);
    setStudentForm(blankStudent);
  };
  const deleteStudent = (id: string) =>
    setStudents((s) => s.filter((x) => x.id !== id));

  // ── Staff CRUD ──
  const saveStaff = () => {
    if (!staffForm.name || !staffForm.staffId) return;
    if (staffForm.id) {
      setStaff((s) => s.map((x) => (x.id === staffForm.id ? staffForm : x)));
    } else {
      setStaff((s) => [...s, { ...staffForm, id: Date.now().toString() }]);
    }
    setAddStaffOpen(false);
    setEditStaff(null);
    setStaffForm(blankStaff);
  };
  const deleteStaff = (id: string) =>
    setStaff((s) => s.filter((x) => x.id !== id));

  const openEditStudent = (st: Student) => {
    setStudentForm(st);
    setEditStudent(st);
    setAddStudentOpen(true);
  };
  const openEditStaff = (st: Staff) => {
    setStaffForm(st);
    setEditStaff(st);
    setAddStaffOpen(true);
  };

  const normalizedSearch = search.toLowerCase();

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(normalizedSearch) ||
      s.indexNo.toLowerCase().includes(normalizedSearch) ||
      s.grade.toLowerCase().includes(normalizedSearch) ||
      s.section.toLowerCase().includes(normalizedSearch),
  );
  const filteredStaff = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(normalizedSearch) ||
      s.staffId.toLowerCase().includes(normalizedSearch) ||
      s.subject.toLowerCase().includes(normalizedSearch) ||
      s.grade.toLowerCase().includes(normalizedSearch),
  );

  useEffect(() => {
    const role =
      typeof window !== "undefined" ? localStorage.getItem("role") : null;
    if (role !== "admin") {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f6fa] text-sm text-gray-500">
        Checking access…
      </div>
    );
  }

  // ── Sidebar nav items ──
  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <BarChart2 className="w-5 h-5" />,
    },
    {
      id: "students",
      label: "Students",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    { id: "staff", label: "Staff", icon: <UserCheck className="w-5 h-5" /> },
    { id: "results", label: "Results", icon: <BookOpen className="w-5 h-5" /> },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f6fa] font-sans overflow-hidden">
      {/* ── SIDEBAR ── */}
      <aside className="w-64 bg-linear-to-b from-[#012d12] to-[#024d20] text-white flex flex-col shadow-2xl fixed h-full z-20">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-green-300" />
            </div>
            <div>
              <p className="font-extrabold text-sm">Admin Portal</p>
              <p className="text-xs text-green-300">Al Akeel MMV</p>
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
                  : "text-green-200 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-6 border-t border-white/10">
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

      {/* ── MAIN ── */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen overflow-y-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-xl font-extrabold text-gray-800 capitalize">
              {tab}
            </h1>
            <p className="text-xs text-gray-400">
              Al Akeel MMV — Admin Control Panel
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search students, index, staff or grade…"
                className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 w-56"
              />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <Bell className="w-5 h-5 text-gray-500" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm">
              A
            </div>
          </div>
        </header>

        <div className="flex-1 p-8">
          {/* ── DASHBOARD TAB ── */}
          {tab === "dashboard" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  icon={<GraduationCap className="w-6 h-6 text-green-700" />}
                  label="Total Students"
                  value={students.length}
                  color="bg-green-50"
                />
                <StatCard
                  icon={<UserCheck className="w-6 h-6 text-blue-700" />}
                  label="Total Staff"
                  value={staff.length}
                  color="bg-blue-50"
                />
                <StatCard
                  icon={<BookOpen className="w-6 h-6 text-yellow-700" />}
                  label="Grades"
                  value="1 – 13"
                  color="bg-yellow-50"
                />
                <StatCard
                  icon={<BarChart2 className="w-6 h-6 text-purple-700" />}
                  label="Terms"
                  value="3 / Year"
                  color="bg-purple-50"
                />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Students */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-extrabold text-gray-700 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-600" /> Recent
                    Students
                  </h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Index</th>
                        <th className="pb-2">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.slice(0, 4).map((s) => (
                        <tr
                          key={s.id}
                          className="border-b border-gray-50 hover:bg-gray-50"
                        >
                          <td className="py-2 font-medium">{s.name}</td>
                          <td className="py-2 text-gray-500">{s.indexNo}</td>
                          <td className="py-2">
                            <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                              Grade {s.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Staff list */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="font-extrabold text-gray-700 mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-blue-600" /> Staff
                    Members
                  </h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Subject</th>
                        <th className="pb-2">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {staff.slice(0, 4).map((s) => (
                        <tr
                          key={s.id}
                          className="border-b border-gray-50 hover:bg-gray-50"
                        >
                          <td className="py-2 font-medium">{s.name}</td>
                          <td className="py-2 text-gray-500">{s.subject}</td>
                          <td className="py-2">
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-semibold">
                              Grade {s.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ── STUDENTS TAB ── */}
          {tab === "students" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {filteredStudents.length} students found
                </p>
                <button
                  onClick={() => {
                    setStudentForm(blankStudent);
                    setAddStudentOpen(true);
                  }}
                  className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow"
                >
                  <PlusCircle className="w-4 h-4" /> Add Student
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Index No.</th>
                      <th className="px-6 py-3 text-left">Grade</th>
                      <th className="px-6 py-3 text-left">Section</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => (
                      <tr
                        key={s.id}
                        className="border-t border-gray-50 hover:bg-gray-50"
                      >
                        <td className="px-6 py-3 font-semibold text-gray-800">
                          {s.name}
                        </td>
                        <td className="px-6 py-3 text-gray-500">{s.indexNo}</td>
                        <td className="px-6 py-3">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full font-bold">
                            Grade {s.grade}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-gray-500">{s.section}</td>
                        <td className="px-6 py-3 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openEditStudent(s)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteStudent(s.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStudents.length === 0 && (
                  <p className="text-center text-gray-400 py-8 text-sm">
                    No students found.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── STAFF TAB ── */}
          {tab === "staff" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {filteredStaff.length} staff members
                </p>
                <button
                  onClick={() => {
                    setStaffForm(blankStaff);
                    setAddStaffOpen(true);
                  }}
                  className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition shadow"
                >
                  <PlusCircle className="w-4 h-4" /> Add Staff
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Staff ID</th>
                      <th className="px-6 py-3 text-left">Subject</th>
                      <th className="px-6 py-3 text-left">Grade</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStaff.map((s) => (
                      <tr
                        key={s.id}
                        className="border-t border-gray-50 hover:bg-gray-50"
                      >
                        <td className="px-6 py-3 font-semibold text-gray-800">
                          {s.name}
                        </td>
                        <td className="px-6 py-3 text-gray-500">{s.staffId}</td>
                        <td className="px-6 py-3 text-gray-600">{s.subject}</td>
                        <td className="px-6 py-3">
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full font-bold">
                            Grade {s.grade}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right flex justify-end gap-2">
                          <button
                            onClick={() => openEditStaff(s)}
                            className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteStaff(s.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStaff.length === 0 && (
                  <p className="text-center text-gray-400 py-8 text-sm">
                    No staff found.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── RESULTS TAB ── */}
          {tab === "results" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="font-extrabold text-gray-700 mb-2">
                Results Overview
              </h2>
              <p className="text-sm text-gray-400 mb-6">
                View all student results by grade and term.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {GRADES.map((g) => (
                  <div
                    key={g}
                    className="border border-gray-100 rounded-xl p-4 hover:border-green-300 hover:bg-green-50 cursor-pointer transition"
                  >
                    <p className="font-bold text-gray-700">Grade {g}</p>
                    <p className="text-xs text-gray-400">
                      {SUBJECTS_BY_GRADE[g]?.length} subjects
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SETTINGS TAB ── */}
          {tab === "settings" && (
            <div className="max-w-lg space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <h2 className="font-extrabold text-gray-700">
                  School Settings
                </h2>
                {[
                  { label: "School Name", value: "Al Akeel MMV" },
                  { label: "Location", value: "Kotiyakumbura, Kegalle" },
                  { label: "Email", value: "contact@alakeelmmv.com" },
                  { label: "Phone", value: "0352289099" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-xs text-gray-400 font-semibold mb-1">
                      {f.label}
                    </label>
                    <input
                      defaultValue={f.value}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                ))}
                <button className="bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-green-800 transition flex items-center gap-2">
                  <Check className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── ADD / EDIT STUDENT MODAL ── */}
      {addStudentOpen && (
        <Modal
          title={editStudent ? "Edit Student" : "Add New Student"}
          onClose={() => {
            setAddStudentOpen(false);
            setEditStudent(null);
          }}
        >
          <div className="space-y-4">
            {[
              {
                label: "Full Name",
                key: "name",
                type: "text",
                ph: "e.g. Ahmed Rilwan",
              },
              {
                label: "Index Number",
                key: "indexNo",
                type: "text",
                ph: "e.g. 2025001",
              },
              { label: "Section", key: "section", type: "text", ph: "e.g. A" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-gray-500 font-semibold mb-1">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  placeholder={f.ph}
                  value={(studentForm as any)[f.key]}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, [f.key]: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-500 font-semibold mb-1">
                Grade
              </label>
              <select
                value={studentForm.grade}
                onChange={(e) =>
                  setStudentForm({ ...studentForm, grade: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={saveStudent}
                className="flex-1 bg-green-700 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-green-800 transition"
              >
                {editStudent ? "Update" : "Add Student"}
              </button>
              <button
                onClick={() => {
                  setAddStudentOpen(false);
                  setEditStudent(null);
                }}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── ADD / EDIT STAFF MODAL ── */}
      {addStaffOpen && (
        <Modal
          title={editStaff ? "Edit Staff" : "Add Staff Member"}
          onClose={() => {
            setAddStaffOpen(false);
            setEditStaff(null);
          }}
        >
          <div className="space-y-4">
            {[
              { label: "Full Name", key: "name", ph: "e.g. Mr. Ahmed" },
              { label: "Staff ID", key: "staffId", ph: "e.g. ST004" },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-gray-500 font-semibold mb-1">
                  {f.label}
                </label>
                <input
                  type="text"
                  placeholder={f.ph}
                  value={(staffForm as any)[f.key]}
                  onChange={(e) =>
                    setStaffForm({ ...staffForm, [f.key]: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-500 font-semibold mb-1">
                Grade
              </label>
              <select
                value={staffForm.grade}
                onChange={(e) =>
                  setStaffForm({
                    ...staffForm,
                    grade: e.target.value,
                    subject: "",
                  })
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    Grade {g}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-500 font-semibold mb-1">
                Subject
              </label>
              <select
                value={staffForm.subject}
                onChange={(e) =>
                  setStaffForm({ ...staffForm, subject: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Subject</option>
                {(SUBJECTS_BY_GRADE[staffForm.grade] || []).map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={saveStaff}
                className="flex-1 bg-blue-700 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition"
              >
                {editStaff ? "Update" : "Add Staff"}
              </button>
              <button
                onClick={() => {
                  setAddStaffOpen(false);
                  setEditStaff(null);
                }}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
