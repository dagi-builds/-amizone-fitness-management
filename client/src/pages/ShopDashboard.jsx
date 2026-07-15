import { useEffect, useState } from 'react'
import { getProducts, getSales, getSalesSummary } from '../lib/api'
import ProductForm from '../components/admin/ProductForm'
import ProductList from '../components/admin/ProductList'
import SaleForm from '../components/admin/SaleForm'
import SalesHistory from '../components/admin/SalesHistory'

export default function ShopDashboard() {
    const [products, setProducts] = useState([])
    const [sales, setSales] = useState([])
    const [summary, setSummary] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('sell')

    async function loadProducts() {
        try {
            const data = await getProducts()
            setProducts(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function loadSales() {
        try {
            const [salesData, summaryData] = await Promise.all([getSales(), getSalesSummary()])
            setSales(salesData)
            setSummary(summaryData)
        } catch (err) {
            console.error(err)
        }
    }

    async function loadAll() {
        setLoading(true)
        await Promise.all([loadProducts(), loadSales()])
        setLoading(false)
    }

    useEffect(() => {
        loadAll()
    }, [])

    const tabs = [
        { id: 'sell', label: '💰 Record Sale' },
        { id: 'products', label: '📦 Products' },
        { id: 'history', label: '📊 Sales History' },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-white font-black text-xl">Shop Management</h2>
                    <p className="text-zinc-500 text-sm mt-0.5">Track products, sales, and revenue</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <p className="text-yellow-400 font-black text-xl leading-none">{products.length}</p>
                        <p className="text-zinc-500 text-xs">Products</p>
                    </div>
                    <div className="text-center">
                        <p className="text-emerald-400 font-black text-xl leading-none">{sales.length}</p>
                        <p className="text-zinc-500 text-xs">Sales</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-1 border-b border-zinc-800">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={
                            activeTab === tab.id
                                ? 'px-5 py-3 text-sm font-bold transition border-b-2 border-yellow-400 text-yellow-400'
                                : 'px-5 py-3 text-sm font-bold transition border-b-2 border-transparent text-zinc-500 hover:text-zinc-300'
                        }
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2].map(i => (
                        <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-16 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div>
                    {activeTab === 'sell' && (
                        <SaleForm
                            products={products}
                            onSaleRecorded={() => { loadSales(); loadProducts() }}
                        />
                    )}
                    {activeTab === 'products' && (
                        <div className="space-y-6">
                            <ProductForm onCreated={loadProducts} />
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-white font-black">All Products</h3>
                                    <span className="text-zinc-500 text-sm">{products.length} items</span>
                                </div>
                                <ProductList products={products} onRefresh={loadProducts} />
                            </div>
                        </div>
                    )}
                    {activeTab === 'history' && (
                        <SalesHistory sales={sales} summary={summary} />
                    )}
                </div>
            )}
        </div>
    )
}