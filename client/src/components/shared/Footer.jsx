import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-800 px-6 md:px-10 py-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
                <div>
                    <h3 className="text-white font-black text-xl">
                        AMIZONE<span className="text-yellow-400">.GYM</span>
                    </h3>
                    <p className="text-zinc-500 text-sm max-w-xs mt-3 leading-relaxed">
                        Addis Ababa's premier fitness center. Built for those who refuse to settle.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-widest">Hours</h4>
                    <p className="text-zinc-500 text-sm">Monday – Sunday</p>
                    <p className="text-yellow-400 font-bold text-sm">5:00 AM – 10:00 PM</p>
                </div>

                <div>
                    <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-widest">Contact</h4>
                    <p className="text-zinc-500 text-sm">Addis Ababa, Ethiopia</p>
                    <p className="text-zinc-500 text-sm">+251 91 123 4567</p>
                </div>

                <div>
                    <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-widest">Quick Links</h4>
                    <div className="flex flex-col gap-2">
                        <Link to="/" className="text-zinc-500 hover:text-yellow-400 text-sm transition">Home</Link>
                        <Link to="/about" className="text-zinc-500 hover:text-yellow-400 text-sm transition">About</Link>
                        <Link to="/services" className="text-zinc-500 hover:text-yellow-400 text-sm transition">Services</Link>
                        <Link to="/contact" className="text-zinc-500 hover:text-yellow-400 text-sm transition">Contact</Link>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
                <p className="text-zinc-600 text-xs">
                    © {new Date().getFullYear()} Amizone Fitness Center. All rights reserved.
                </p>
                <p className="text-zinc-700 text-xs font-bold tracking-widest uppercase">
                    No Limits. No Excuses.
                </p>
            </div>
        </footer>
    )
}