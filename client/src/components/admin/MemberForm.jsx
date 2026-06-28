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

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)
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
            onRegistered?.(member)
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
                Register member
            </h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    name="full_name"
                    value={form.full_name}
                    onChange={handleChange}
                    placeholder="Full name"
                    required
                    className="col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400 transition"
                />
                <input
                    name="phone_number"
                    value={form.phone_number}
                    onChange={handleChange}
                    placeholder="Phone number"
                    required
                    className="col-span-2 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400 transition"
                />
                <input
                    name="weight_kg"
                    value={form.weight_kg}
                    onChange={handleChange}
                    placeholder="Weight (kg)"
                    type="number"
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400 transition"
                />
                <input
                    name="height_cm"
                    value={form.height_cm}
                    onChange={handleChange}
                    placeholder="Height (cm)"
                    type="number"
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 placeholder:text-zinc-500 outline-none focus:border-emerald-400 transition"
                />
                <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-emerald-400 transition"
                >
                    <option value="">Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                <select
                    name="fitness_goal"
                    value={form.fitness_goal}
                    onChange={handleChange}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 outline-none focus:border-emerald-400 transition"
                >
                    <option value="">Fitness goal</option>
                    <option value="Weight Loss">Weight loss</option>
                    <option value="Muscle Gain">Muscle gain</option>
                    <option value="General Fitness">General fitness</option>
                </select>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-zinc-950 font-semibold rounded-xl py-3 transition"
            >
                {loading ? 'Registering...' : 'Register member'}
            </button>
        </form>
    )
}