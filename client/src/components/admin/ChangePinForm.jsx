import { useState } from 'react'
import { updateAdminPin } from '../../lib/api'

export default function ChangePinForm() {
    const [form, setForm] = useState({
        current_pin: '',
        new_pin: '',
        confirm_pin: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setError(null)
        setSuccess(false)

        if (form.new_pin !== form.confirm_pin) {
            setError('New PIN and confirm PIN do not match')
            return
        }

        if (form.new_pin.length < 4) {
            setError('New PIN must be at least 4 characters')
            return
        }

        setLoading(true)
        try {
            await updateAdminPin(form.current_pin, form.new_pin)
            setForm({ current_pin: '', new_pin: '', confirm_pin: '' })
            setSuccess(true)
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-white font-black text-lg">Change Admin PIN</h2>
                    <p className="text-zinc-500 text-xs mt-1">Update your dashboard access PIN</p>
                </div>
                <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-lg">
                    🔐 Security
                </span>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                    <span>⚠️</span> {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                    <span>✅</span> PIN updated! Logging you out in 2 seconds — use your new PIN to log back in.
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                    <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-1">
                        Current PIN
                    </label>
                    <input
                        name="current_pin"
                        type="password"
                        value={form.current_pin}
                        onChange={handleChange}
                        placeholder="Enter current PIN"
                        required
                        maxLength={6}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm tracking-widest"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-1">
                            New PIN
                        </label>
                        <input
                            name="new_pin"
                            type="password"
                            value={form.new_pin}
                            onChange={handleChange}
                            placeholder="Enter new PIN"
                            required
                            maxLength={6}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm tracking-widest"
                        />
                    </div>
                    <div>
                        <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-1">
                            Confirm New PIN
                        </label>
                        <input
                            name="confirm_pin"
                            type="password"
                            value={form.confirm_pin}
                            onChange={handleChange}
                            placeholder="Confirm new PIN"
                            required
                            maxLength={6}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm tracking-widest"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-zinc-950 font-black rounded-xl py-3 transition text-sm uppercase tracking-wide"
                >
                    {loading ? 'Updating...' : 'Update PIN →'}
                </button>
            </form>
        </div>
    )
}