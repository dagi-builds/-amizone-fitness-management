export default function MemberTable({ members }) {
    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-zinc-950 text-zinc-500 text-left">
                        <th className="px-6 py-4 font-medium">Name</th>
                        <th className="px-6 py-4 font-medium">Phone</th>
                        <th className="px-6 py-4 font-medium">Goal</th>
                        <th className="px-6 py-4 font-medium">Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {members.length === 0 && (
                        <tr>
                            <td colSpan={4} className="px-6 py-10 text-center text-zinc-500">
                                No members yet
                            </td>
                        </tr>
                    )}
                    {members.map((m) => (
                        <tr key={m.id} className="border-t border-zinc-800 text-zinc-100 hover:bg-zinc-950/50 transition">
                            <td className="px-6 py-4 font-medium">{m.full_name}</td>
                            <td className="px-6 py-4 text-zinc-400">{m.phone_number}</td>
                            <td className="px-6 py-4">
                                {m.fitness_goal ? (
                                    <span className="bg-emerald-400/10 text-emerald-400 text-xs px-3 py-1 rounded-full">
                                        {m.fitness_goal}
                                    </span>
                                ) : (
                                    <span className="text-zinc-600">-</span>
                                )}
                            </td>
                            <td className="px-6 py-4 text-zinc-400">
                                {new Date(m.created_at).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}