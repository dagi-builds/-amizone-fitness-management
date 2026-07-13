export default function PlanList({ plans }) {
    const durations = {
        30: 'Monthly',
        90: 'Quarterly',
        180: 'Semi-Annual',
        365: 'Annual',
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {plans.length === 0 && (
                <p className="text-zinc-600 col-span-3 py-6">No plans created yet</p>
            )}
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    className="bg-zinc-900 border border-zinc-800 hover:border-yellow-400/40 rounded-2xl p-6 transition"
                >
                    <div className="flex items-start justify-between">
                        <p className="text-white font-black text-lg">{plan.name}</p>
                        <span className="text-zinc-600 text-xs bg-zinc-800 px-2 py-1 rounded-lg font-bold">
                            {durations[plan.duration_days] || `${plan.duration_days}d`}
                        </span>
                    </div>
                    <p className="text-yellow-400 text-3xl font-black mt-3">
                        {plan.price_etb.toLocaleString()}
                        <span className="text-yellow-400/60 text-lg font-bold"> ETB</span>
                    </p>
                    <p className="text-zinc-500 text-xs mt-2">
                        {plan.duration_days} days • {Math.round(plan.price_etb / plan.duration_days)} ETB/day
                    </p>
                </div>
            ))}
        </div>
    )
}