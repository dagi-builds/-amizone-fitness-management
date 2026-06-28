export default function Services() {
    const services = [
        {
            title: 'Strength Training',
            text: 'Full range of free weights, squat racks, and machines for building serious strength.',
        },
        {
            title: 'Cardio & Conditioning',
            text: 'Treadmills, rowers, and spin bikes to build endurance and burn calories.',
        },
        {
            title: 'Personal Training',
            text: 'One-on-one sessions tailored to your specific fitness goals and experience level.',
        },
        {
            title: 'Sauna & Steam Room',
            text: 'Recover and relax after your workout in our sauna and steam facilities.',
        },
        {
            title: 'Group Classes',
            text: 'High-energy group sessions designed to keep you motivated and consistent.',
        },
        {
            title: 'Nutrition Guidance',
            text: 'Practical, locally-relevant nutrition advice to support your training goals.',
        },
    ]

    return (
        <div className="bg-zinc-950 min-h-screen px-4 md:px-10 py-16 md:py-24">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 tracking-tight text-center">
                    Our <span className="text-emerald-400">Services</span>
                </h1>
                <p className="text-zinc-400 text-base md:text-lg mt-4 text-center max-w-2xl mx-auto px-2">
                    Everything you need to train, recover, and grow — all under one roof.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 md:mt-14">
                    {services.map((service) => (
                        <div
                            key={service.title}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-emerald-400/40 transition"
                        >
                            <h3 className="text-zinc-100 font-semibold text-lg mb-3">{service.title}</h3>
                            <p className="text-zinc-400 text-sm leading-relaxed">{service.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}