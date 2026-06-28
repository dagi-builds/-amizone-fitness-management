export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-800 px-10 py-10 mt-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                <div>
                    <h3 className="text-zinc-100 font-bold text-lg mb-2">
                        Amizone <span className="text-emerald-400">Fitness</span>
                    </h3>
                    <p className="text-zinc-500 text-sm max-w-xs">
                        Premium fitness training, modern equipment, and a community dedicated to helping you reach your goals.
                    </p>
                </div>

                <div>
                    <h4 className="text-zinc-200 font-semibold text-sm mb-3">Hours</h4>
                    <p className="text-zinc-500 text-sm">Mon - Sun: 5:00 AM - 10:00 PM</p>
                </div>

                <div>
                    <h4 className="text-zinc-200 font-semibold text-sm mb-3">Contact</h4>
                    <p className="text-zinc-500 text-sm">Addis Ababa, Ethiopia</p>
                    <p className="text-zinc-500 text-sm">info@amizonefitness.com</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto border-t border-zinc-800 mt-8 pt-6">
                <p className="text-zinc-600 text-xs">
                    © {new Date().getFullYear()} Amizone Fitness Center. All rights reserved.
                </p>
            </div>
        </footer>
    )
}