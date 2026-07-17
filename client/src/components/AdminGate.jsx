import { useState, useEffect } from 'react'
import { getAdminPin } from '../lib/api'

export default function AdminGate({ children }) {
    const [pin, setPin] = useState('')
    const [correctPin, setCorrectPin] = useState(null)
    const [unlocked, setUnlocked] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    async function fetchPin() {
        setLoading(true)
        try {
            const data = await getAdminPin()
            setCorrectPin(data.pin)
        } catch (err) {
            console.error('Failed to fetch PIN:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPin()
    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        if (pin === correctPin) {
            setUnlocked(true)
        } else {
            setError(true)
            setPin('')
            setTimeout(() => setError(false), 2000)
        }
    }

    function handleLock() {
        setUnlocked(false)
        setPin('')
        fetchPin()
    }

    if (unlocked) {
        return (
            <div>
                {children}
                <button
                    onClick={handleLock}
                    className="fixed bottom-4 right-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-400 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition z-50"
                >
                    🔒 Lock Dashboard
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm">
                <div className="text-center mb-8">
                    <h1 className="text-white font-black text-2xl">
                        AMIZONE<span className="text-yellow-400">.GYM</span>
                    </h1>
                    <p className="text-zinc-500 text-sm mt-2">Admin Access Only</p>
                </div>

                {loading ? (
                    <div className="text-center text-zinc-500 text-sm py-4">Loading...</div>
                ) : (
                    <>
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
                    </>
                )}
            </div>
        </div>
    )
}