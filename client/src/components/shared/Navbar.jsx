import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const location = useLocation()

    const links = [
        { to: '/', label: 'Home' },
        { to: '/about', label: 'About' },
        { to: '/services', label: 'Services' },
        { to: '/contact', label: 'Contact' },
    ]

    return (
        <nav className="bg-zinc-950 border-b border-zinc-800 px-10 py-5 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold text-zinc-100 tracking-tight">
                Amizone <span className="text-emerald-400">Fitness</span>
            </Link>

            <div className="flex items-center gap-8">
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
            </div>

            <Link
                to="/admin"
                className="bg-emerald-400 hover:bg-emerald-300 text-zinc-950 text-sm font-semibold px-5 py-2.5 rounded-xl transition"
            >
                Staff Login
            </Link>
        </nav>
    )
}