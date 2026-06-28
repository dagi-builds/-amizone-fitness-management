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
        <nav className="bg-zinc-950 border-b border-zinc-800 px-6 md:px-10 py-5">
            <div className="flex items-center justify-between">
                <Link to="/" className="text-xl font-bold text-zinc-100 tracking-tight">
                    Amizone <span className="text-emerald-400">Fitness</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`text-sm font-medium transition ${location.pathname === link.to
                                    ? 'text-emerald-400'
                                    : 'text-zinc-400 hover:text-zinc-100'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/admin"
                        className="bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition"
                    >
                        Staff Login
                    </Link>
                </div>

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
                <div className="md:hidden flex flex-col gap-4 mt-6 pb-2">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => setOpen(false)}
                            className={`text-sm font-medium ${location.pathname === link.to ? 'text-emerald-400' : 'text-zinc-400'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="bg-emerald-400 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl text-center"
                    >
                        Staff Login
                    </Link>
                </div>
            )}
        </nav>
    )
}