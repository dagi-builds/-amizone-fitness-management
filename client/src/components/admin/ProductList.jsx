import { useState } from 'react'
import { deleteProduct, updateProduct } from '../../lib/api'

const CATEGORIES = ['Supplement', 'Hygiene', 'Drink', 'Equipment', 'Clothing', 'Other']

const categoryColors = {
    Supplement: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    Hygiene: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
    Drink: 'bg-cyan-400/10 text-cyan-400 border-cyan-400/20',
    Equipment: 'bg-orange-400/10 text-orange-400 border-orange-400/20',
    Clothing: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
    Other: 'bg-zinc-400/10 text-zinc-400 border-zinc-400/20',
}

function StockBadge({ qty }) {
    if (qty === 0) return (
        <span className="flex items-center gap-1 text-xs font-bold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-1 rounded-lg">
            ❌ Out of stock
        </span>
    )
    if (qty <= 5) return (
        <span className="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-1 rounded-lg">
            ⚠️ Low: {qty} left
        </span>
    )
    return (
        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2 py-1 rounded-lg">
            ✅ {qty} in stock
        </span>
    )
}

export default function ProductList({ products, onRefresh }) {
    const [editingId, setEditingId] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [loading, setLoading] = useState(false)

    function startEdit(product) {
        setEditingId(product.id)
        setEditForm({
            name: product.name,
            category: product.category,
            price_etb: product.price_etb,
            stock_quantity: product.stock_quantity,
            description: product.description || '',
        })
    }

    async function handleUpdate(id) {
        setLoading(true)
        try {
            await updateProduct(id, {
                ...editForm,
                price_etb: Number(editForm.price_etb),
                stock_quantity: Number(editForm.stock_quantity),
            })
            setEditingId(null)
            onRefresh?.()
        } catch (err) {
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete(id, name) {
        if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
        try {
            await deleteProduct(id)
            onRefresh?.()
        } catch (err) {
            alert(err.message)
        }
    }

    if (products.length === 0) {
        return (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
                <p className="text-zinc-600">No products added yet</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <div key={product.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    {editingId === product.id ? (
                        <div className="space-y-2">
                            <input
                                value={editForm.name}
                                onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-yellow-400"
                            />
                            <select
                                value={editForm.category}
                                onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-yellow-400"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    value={editForm.price_etb}
                                    onChange={e => setEditForm({ ...editForm, price_etb: e.target.value })}
                                    placeholder="Price ETB"
                                    type="number"
                                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-yellow-400"
                                />
                                <input
                                    value={editForm.stock_quantity}
                                    onChange={e => setEditForm({ ...editForm, stock_quantity: e.target.value })}
                                    placeholder="Stock"
                                    type="number"
                                    className="bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-yellow-400"
                                />
                            </div>
                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={() => setEditingId(null)}
                                    className="flex-1 bg-zinc-800 text-white text-xs font-bold rounded-xl py-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleUpdate(product.id)}
                                    disabled={loading}
                                    className="flex-1 bg-yellow-400 text-zinc-950 text-xs font-black rounded-xl py-2"
                                >
                                    {loading ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="text-white font-black">{product.name}</p>
                                    <span className={`inline-block border text-xs px-2 py-0.5 rounded-lg font-bold mt-1 ${categoryColors[product.category] || categoryColors.Other}`}>
                                        {product.category}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => startEdit(product)}
                                        className="text-zinc-500 hover:text-yellow-400 transition text-sm"
                                    >
                                        ✏️
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id, product.name)}
                                        className="text-zinc-500 hover:text-red-400 transition text-sm"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                            <p className="text-yellow-400 text-2xl font-black">
                                {Number(product.price_etb).toLocaleString()}
                                <span className="text-yellow-400/60 text-sm font-bold"> ETB</span>
                            </p>
                            {product.description && (
                                <p className="text-zinc-500 text-xs mt-2 leading-relaxed">{product.description}</p>
                            )}
                            <div className="mt-3">
                                <StockBadge qty={product.stock_quantity} />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}