import { useState } from 'react'
import { deletePlan } from '../../lib/api'
import EditPlanModal from './EditPlanModal'

export default function PlanList({ plans, onRefresh }) {
    const [editingPlan, setEditingPlan] = useState(null)

    const durations = {
        30: 'Monthly',
        90: 'Quarterly',
        180: 'Semi-Annual',
        365: 'Annual',
    }

    async function handleDelete(id, name) {
        if (!confirm(`Delete "${name}" plan? This cannot be undone.`)) return
        try {
            await deletePlan(id)
            onRefresh?.()
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <>
            {editingPlan && (
                <EditPlanModal
                    plan={editingPlan}
                    onClose={() => setEditingPlan(null)}
                    onUpdated={() => { setEditingPlan(null); onRefresh?.() }}
                />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {plans.length === 0 && (
                    <p className="text-zinc-600 col-span-3 py-6">No plans created yet</p>
                )}
                {plans.map((plan) => (
                    <div key={plan.id} className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/40 rounded-2xl p-6 transition">
                        <div className="flex items-start justify-between">
                            <p className="text-white font-black text-lg">{plan.name}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-600 text-xs bg-zinc-800 px-2 py-1 rounded-lg font-bold">
                                    {durations[plan.duration_days] || `${plan.duration_days}d`}
                                </span>
                                <button
                                    onClick={() => setEditingPlan(plan)}
                                    className="text-zinc-500 hover:text-yellow-400 transition text-sm"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => handleDelete(plan.id, plan.name)}
                                    className="text-zinc-500 hover:text-red-400 transition text-sm"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                        <p className="text-yellow-400 text-3xl font-black mt-3">
                            {Number(plan.price_etb).toLocaleString()}
                            <span className="text-yellow-400/60 text-lg font-bold"> ETB</span>
                        </p>
                        <p className="text-zinc-500 text-xs mt-2">
                            {plan.duration_days} days • {Math.round(plan.price_etb / plan.duration_days)} ETB/day
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}