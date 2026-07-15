import { useState } from 'react'
import { createProduct } from '../../lib/api'

const CATEGORIES = ['Supplement', 'Hygiene', 'Drink', 'Equipment', 'Clothing', 'Other']

export default function ProductForm({ onCreated }) {
    const [form, setForm] = useState({
        name: '',
        category: '',
        price_etb: '',
        stock_quantity: '',
        description: '',
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
            const product = await createProduct({
                ...form,
                price_etb: Number(form.price_etb),
                stock_quantity: Number(form.stock_quantity),
            })
            setForm({ name: '', category: '', price_etb: '', stock_quantity: '', description: '' })
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
            onCreated?.(product)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-black text-lg">Add Product</h2>
                <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-lg">
                    + New Item
                </span>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
                    ⚠️ {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3 mb-4">
                    ✅ Product added successfully!
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product name (e.g. Shampoo)"
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition text-sm"
                    >
                        <option value="">Select category</option>
                        {CATEGORIES.map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <input
                        name="price_etb"
                        value={form.price_etb}
                        onChange={handleChange}
                        placeholder="Price (ETB)"
                        type="number"
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                    <input
                        name="stock_quantity"
                        value={form.stock_quantity}
                        onChange={handleChange}
                        placeholder="Stock quantity"
                        type="number"
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                    />
                </div>
                <input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description (optional)"
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-yellow-400 transition text-sm"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-400 hover:bg-yellow-300 disabled:opacity-50 text-zinc-950 font-black rounded-xl py-3 transition text-sm uppercase tracking-wide"
                >
                    {loading ? 'Adding...' : 'Add Product →'}
                </button>
            </form>
        </div>
    )
}