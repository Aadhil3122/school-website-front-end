export default function numberofcounts() {
  return (
    <>
      <section className="bg-green-700 py-16 relative">
        {/* Your top green section content */}
      </section>

      {/* STATS CARD */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 my-5 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-8 grid grid-cols-2 md:grid-cols-4 text-center">
          <div>
            <h2 className="text-4xl font-extrabold text-green-900">100+</h2>
            <p className="text-gray-700 font-extrabold">YEARS OF SCHOOL</p>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-green-900">50+</h2>
            <p className="text-gray-700 font-extrabold">SCHOOL TEACHERS</p>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-green-900">2000+</h2>
            <p className="text-gray-700 font-extrabold">ACTIVE STUDENTS</p>
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-green-900">385+</h2>
            <p className="text-gray-700 font-extrabold">SUCCESSFUL GRADUATES</p>
          </div>
        </div>
        
      </div>
      
    </>
  );
}
