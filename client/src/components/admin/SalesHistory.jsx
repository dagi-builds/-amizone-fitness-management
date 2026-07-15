export default function SalesHistory({ sales, summary }) {
    const methodColors = {
        Cash: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20',
        Telebirr: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
        'CBE Birr': 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
    }

    return (
        <div className="space-y-6">
            {summary && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Total Revenue</p>
                        <p className="text-yellow-400 text-2xl font-black mt-1">
                            {Number(summary.total).toLocaleString()} ETB
                        </p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Today</p>
                        <p className="text-emerald-400 text-2xl font-black mt-1">
                            {Number(summary.todayTotal).toLocaleString()} ETB
                        </p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Transactions</p>
                        <p className="text-blue-400 text-2xl font-black mt-1">{summary.transactionCount}</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">By Method</p>
                        {summary.byMethod && Object.entries(summary.byMethod).map(([method, amount]) => (
                            <div key={method} className="flex justify-between text-xs mb-1">
                                <span className="text-zinc-400">{method}</span>
                                <span className="text-white font-bold">{Number(amount).toLocaleString()} ETB</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-zinc-950 text-zinc-500 text-left text-xs uppercase tracking-widest">
                                <th className="px-5 py-3 font-bold">Product</th>
                                <th className="px-5 py-3 font-bold">Category</th>
                                <th className="px-5 py-3 font-bold">Qty</th>
                                <th className="px-5 py-3 font-bold">Unit Price</th>
                                <th className="px-5 py-3 font-bold">Total</th>
                                <th className="px-5 py-3 font-bold">Payment</th>
                                <th className="px-5 py-3 font-bold">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-5 py-10 text-center text-zinc-600">
                                        No sales recorded yet
                                    </td>
                                </tr>
                            )}
                            {sales.map((sale) => (
                                <tr key={sale.id} className="border-t border-zinc-800 hover:bg-zinc-950/60 transition">
                                    <td className="px-5 py-3 text-white font-bold">{sale.products?.name}</td>
                                    <td className="px-5 py-3 text-zinc-400">{sale.products?.category}</td>
                                    <td className="px-5 py-3 text-zinc-300">{sale.quantity}</td>
                                    <td className="px-5 py-3 text-zinc-400">{Number(sale.unit_price_etb).toLocaleString()} ETB</td>
                                    <td className="px-5 py-3 text-yellow-400 font-black">{Number(sale.total_etb).toLocaleString()} ETB</td>
                                    <td className="px-5 py-3">
                                        <span className={`border text-xs px-2.5 py-1 rounded-lg font-bold ${methodColors[sale.payment_method] || 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                                            {sale.payment_method}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-zinc-500 text-xs">
                                        {new Date(sale.sold_at).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}