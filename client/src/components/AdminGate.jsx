import { useState } from 'react'

const ADMIN_PIN = import.meta.env.VITE_ADMIN_PIN || '1234'

export default function AdminGate({ children }) {
    const [pin, setPin] = useState('')
    const [unlocked, setUnlocked] = useState(false)
    const [error, setError] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        if (pin === ADMIN_PIN) {
            setUnlocked(true)
        } else {
            setError(true)
            setPin('')
            setTimeout(() => setError(false), 2000)
        }
    }

    if (unlocked) return children

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-white font-black text-2xl">
                        AMIZONE<span className="text-yellow-400">.GYM</span>
                    </h1>
                    <p className="text-zinc-500 text-sm mt-2">Admin Access Only</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4 text-center">
                        ⚠️ Incorrect PIN
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="password"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        placeholder="Enter admin PIN"
                        maxLength={6}
                        autoFocus
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white text-center text-2xl tracking-widest placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition"
                    />
                    <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-zinc-950 font-black rounded-xl py-3 transition uppercase tracking-wide"
                    >
                        Unlock Dashboard
                    </button>
                </form>
            </div>
        </div>
    )
}