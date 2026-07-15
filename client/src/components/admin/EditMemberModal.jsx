import { useState } from 'react'
import { updateMember } from '../../lib/api'

export default function EditMemberModal({ member, onClose, onUpdated }) {
    const [form, setForm] = useState({
        full_name: member.full_name || '',
        phone_number: member.phone_number || '',
        weight_kg: member.weight_kg || '',
        height_cm: member.height_cm || '',
        fitness_goal: member.fitness_goal || '',
        gender: member.gender || '',
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
            const updated = await updateMember(member.id, {
                ...form,
                weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
                height_cm: form.height_cm ? Number(form.height_cm) : null,
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
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full max-w-lg">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-white font-black text-lg">Edit Member</h2>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition text-xl">✕</button>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                    <input
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            name="weight_kg"
                            value={form.weight_kg}
                            onChange={handleChange}
                            placeholder="Weight (kg)"
                            type="number"
                            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                        />
                        <input
                            name="height_cm"
                            value={form.height_cm}
                            onChange={handleChange}
                            placeholder="Height (cm)"
                            type="number"
                            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                        />
                        <select
                            name="gender"
                            value={form.gender}
                            onChange={handleChange}
                            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition text-sm"
                        >
                            <option value="">Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        <select
                            name="fitness_goal"
                            value={form.fitness_goal}
                            onChange={handleChange}
                            className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition text-sm"
                        >
                            <option value="">Fitness goal</option>
                            <option value="Weight Loss">Weight Loss</option>
                            <option value="Muscle Gain">Muscle Gain</option>
                            <option value="General Fitness">General Fitness</option>
                        </select>
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