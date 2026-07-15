import { useState } from 'react'
import { createSale } from '../../lib/api'

export default function SaleForm({ products, onSaleRecorded }) {
    const [productId, setProductId] = useState('')
    const [quantity, setQuantity] = useState(1)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)

    const selectedProduct = products.find(p => p.id === productId)
    const total = selectedProduct ? selectedProduct.price_etb * quantity : 0

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)
        try {
            await createSale({
                product_id: productId,
                quantity: Number(quantity),
                payment_method: paymentMethod,
            })
            setSuccess(`✅ Sale recorded — ${quantity}x ${selectedProduct.name} for ${total.toLocaleString()} ETB`)
            setProductId('')
            setQuantity(1)
            setPaymentMethod('')
            onSaleRecorded?.()
            setTimeout(() => setSuccess(null), 4000)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-black text-lg">Record Sale</h2>
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase bg-emerald-400/10 border border-emerald-400/20 px-3 py-1 rounded-lg">
                    💰 New Sale
                </span>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
                    ⚠️ {error}
                </div>
            )}
            {success && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-xl px-4 py-3 mb-4">
                    {success}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
                <select
                    value={productId}
                    onChange={e => setProductId(e.target.value)}
                    required
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition text-sm"
                >
                    <option value="">Select product</option>
                    {products.filter(p => p.stock_quantity > 0).map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} — {Number(p.price_etb).toLocaleString()} ETB ({p.stock_quantity} in stock)
                        </option>
                    ))}
                </select>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-zinc-500 text-xs font-bold uppercase tracking-widest block mb-1">Quantity</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                className="bg-zinc-800 hover:bg-zinc-700 text-white font-black w-10 h-10 rounded-xl transition text-lg"
                            >
                                −
                            </button>
                            <span className="text-white font-black text-xl flex-1 text-center">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => setQuantity(q => q + 1)}
                                className="bg-zinc-800 hover:bg-zinc-700 text-white font-black w-10 h-10 rounded-xl transition text-lg"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        required
                        className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white outline-none focus:border-yellow-400 transition text-sm self-end"
                    >
                        <option value="">Payment method</option>
                        <option value="Cash">💵 Cash</option>
                        <option value="Telebirr">📱 Telebirr</option>
                        <option value="CBE Birr">🏦 CBE Birr</option>
                    </select>
                </div>

                {selectedProduct && (
                    <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3">
                        <div className="flex justify-between items-center">
                            <span className="text-zinc-400 text-sm">Total</span>
                            <span className="text-yellow-400 font-black text-xl">
                                {total.toLocaleString()} ETB
                            </span>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading || !productId || !paymentMethod}
                    className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:opacity-50 text-zinc-950 font-black rounded-xl py-3 transition text-sm uppercase tracking-wide"
                >
                    {loading ? 'Recording...' : 'Record Sale →'}
                </button>
            </form>
        </div>
    )
}