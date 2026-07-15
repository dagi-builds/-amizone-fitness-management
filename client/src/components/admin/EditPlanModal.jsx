import { useState } from 'react'
import { updatePlan } from '../../lib/api'

export default function EditPlanModal({ plan, onClose, onUpdated }) {
    const [form, setForm] = useState({
        name: plan.name || '',
        price_etb: plan.price_etb || '',
        duration_days: plan.duration_days || '',
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
            const updated = await updatePlan(plan.id, {
                name: form.name,
                price_etb: Number(form.price_etb),
                duration_days: Number(form.duration_days),
            })
            onUpdated?.(updated)
            onClose()
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-white font-black text-lg">Edit Plan</h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition text-xl">✕</button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Plan name"
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            name="price_etb"
                            value={form.price_etb}
                            onChange={handleChange}
                            placeholder="Price (ETB)"
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
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl py-3 transition text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-zinc-950 font-black rounded-xl py-3 transition text-sm"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}