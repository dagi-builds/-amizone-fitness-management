import { useState } from 'react'
import { createPlan } from '../../lib/api'

export default function PlanForm({ onCreated }) {
    const [form, setForm] = useState({
        name: '',
        price_etb: '',
        duration_days: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const plan = await createPlan({
                name: form.name,
                price_etb: Number(form.price_etb),
                duration_days: Number(form.duration_days),
            })
            setForm({ name: '', price_etb: '', duration_days: '' })
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
            onCreated?.(plan)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-black text-lg">Add Membership Plan</h2>
                <span className="text-blue-400 text-xs font-bold tracking-widest uppercase bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-lg">
                    + New Plan
                </span>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                    <span>⚠️</span> {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                    <span>✅</span> Plan created successfully!
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Plan name (e.g. Basic)"
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                    <input
                        name="price_etb"
                        value={form.price_etb}
                        onChange={handleChange}
                        placeholder="Price in ETB"
                        type="number"
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                    <input
                        name="duration_days"
                        value={form.duration_days}
                        onChange={handleChange}
                        placeholder="Duration (days)"
                        type="number"
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-zinc-950 font-black rounded-xl py-3 transition text-sm uppercase tracking-wide"
                >
                    {loading ? 'Adding...' : 'Add Plan →'}
                </button>
            </form>
        </div>
    )
}