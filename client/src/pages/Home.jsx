import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="bg-zinc-950 min-h-screen">

            {/* Hero Section */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                <img
                    src="/gym-hero.jpg"
                    alt="Amizone Fitness Center"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-zinc-950/70" />
                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="inline-block bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                        Addis Ababa, Ethiopia
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-zinc-100 tracking-tight leading-tight">
                        Train Harder.<br />
                        <span className="text-emerald-400">Become Stronger.</span>
                    </h1>
                    <p className="text-zinc-300 text-base md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
                        Amizone Fitness Center — premium equipment, expert trainers, and a motivated community built to push you further every single day.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold px-10 py-4 rounded-xl transition text-center text-lg"
                        >
                            Join Now
                        </Link>
                        <Link
                            to="/services"
                            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-zinc-100 font-semibold px-10 py-4 rounded-xl transition text-center text-lg backdrop-blur-sm"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="px-4 md:px-10 py-16 bg-zinc-900 border-y border-zinc-800">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { stat: '500+', label: 'Active Members' },
                        { stat: '50+', label: 'Machines & Equipment' },
                        { stat: '7', label: 'Days a Week Open' },
                        { stat: '5AM', label: 'Opens Every Day' },
                    ].map((item) => (
                        <div key={item.label} className="text-center">
                            <p className="text-emerald-400 text-3xl md:text-4xl font-bold">{item.stat}</p>
                            <p className="text-zinc-400 text-sm mt-2">{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* What We Have — Photo Gallery */}
            <section className="px-4 md:px-10 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
                            Inside <span className="text-emerald-400">Amizone</span>
                        </h2>
                        <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
                            Everything you need to train, recover, and grow — all under one roof in Addis Ababa.
                        </p>
                    </div>

                    {/* Large feature + two small grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden group">
                            <img
                                src="/gym-floor.jpg"
                                alt="Gym floor"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition duration-500" />
                            <div className="absolute bottom-4 left-4">
                                <span className="bg-zinc-950/80 text-zinc-100 text-sm font-semibold px-4 py-2 rounded-xl backdrop-blur-sm">
                                    💪 Training Floor
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-rows-2 gap-4">
                            <div className="relative h-44 md:h-44 rounded-2xl overflow-hidden group">
                                <img
                                    src="/gym-weights.jpg"
                                    alt="Elite weights"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition duration-500" />
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-zinc-950/80 text-zinc-100 text-sm font-semibold px-3 py-1.5 rounded-xl backdrop-blur-sm">
                                        🏋️ Elite Weights
                                    </span>
                                </div>
                            </div>
                            <div className="relative h-44 md:h-44 rounded-2xl overflow-hidden group">
                                <img
                                    src="/gym-cardio.jpg"
                                    alt="Cardio room"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-zinc-950/20 transition duration-500" />
                                <div className="absolute bottom-3 left-3">
                                    <span className="bg-zinc-950/80 text-zinc-100 text-sm font-semibold px-3 py-1.5 rounded-xl backdrop-blur-sm">
                                        🏃 Cardio Room
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Steam room full width */}
                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group">
                        <img
                            src="/gym-steam.jpg"
                            alt="Sauna and steam room"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-zinc-950/50 group-hover:bg-zinc-950/30 transition duration-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-4xl">🧖</span>
                                <p className="text-zinc-100 text-xl font-bold mt-2">Sauna & Steam Room</p>
                                <p className="text-zinc-300 text-sm mt-1">Recover. Relax. Recharge.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 md:px-10 py-20 bg-zinc-900 border-t border-zinc-800">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight">
                        Ready to Start Your <span className="text-emerald-400">Journey?</span>
                    </h2>
                    <p className="text-zinc-400 mt-4 text-lg">
                        Join hundreds of members already training at Amizone Fitness Center.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block mt-8 bg-emerald-400 hover:bg-emerald-300 text-zinc-950 font-bold px-12 py-4 rounded-xl transition text-lg"
                    >
                        Get Started Today
                    </Link>
                </div>
            </section>

        </div>
    )
}