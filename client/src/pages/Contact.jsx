export default function Contact() {
    return (
        <div className="bg-zinc-950 min-h-screen">

            {/* Header */}
            <section className="px-4 md:px-10 py-20 bg-zinc-900 border-b border-zinc-800 text-center">
                <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">Come Train With Us</span>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-3">
                    Get In <span className="text-yellow-400">Touch</span>
                </h1>
                <p className="text-zinc-400 text-lg mt-4 max-w-xl mx-auto">
                    Stop by for a free tour, call us, or just show up — we'd love to have you join the Amizone family.
                </p>
            </section>

            {/* Contact cards */}
            <section className="px-4 md:px-10 py-20">
                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                        {
                            icon: '📍',
                            label: 'Location',
                            value: 'Addis Ababa, Ethiopia',
                            sub: 'Gullele Sub-city',
                            color: 'border-yellow-400/40',
                        },
                        {
                            icon: '📞',
                            label: 'Phone',
                            value: '+251 91 123 4567',
                            sub: 'Mon–Sun, 5AM–10PM',
                            color: 'border-blue-400/40',
                        },
                        {
                            icon: '🕐',
                            label: 'Hours',
                            value: '5:00 AM – 10:00 PM',
                            sub: 'Open 7 days a week',
                            color: 'border-emerald-400/40',
                        },
                    ].map((item) => (
                        <div key={item.label} className={`bg-zinc-900 border ${item.color} rounded-2xl p-8 text-center`}>
                            <span className="text-4xl">{item.icon}</span>
                            <p className="text-zinc-500 text-xs font-bold tracking-widest uppercase mt-4 mb-1">{item.label}</p>
                            <p className="text-white font-black text-lg">{item.value}</p>
                            <p className="text-zinc-500 text-sm mt-1">{item.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Motivational closing */}
                <div className="max-w-2xl mx-auto text-center mt-16">
                    <p className="text-zinc-600 text-4xl font-black">"</p>
                    <p className="text-white text-2xl font-black -mt-2">
                        Your only competition is who you were <span className="text-yellow-400">yesterday.</span>
                    </p>
                    <p className="text-zinc-500 mt-4">Come prove it at Amizone.</p>
                </div>
            </section>

            {/* Yellow CTA strip */}
            <section className="bg-yellow-400 px-4 md:px-10 py-12 text-center">
                <h2 className="text-zinc-950 text-2xl md:text-3xl font-black">
                    First session free for new members. Come see what you're made of.
                </h2>
            </section>

        </div>
    )
}