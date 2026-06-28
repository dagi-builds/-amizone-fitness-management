import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="bg-zinc-950 min-h-screen">
            <section className="px-4 md:px-10 py-16 md:py-32 text-center">
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-zinc-100 tracking-tight max-w-3xl mx-auto px-2">
                    Train Harder. <span className="text-emerald-400">Become Stronger.</span>
                </h1>
                <p className="text-zinc-400 text-base md:text-lg mt-6 max-w-xl mx-auto px-2">
                    Amizone Fitness Center offers premium equipment, expert trainers, and a community built to push you further every day.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 px-4">
                    <Link
                        to="/contact"
                        className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-semibold px-8 py-3.5 rounded-xl transition text-center"
                    >
                        Join Now
                    </Link>
                    <Link
                        to="/services"
                        className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-100 font-semibold px-8 py-3.5 rounded-xl transition text-center"
                    >
                        View Services
                    </Link>
                </div>
            </section>

            <section className="px-4 md:px-10 py-16 md:py-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { stat: '500+', label: 'Active members' },
                        { stat: '50+', label: 'Machines & equipment' },
                        { stat: '7', label: 'Days a week, open' },
                    ].map((item) => (
                        <div
                            key={item.label}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center"
                        >
                            <p className="text-emerald-400 text-4xl font-bold">{item.stat}</p>
                            <p className="text-zinc-400 mt-2">{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}