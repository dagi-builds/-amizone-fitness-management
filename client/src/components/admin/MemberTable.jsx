import { useState } from 'react'
import { deleteMember } from '../../lib/api'
import EditMemberModal from './EditMemberModal'

export default function MemberTable({ members, onRefresh }) {
    const [editingMember, setEditingMember] = useState(null)

    const goalColors = {
        'Muscle Gain': 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
        'Weight Loss': 'bg-blue-400/10 text-blue-400 border-blue-400/20',
        'General Fitness': 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
    }

    async function handleDelete(id, name) {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
        try {
            await deleteMember(id)
            onRefresh?.()
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <>
            {editingMember && (
                <EditMemberModal
                    member={editingMember}
                    onClose={() => setEditingMember(null)}
                    onUpdated={() => { setEditingMember(null); onRefresh?.() }}
                />
            )}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-zinc-950 text-zinc-500 text-left text-xs uppercase tracking-widest">
                                <th className="px-5 py-3 font-bold">Name</th>
                                <th className="px-5 py-3 font-bold">Phone</th>
                                <th className="px-5 py-3 font-bold">Goal</th>
                                <th className="px-5 py-3 font-bold">Weight</th>
                                <th className="px-5 py-3 font-bold">Height</th>
                                <th className="px-5 py-3 font-bold">Joined</th>
                                <th className="px-5 py-3 font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-5 py-10 text-center text-zinc-600">
                                        No members registered yet
                                    </td>
                                </tr>
                            )}
                            {members.map((m) => (
                                <tr key={m.id} className="border-t border-zinc-800 text-zinc-100 hover:bg-zinc-950/60 transition">
                                    <td className="px-5 py-3 font-bold">{m.full_name}</td>
                                    <td className="px-5 py-3 text-zinc-400 font-mono text-xs">{m.phone_number}</td>
                                    <td className="px-5 py-3">
                                        {m.fitness_goal ? (
                                            <span className={`border text-xs px-2.5 py-1 rounded-lg font-bold ${goalColors[m.fitness_goal] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                                                {m.fitness_goal}
                                            </span>
                                        ) : <span className="text-zinc-700">—</span>}
                                    </td>
                                    <td className="px-5 py-3 text-zinc-400">{m.weight_kg ? `${m.weight_kg} kg` : '—'}</td>
                                    <td className="px-5 py-3 text-zinc-400">{m.height_cm ? `${m.height_cm} cm` : '—'}</td>
                                    <td className="px-5 py-3 text-zinc-500 text-xs">{new Date(m.created_at).toLocaleDateString()}</td>
                                    <td className="px-5 py-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setEditingMember(m)}
                                                className="text-zinc-500 hover:text-yellow-400 transition text-sm"
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                onClick={() => handleDelete(m.id, m.full_name)}
                                                className="text-zinc-500 hover:text-red-400 transition text-sm"
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}