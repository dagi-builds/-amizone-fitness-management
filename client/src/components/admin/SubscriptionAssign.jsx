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
            setSuccess(`✅ Subscription active until ${new Date(sub.end_date).toLocaleDateString()}`)
            setMemberId('')
            setPlanId('')
            onAssigned?.(sub)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    const selectedMember = members.find((m) => m.id === memberId)
    const selectedPlan = plans.find((p) => p.id === planId)

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-black text-lg">Assign Subscription</h2>
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-lg">
                    🔗 Link Plan
                </span>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                    <span>⚠️</span> {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3 mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <select
                        value={memberId}
                        onChange={(e) => setMemberId(e.target.value)}
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition text-sm"
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
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition text-sm"
                    >
                        <option value="">Select plan</option>
                        {plans.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name} — {p.price_etb} ETB / {p.duration_days}d
                            </option>
                        ))}
                    </select>
                </div>

                {selectedMember && selectedPlan && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 mb-4 text-sm">
                        <p className="text-zinc-400">
                            Assigning <span className="text-white font-bold">{selectedMember.full_name}</span> to{' '}
                            <span className="text-yellow-400 font-bold">{selectedPlan.name}</span> plan for{' '}
                            <span className="text-white font-bold">{selectedPlan.duration_days} days</span>
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-zinc-950 font-black rounded-xl py-3 transition text-sm uppercase tracking-wide"
                >
                    {loading ? 'Assigning...' : 'Assign Subscription →'}
                </button>
            </form>
        </div>
    )
}