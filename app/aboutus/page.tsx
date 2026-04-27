"use client";
import Link from "next/link";

export default function AboutUs() {
  const cards = [
    {
      front: "Mission",
      icon: "🎯",
      title: "Empowering Rural Children Through Education",
      desc: "Our mission is to provide accessible and high-quality education to rural children, equipping them with the knowledge, skills, and confidence they need to succeed.",
    },
    {
      front: "Vision",
      icon: "🌟",
      title: "Creating Opportunities, Transforming Lives",
      desc: "We envision a world where every child, regardless of their background, has access to quality education and the opportunity to fulfill their potential.",
    },
    {
      front: "Our Story",
      icon: "📖",
      title: "A Journey of Hope and Impact",
      desc: "Our journey began in 1925 with a simple yet powerful belief: that education has the power to transform lives and communities for generations to come.",
    },
  ];

  const stats = [
    { number: "1925", label: "Year Founded", icon: "🏫" },
    { number: "100+", label: "Years of Excellence", icon: "🏆" },
    { number: "180+", label: "Dedicated Teachers", icon: "👨‍🏫" },
    { number: "20,000+", label: "Students Served", icon: "🎓" },
    { number: "3,850+", label: "Successful Graduates", icon: "✨" },
    { number: "1–13", label: "Grade Range", icon: "📚" },
  ];

  const alStreams = [
    {
      name: "Science Stream",
      img: "/science stream.jpeg",
      color: "from-blue-600 to-blue-800",
      subjects: ["Physics", "Chemistry", "Biology / Combined Maths"],
      icon: "🔬",
    },
    {
      name: "Commerce Stream",
      img: "/commerce stream.jpeg",
      color: "from-green-600 to-green-800",
      subjects: ["Business Studies", "Accounting", "Economics"],
      icon: "📊",
    },
    {
      name: "Arts Stream",
      img: "/arts stream.jpeg",
      color: "from-yellow-600 to-yellow-800",
      subjects: ["Islamic Civilization", "Geography", "Political Science"],
      icon: "🎨",
    },
  ];

  const labs = [
    { name: "Physics Lab", img: "/physics lab.jpeg", icon: "⚡", desc: "Fully equipped for experiments in mechanics, electricity, and optics." },
    { name: "Chemistry Lab", img: "/chemistry lab.jpeg", icon: "🧪", desc: "Modern apparatus for qualitative and quantitative analysis." },
    { name: "Biology Lab", img: "/biology lab.jpeg", icon: "🧬", desc: "Equipped with microscopes, specimens, and dissection tools." },
    { name: "ICT Lab", img: "/ict lab.jpeg", icon: "💻", desc: "Computer lab with internet access and modern software for digital learning." },
  ];

  const sports = [
    { name: "Cricket", img: "/cricket.jpeg", icon: "🏏", desc: "Our cricket team has won numerous provincial competitions." },
    { name: "Football", img: "/football.jpeg", icon: "⚽", desc: "Active inter-school football league participants." },
    { name: "Volleyball", img: "/volleyball.jpeg", icon: "🏐", desc: "Both boys and girls volleyball teams compete at district level." },
    { name: "Athletics", img: "/athlatics.jpeg", icon: "🏃", desc: "Annual sports meet and inter-school athletics championships." },
  ];

  const facilities = [
    { name: "Library", img: "/library.jpeg", icon: "📚", desc: "A vast collection of books, references, and periodicals for all grades." },
    { name: "Smart Classrooms", img: "/smart class room.jpeg", icon: "🖥️", desc: "Interactive digital boards and projectors for modern learning." },
    { name: "Computer Lab", img: "/ict lab.jpeg", icon: "💻", desc: "Updated computer systems for ICT education and research." },
    { name: "Playground", img: "/playground.jpeg", icon: "🏟️", desc: "Spacious outdoor grounds for sports, games, and recreation." },
  ];

  const clubs = [
    { name: "Media Unit", icon: "📸" },
    { name: "Environmental Club", icon: "🌿" },
    { name: "Islamic Studies Circle", icon: "☪️" },
    { name: "Maths Club", icon: "📐" },
    { name: "English Literary Association", icon: "📝" },
    { name: "Science Society", icon: "🔭" },
    { name: "Scouts", icon: "⚜️" },
    { name: "Drama & Arts Club", icon: "🎭" },
  ];

  const achievements = [
    { year: "1925", event: "School Founded", detail: "Established as one of the pioneering Muslim schools in the Kegalle district." },
    { year: "1980s", event: "A/L Streams Introduced", detail: "Science, Commerce and Arts streams added to serve advanced students." },
    { year: "2000s", event: "ICT Lab Established", detail: "Modern computer laboratory opened to embrace digital education." },
    { year: "2020", event: "Website Launched", detail: "Official digital presence established to connect alumni and community." },
    { year: "2025", event: "Centenary Celebration", detail: "100 years of excellence — marking a century of education and impact." },
  ];

  return (
    <>
      {/* ── HERO ── */}
      <div className="relative w-full h-[450px] overflow-hidden">
        <img src="/2024/02/banner-4-1.jpg" className="absolute inset-0 w-full h-full object-cover scale-105" alt="School banner" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-red-400 font-semibold tracking-[0.3em] text-sm mb-3 uppercase">Est. 1925 · Kotiyakumbura</p>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">About Us</h1>
          <p className="text-lg text-gray-200 max-w-xl mb-6">A century of excellence, empowering generations through quality education.</p>
          <p className="text-sm font-semibold text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2 text-red-400">›</span>
            About Us
          </p>
        </div>
      </div>

      {/* ── FLIP CARDS ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600 font-semibold tracking-widest mb-2 text-sm uppercase">Nonprofit Focus</p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">School Education For Rural Empowerment</h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-14">
            Education serves as the cornerstone of empowerment for rural communities. By providing quality schooling, we pave the way for a brighter future.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {cards.map((card, i) => (
              <div key={i} className="group" style={{ perspective: "1000px" }}>
                <div
                  className="relative h-72 w-full transition-all duration-700"
                  style={{ transformStyle: "preserve-3d" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "rotateY(180deg)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "rotateY(0deg)"}
                >
                  {/* FRONT */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 text-white rounded-2xl flex flex-col items-center justify-center shadow-lg"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <div className="text-5xl mb-4">{card.icon}</div>
                    <h3 className="text-2xl font-bold">{card.front}</h3>
                    <p className="text-red-200 text-sm mt-2">Hover to learn more</p>
                  </div>
                  {/* BACK */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-500 text-black rounded-2xl p-6 flex flex-col justify-center shadow-lg"
                    style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                  >
                    <h3 className="text-lg font-bold mb-3">{card.title}</h3>
                    <p className="text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BANNER ── */}
      <section className="bg-red-700 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center text-white">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="text-3xl font-extrabold">{s.number}</div>
                <div className="text-red-200 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRINCIPAL'S MESSAGE ── */}
      <section className="bg-[#0b3d2e] py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <p className="text-yellow-400 font-semibold tracking-widest text-sm mb-2 uppercase">Leadership</p>
            <h2 className="text-3xl font-extrabold text-yellow-400 mb-6">Principal's Message</h2>
            <p className="mb-4 text-gray-200 leading-relaxed">
              Welcome to <strong className="text-white">Al Akeel Muslim Maha Vidyalaya, Kotiyakumbura</strong> — a school that has stood as a beacon of knowledge and character for over a century.
            </p>
            <p className="mb-4 text-gray-200 leading-relaxed">
              Our school provides education from <strong className="text-white">Grade 1 to Grade 13</strong>, and is built on the pillars of discipline, academic excellence, and moral character development rooted in Islamic values.
            </p>
            <p className="mb-4 text-gray-200 leading-relaxed">
              We encourage every student to actively participate in academics, sports, and extracurricular activities to grow into well-rounded and responsible citizens of tomorrow.
            </p>
            <p className="mb-4 text-gray-200 leading-relaxed">
              With a dedicated team of over <strong className="text-white">180 teachers</strong> and modern facilities, we are committed to nurturing young minds and shaping futures.
            </p>
            <div className="mt-8 border-l-4 border-yellow-400 pl-4">
              <p className="font-bold text-white text-lg">M.R.M. Reeza</p>
              <p className="text-yellow-400 text-sm">Principal – Al Akeel MMV, Kotiyakumbura</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-yellow-400 rounded-2xl rotate-3 opacity-30" />
              <img
                src="/2020/09/principal.png"
                className="relative w-[280px] h-[360px] object-cover rounded-2xl shadow-2xl border-4 border-yellow-400"
                alt="Principal"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-red-600 font-semibold tracking-widest text-sm mb-2 uppercase">Who We Are</p>
            <h2 className="text-3xl font-extrabold mb-6">Building a Strong Foundation for Rural Education</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Al Akeel Muslim Maha Vidyalaya (MMV) Kotiyakumbura</strong> is a distinguished educational institution dedicated to nurturing young minds in a supportive and inclusive environment. Established in <strong>1925</strong>, we have spent a century fostering academic excellence, moral values, and holistic development.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our dedicated team of educators, modern facilities, and innovative teaching methodologies ensure that our students are well-prepared to meet the challenges of the future.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our graduates consistently excel in academic pursuits and go on to become successful professionals and responsible citizens. Through community service and extracurricular activities, we instill social responsibility and leadership in our students.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: "Academic Excellence", desc: "Consistent results at O/L and A/L national examinations", icon: "📈" },
              { title: "Moral Development", desc: "Rooted in Islamic values and community ethics", icon: "☪️" },
              { title: "Holistic Growth", desc: "Sports, arts, and clubs alongside academics", icon: "🌱" },
              { title: "Community Impact", desc: "Serving Kotiyakumbura and surrounding villages", icon: "🤝" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── A/L STREAMS ── */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2 uppercase">Higher Education</p>
          <h2 className="text-3xl font-extrabold mb-4">Advanced Level Streams</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">Choose your path to university. Our A/L streams are guided by experienced teachers with a track record of excellent results.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {alStreams.map((stream, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={stream.img}
                    alt={stream.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${stream.color} opacity-60`} />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-3xl mb-1">{stream.icon}</div>
                    <h3 className="text-xl font-extrabold">{stream.name}</h3>
                  </div>
                </div>
                <div className="p-5 text-left">
                  <p className="text-gray-500 text-sm font-semibold mb-2 uppercase tracking-wider">Key Subjects</p>
                  <ul className="space-y-1">
                    {stream.subjects.map((sub, j) => (
                      <li key={j} className="text-gray-700 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full inline-block" />{sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LABORATORIES ── */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2 uppercase">Science & Technology</p>
          <h2 className="text-3xl font-extrabold mb-4">Laboratories</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">Our well-equipped laboratories provide students with hands-on experience for practical learning.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {labs.map((lab, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gray-50">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={lab.img}
                    alt={lab.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center text-xl shadow">
                    {lab.icon}
                  </div>
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-bold text-gray-800 mb-1">{lab.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{lab.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPORTS ── */}
      <section className="py-20 bg-gray-50 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2 uppercase">Physical Development</p>
          <h2 className="text-3xl font-extrabold mb-4">Sports & Athletics</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">We believe in the power of sports to build teamwork, discipline, and resilience in our students.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sports.map((sport, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={sport.img}
                    alt={sport.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-red-900/30 group-hover:bg-red-900/10 transition-colors" />
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center text-xl shadow">
                    {sport.icon}
                  </div>
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-bold text-gray-800 mb-1">{sport.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{sport.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FACILITIES ── */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2 uppercase">Infrastructure</p>
          <h2 className="text-3xl font-extrabold mb-4">School Facilities</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">Modern facilities that create the ideal environment for learning, growth, and development.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac, i) => (
              <div key={i} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gray-50">
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={fac.img}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-green-900/25 group-hover:bg-green-900/10 transition-colors" />
                  <div className="absolute top-3 right-3 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center text-xl shadow">
                    {fac.icon}
                  </div>
                </div>
                <div className="p-4 text-left">
                  <h3 className="font-bold text-gray-800 mb-1">{fac.name}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{fac.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLUBS & ACTIVITIES ── */}
      <section className="py-20 bg-[#0b3d2e] text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-yellow-400 font-semibold tracking-widest text-sm mb-2 uppercase">Student Life</p>
          <h2 className="text-3xl font-extrabold text-white mb-4">Clubs & Extracurricular Activities</h2>
          <p className="text-green-200 max-w-xl mx-auto mb-12">We nurture well-rounded students through a rich variety of clubs and societies beyond the classroom.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {clubs.map((club, i) => (
              <div key={i} className="bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-5 text-white border border-white/10">
                <div className="text-4xl mb-3">{club.icon}</div>
                <p className="font-semibold text-sm">{club.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MILESTONES TIMELINE ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-red-600 font-semibold tracking-widest text-sm mb-2 uppercase">Our Journey</p>
            <h2 className="text-3xl font-extrabold">Key Milestones</h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-red-200" />
            <div className="space-y-10">
              {achievements.map((item, i) => (
                <div key={i} className={`flex items-center gap-6 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <div className="bg-white rounded-xl p-5 shadow-md inline-block max-w-xs">
                      <p className="text-red-600 font-bold text-sm mb-1">{item.year}</p>
                      <h3 className="font-extrabold text-gray-800 mb-1">{item.event}</h3>
                      <p className="text-gray-500 text-sm">{item.detail}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                    <div className="w-3 h-3 bg-white rounded-full" />
                  </div>
                  <div className="w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OL SUBJECTS ── */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-red-600 font-semibold tracking-widest text-sm mb-2 uppercase">Curriculum</p>
          <h2 className="text-3xl font-extrabold mb-4">Ordinary Level Subjects</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-10">A comprehensive curriculum covering core and optional subjects for O/L students.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              "Sinhala / Tamil", "English", "Mathematics", "Science",
              "History", "Civics", "Religion (Islam)", "Health & Physical Education",
              "ICT", "Commerce", "Geography", "Drama & Theatre",
            ].map((sub, i) => (
              <div key={i} className="bg-red-50 border border-red-100 rounded-xl py-3 px-4 text-gray-700 font-medium text-sm hover:bg-red-100 transition-colors">
                {sub}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="bg-red-700 py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-4">Join Our Century of Excellence</h2>
          <p className="text-red-200 mb-8 text-lg">
            Al Akeel MMV Kotiyakumbura — where every student is empowered to reach their full potential since 1925.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacts"
              className="bg-white text-red-700 font-bold px-8 py-3 rounded-xl hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/our-projects"
              className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white hover:text-red-700 transition-colors"
            >
              Our Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}