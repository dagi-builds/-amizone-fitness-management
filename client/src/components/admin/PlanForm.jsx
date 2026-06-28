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

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        try {
            const plan = await createPlan({
                name: form.name,
                price_etb: Number(form.price_etb),
                duration_days: Number(form.duration_days),
            })
            setForm({ name: '', price_etb: '', duration_days: '' })
            onCreated?.(plan)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 space-y-5"
        >
            <h2 className="text-zinc-100 text-xl font-semibold tracking-tight">
                Add membership plan
            </h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-3 gap-4">
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Plan name (e.g. Basic)"
                    required
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400 transition"
                />
                <input
                    name="price_etb"
                    value={form.price_etb}
                    onChange={handleChange}
                    placeholder="Price (ETB)"
                    type="number"
                    required
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400 transition"
                />
                <input
                    name="duration_days"
                    value={form.duration_days}
                    onChange={handleChange}
                    placeholder="Duration (days)"
                    type="number"
                    required
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400 transition"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-zinc-950 font-semibold rounded-xl py-3 transition"
            >
                {loading ? 'Adding...' : 'Add plan'}
            </button>
        </form>
    )
}