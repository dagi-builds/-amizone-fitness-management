import { useState } from 'react'
import { assignSubscription } from '../../lib/api'

export default function SubscriptionAssign({ members, plans, onAssigned }) {
    const [memberId, setMemberId] = useState('')
    const [planId, setPlanId] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)
        try {
            const sub = await assignSubscription(memberId, planId)
            setSuccess(`Subscription active until ${new Date(sub.end_date).toLocaleDateString()}`)
            setMemberId('')
            setPlanId('')
            onAssigned?.(sub)
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
                Assign subscription
            </h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                    {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-400/10 border border-emerald-400/30 text-emerald-400 text-sm rounded-xl px-4 py-3">
                    {success}
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <select
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    required
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-emerald-400 transition"
                >
                    <option value="">Select member</option>
                    {members.map((m) => (
                        <option key={m.id} value={m.id}>
                            {m.full_name} — {m.phone_number}
                        </option>
                    ))}
                </select>

                <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    required
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-emerald-400 transition"
                >
                    <option value="">Select plan</option>
                    {plans.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name} — {p.price_etb} ETB / {p.duration_days}d
                        </option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-zinc-950 font-semibold rounded-xl py-3 transition"
            >
                {loading ? 'Assigning...' : 'Assign subscription'}
            </button>
        </form>
    )
}