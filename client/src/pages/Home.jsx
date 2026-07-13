import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className="bg-zinc-950 min-h-screen">

            {/* Hero */}
            <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
                <img
                    src="/gym-hero.jpg"
                    alt="Amizone Fitness Center"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-zinc-950/65" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <span className="inline-block bg-yellow-400/10 border border-yellow-400/40 text-yellow-400 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                        🔥 Addis Ababa's Premier Gym
                    </span>
                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-tight">
                        NO LIMITS.<br />
                        <span className="text-yellow-400">NO EXCUSES.</span>
                    </h1>
                    <p className="text-zinc-300 text-base md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed font-medium">
                        Amizone Fitness Center — where champions are built. Premium equipment, elite trainers, and a community that pushes you beyond what you thought possible.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                        <Link
                            to="/contact"
                            className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black px-10 py-4 rounded-xl transition text-center text-lg uppercase tracking-wide"
                        >
                            Start Today →
                        </Link>
                        <Link
                            to="/services"
                            className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-10 py-4 rounded-xl transition text-center text-lg backdrop-blur-sm"
                        >
                            Explore Facilities
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2.5">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </section>

            {/* Stats */}
            <section className="px-4 md:px-10 py-14 bg-yellow-400">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                        { stat: '500+', label: 'Active Members' },
                        { stat: '50+', label: 'Machines & Equipment' },
                        { stat: '7', label: 'Days a Week' },
                        { stat: '5AM', label: 'Opens Every Day' },
                    ].map((item) => (
                        <div key={item.label} className="text-center">
                            <p className="text-zinc-950 text-3xl md:text-4xl font-black">{item.stat}</p>
                            <p className="text-zinc-800 text-sm font-semibold mt-1">{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Motivational banner */}
            <section className="bg-zinc-900 border-y border-zinc-800 py-8 overflow-hidden">
                <div className="flex gap-16 animate-pulse">
                    {['STRENGTH', 'DISCIPLINE', 'CONSISTENCY', 'RESULTS', 'ELITE WEIGHTS', 'NO LIMITS', 'PUSH HARDER'].map((word, i) => (
                        <span key={i} className="text-zinc-700 text-2xl font-black tracking-widest uppercase whitespace-nowrap">
                            {word} <span className="text-yellow-400/30">✦</span>
                        </span>
                    ))}
                </div>
            </section>

            {/* Gallery */}
            <section className="px-4 md:px-10 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">The Facility</span>
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mt-2">
                            Inside <span className="text-yellow-400">Amizone</span>
                        </h2>
                        <p className="text-zinc-400 mt-3 max-w-xl mx-auto">
                            State-of-the-art equipment and facilities designed for serious athletes and beginners alike.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden group cursor-pointer">
                            <img
                                src="/gym-floor.jpg"
                                alt="Gym floor"
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent" />
                            <div className="absolute bottom-5 left-5">
                                <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">Training Floor</span>
                                <p className="text-white font-black text-xl">Full Gym Access</p>
                            </div>
                        </div>

                        <div className="grid grid-rows-2 gap-4">
                            <div className="relative h-44 rounded-2xl overflow-hidden group cursor-pointer">
                                <img
                                    src="/gym-weights.jpg"
                                    alt="Elite weights"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-4">
                                    <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">Weights</span>
                                    <p className="text-white font-bold">Elite Weight Room</p>
                                </div>
                            </div>
                            <div className="relative h-44 rounded-2xl overflow-hidden group cursor-pointer">
                                <img
                                    src="/gym-cardio.jpg"
                                    alt="Cardio room"
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                                <div className="absolute bottom-3 left-4">
                                    <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">Cardio</span>
                                    <p className="text-white font-bold">Cardio Zone</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer">
                        <img
                            src="/gym-steam.jpg"
                            alt="Sauna and steam room"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">Recovery</span>
                                <p className="text-white text-2xl font-black mt-1">Sauna & Steam Room</p>
                                <p className="text-zinc-300 text-sm mt-1">Recover. Relax. Recharge.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Motivational quote */}
            <section className="px-4 md:px-10 py-20 bg-zinc-900 border-t border-zinc-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-5xl md:text-7xl font-black text-zinc-800 leading-none">"</p>
                    <p className="text-2xl md:text-3xl font-black text-white leading-tight -mt-4">
                        The pain you feel today will be the{' '}
                        <span className="text-yellow-400">strength</span>{' '}
                        you feel tomorrow.
                    </p>
                    <p className="text-zinc-500 mt-6 font-semibold">— Amizone Fitness Center</p>
                    <Link
                        to="/contact"
                        className="inline-block mt-10 bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black px-12 py-4 rounded-xl transition text-lg uppercase tracking-wide"
                    >
                        Start Your Journey →
                    </Link>
                </div>
            </section>

        </div>
    )
}