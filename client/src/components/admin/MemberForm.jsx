import { useState } from 'react'
import { registerMember } from '../../lib/api'

export default function MemberForm({ onRegistered }) {
    const [form, setForm] = useState({
        full_name: '',
        phone_number: '',
        weight_kg: '',
        height_cm: '',
        fitness_goal: '',
        gender: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const member = await registerMember({
                ...form,
                weight_kg: form.weight_kg ? Number(form.weight_kg) : null,
                height_cm: form.height_cm ? Number(form.height_cm) : null,
            })
            setForm({
                full_name: '',
                phone_number: '',
                weight_kg: '',
                height_cm: '',
                fitness_goal: '',
                gender: '',
            })
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
            onRegistered?.(member)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-black text-lg">Register New Member</h2>
                <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-lg">
                    + New Member
                </span>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                    <span>⚠️</span> {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3 mb-4 flex items-center gap-2">
                    <span>✅</span> Member registered successfully!
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <input
                        name="full_name"
                        value={form.full_name}
                        onChange={handleChange}
                        placeholder="Full name"
                        required
                        className="col-span-1 sm:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                    <input
                        name="phone_number"
                        value={form.phone_number}
                        onChange={handleChange}
                        placeholder="Phone number"
                        required
                        className="col-span-1 sm:col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-zinc-950 font-black rounded-xl py-3 transition text-sm uppercase tracking-wide"
                >
                    {loading ? 'Registering...' : 'Register Member →'}
                </button>
            </form>
        </div>
    )
}