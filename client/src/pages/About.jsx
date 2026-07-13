export default function About() {
  return (
    <div className="bg-zinc-950 min-h-screen">

      {/* Header */}
      <section className="px-4 md:px-10 py-20 md:py-28 bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-3">
            Built For <span className="text-yellow-400">Champions</span>
          </h1>
          <p className="text-zinc-300 text-lg mt-6 leading-relaxed">
            Amizone Fitness Center was built on a simple but powerful belief — that everyone deserves access to a space where they can push their limits, build discipline, and grow stronger, both physically and mentally.
          </p>
          <p className="text-zinc-400 text-lg mt-4 leading-relaxed">
            Our facility combines state-of-the-art equipment with a welcoming, motivated community. Whether you're just starting your fitness journey or training at a competitive level, our space and our staff are here to support you every step of the way.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 md:px-10 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">What Drives Us</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🔥',
                title: 'Our Mission',
                text: 'To make consistent, effective fitness training accessible and motivating for everyone in Addis Ababa and beyond.',
                color: 'border-yellow-400/40',
              },
              {
                icon: '💪',
                title: 'Our Community',
                text: 'A supportive, high-energy space where members push each other to be their absolute best every single day.',
                color: 'border-blue-400/40',
              },
              {
                icon: '⚡',
                title: 'Our Standards',
                text: 'Modern equipment, spotless facilities, and knowledgeable staff committed to your progress at every visit.',
                color: 'border-emerald-400/40',
              },
            ].map((item) => (
              <div key={item.title} className={`bg-zinc-900 border ${item.color} rounded-2xl p-8`}>
                <span className="text-4xl">{item.icon}</span>
                <h3 className="text-yellow-400 font-black text-xl mt-4 mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Motivational strip */}
      <section className="bg-yellow-400 px-4 md:px-10 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-zinc-950 text-3xl md:text-4xl font-black leading-tight">
            "Success isn't given. It's earned — rep by rep, day by day."
          </p>
          <p className="text-zinc-800 font-bold mt-4">— Amizone Fitness Center</p>
        </div>
      </section>

    </div>
  )
}