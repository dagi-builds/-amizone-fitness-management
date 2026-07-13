import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()
    const [open, setOpen] = useState(false)

    const links = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/services', label: 'Services' },
        { to: '/contact', label: 'Contact' },
    ]

    return (
        <nav className="bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 px-6 md:px-10 py-5 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <span className="text-2xl font-black text-white tracking-tight">
                        AMIZONE<span className="text-yellow-400">.GYM</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`text-sm font-semibold tracking-wide transition ${location.pathname === link.to
                                    ? 'text-yellow-400'
                                    : 'text-zinc-400 hover:text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <Link
                    to="/contact"
                    className="hidden md:inline-block bg-yellow-400 hover:bg-yellow-300 text-zinc-950 text-sm font-bold px-6 py-2.5 rounded-xl transition"
                >
                    Join Now
                </Link>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-zinc-100 p-2"
                    aria-label="Toggle menu"
                >
                    {open ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    )}
                </button>
            </div>

            {open && (
                <div className="md:hidden flex flex-col gap-4 mt-6 pb-4 max-w-6xl mx-auto">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className={`text-sm font-semibold ${location.pathname === link.to ? 'text-yellow-400' : 'text-zinc-400'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setOpen(false)}
                        className="bg-yellow-400 text-zinc-950 text-sm font-bold px-6 py-3 rounded-xl text-center"
                    >
                        Join Now
                    </Link>
                </div>
            )}
        </nav>
    )
}