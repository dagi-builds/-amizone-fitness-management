export default function About() {
  return (
    <div className="bg-zinc-950 min-h-screen px-10 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-100 tracking-tight">
          About <span className="text-emerald-400">Amizone Fitness</span>
        </h1>
        <p className="text-zinc-400 text-lg mt-6 leading-relaxed">
          Amizone Fitness Center was built on a simple belief — that everyone deserves
          access to a space where they can push their limits, build discipline, and grow
          stronger, both physically and mentally.
        </p>
        <p className="text-zinc-400 text-lg mt-4 leading-relaxed">
          Our facility combines modern equipment with a welcoming, motivated community.
          Whether you're just starting your fitness journey or training at a competitive
          level, our space and our staff are here to support you every step of the way.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
          {[
            { title: 'Our Mission', text: 'To make consistent, effective fitness training accessible and motivating for everyone.' },
            { title: 'Our Community', text: 'A supportive space where members push each other to be their best.' },
            { title: 'Our Standards', text: 'Modern equipment, clean facilities, and knowledgeable staff at every visit.' },
          ].map((item) => (
            <div key={item.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
              <h3 className="text-emerald-400 font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}