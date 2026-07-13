import { Link } from 'react-router-dom'

export default function Services() {
    const services = [
        {
            icon: '🏋️',
            title: 'Strength Training',
            text: 'Full range of free weights, squat racks, barbells, and machines for building serious, functional strength.',
            accent: 'yellow',
        },
        {
            icon: '🏃',
            title: 'Cardio & Conditioning',
            text: 'Modern treadmills, rowers, ellipticals, and spin bikes to build endurance and torch calories.',
            accent: 'blue',
        },
        {
            icon: '👤',
            title: 'Personal Training',
            text: 'One-on-one sessions with certified trainers, tailored to your specific goals and experience level.',
            accent: 'yellow',
        },
        {
            icon: '🧖',
            title: 'Sauna & Steam Room',
            text: 'Premium marble sauna and steam room for deep muscle recovery and total relaxation after your workout.',
            accent: 'blue',
        },
        {
            icon: '👥',
            title: 'Group Classes',
            text: 'High-energy group training sessions designed to keep you motivated, accountable, and consistent.',
            accent: 'yellow',
        },
        {
            icon: '🥗',
            title: 'Nutrition Guidance',
            text: 'Practical, locally-relevant nutrition advice using Ethiopian foods to fuel your training and recovery.',
            accent: 'green',
        },
    ]

    return (
        <div className="bg-zinc-950 min-h-screen">

            <section className="px-4 md:px-10 py-20 bg-zinc-900 border-b border-zinc-800 text-center">
                <span className="text-yellow-400 text-sm font-bold tracking-widest uppercase">
                    What We Offer
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-3">
                    World-Class <span className="text-yellow-400">Facilities</span>
                </h1>
                <p className="text-zinc-400 text-lg mt-4 max-w-2xl mx-auto">
                    Everything you need to train hard, recover well, and keep coming back stronger.
                </p>
            </section>

            <section className="px-4 md:px-10 py-20">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className={`bg-zinc-900 border rounded-2xl p-8 transition duration-300 cursor-default ${service.accent === 'yellow'
                                    ? 'border-zinc-800 hover:border-yellow-400'
                                    : service.accent === 'blue'
                                        ? 'border-zinc-800 hover:border-blue-400'
                                        : 'border-zinc-800 hover:border-emerald-400'
                                }`}
                        >
                            <span className="text-4xl">{service.icon}</span>
                            <h3 className={`font-black text-xl mt-4 mb-3 ${service.accent === 'yellow'
                                    ? 'text-yellow-400'
                                    : service.accent === 'blue'
                                        ? 'text-blue-400'
                                        : 'text-emerald-400'
                                }`}>
                                {service.title}
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{service.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-4 md:px-10 py-16 bg-yellow-400">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-zinc-950 tracking-tight">
                        Ready to Train Like a Champion?
                    </h2>
                    <p className="text-zinc-800 mt-3 text-lg font-medium">
                        Join Amizone Fitness Center today and unlock all these facilities.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block mt-8 bg-zinc-950 hover:bg-zinc-800 text-white font-black px-12 py-4 rounded-xl transition text-lg uppercase tracking-wide"
                    >
                        Join Now →
                    </Link>
                </div>
            </section>

        </div>
    )
}