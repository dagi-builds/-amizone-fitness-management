export default function PlanList({ plans }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.length === 0 && (
                <p className="text-zinc-500 col-span-3">No plans yet</p>
            )}
            {plans.map((plan) => (
                <div
                    key={plan.id}
                    className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
                >
                    <p className="text-zinc-100 font-semibold text-lg">{plan.name}</p>
                    <p className="text-emerald-400 text-2xl font-bold mt-2">
                        {plan.price_etb} ETB
                    </p>
                    <p className="text-zinc-500 text-sm mt-1">
                        {plan.duration_days} days
                    </p>
                </div>
            ))}
        </div>
    )
}