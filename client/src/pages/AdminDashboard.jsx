import { useEffect, useState } from 'react'
import { getMembers, getPlans } from '../lib/api'
import MemberForm from '../components/admin/MemberForm'
import MemberTable from '../components/admin/MemberTable'
import PlanForm from '../components/admin/PlanForm'
import PlanList from '../components/admin/PlanList'
import SubscriptionAssign from '../components/admin/SubscriptionAssign'
import ShopDashboard from './ShopDashboard'

export default function AdminDashboard() {
    const [members, setMembers] = useState([])
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('members')

    async function loadMembers() {
        try {
            const data = await getMembers()
            setMembers(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function loadPlans() {
        try {
            const data = await getPlans()
            setPlans(data)
        } catch (err) {
            console.error(err)
        }
    }

    async function loadAll() {
        setLoading(true)
        await Promise.all([loadMembers(), loadPlans()])
        setLoading(false)
    }

    useEffect(() => {
        loadAll()
    }, [])

    const tabs = [
        { id: 'members', label: '👥 Members' },
        { id: 'plans', label: '📋 Plans' },
        { id: 'subscriptions', label: '🔗 Subscriptions' },
        { id: 'shop', label: '🛍️ Shop' },
    ]

    return (
        <div className="min-h-screen bg-zinc-950">
            <header className="bg-zinc-900 border-b border-zinc-800 px-4 md:px-10 py-4">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-400 text-zinc-950 text-xs font-black px-3 py-1 rounded-lg uppercase tracking-widest">
                            Admin
                        </div>
                        <h1 className="text-white font-black text-lg tracking-tight">
                            AMIZONE<span className="text-yellow-400">.GYM</span>
                        </h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-center">
                            <p className="text-yellow-400 text-xl font-black leading-none">{members.length}</p>
                            <p className="text-zinc-500 text-xs">Members</p>
                        </div>
                        <div className="text-center">
                            <p className="text-blue-400 text-xl font-black leading-none">{plans.length}</p>
                            <p className="text-zinc-500 text-xs">Plans</p>
                        </div>
                        <a href="/" className="text-zinc-500 hover:text-white text-sm transition font-medium">
                            ← Public Site
                        </a>
                    </div>
                </div>
            </header>

            <div className="bg-zinc-900 border-b border-zinc-800 px-4 md:px-10 overflow-x-auto">
                <div className="max-w-7xl mx-auto flex gap-1 min-w-max">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={
                                activeTab === tab.id
                                    ? 'px-5 py-3 text-sm font-bold transition border-b-2 border-yellow-400 text-yellow-400 whitespace-nowrap'
                                    : 'px-5 py-3 text-sm font-bold transition border-b-2 border-transparent text-zinc-500 hover:text-zinc-300 whitespace-nowrap'
                            }
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <main className="px-4 md:px-10 py-8">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl h-16 animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div>
                            {activeTab === 'members' && (
                                <div className="space-y-6">
                                    <MemberForm onRegistered={loadMembers} />
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h2 className="text-white font-black text-lg">All Members</h2>
                                            <span className="text-zinc-500 text-sm">{members.length} total</span>
                                        </div>
                                        <MemberTable members={members} onRefresh={loadMembers} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'plans' && (
                                <div className="space-y-6">
                                    <PlanForm onCreated={loadPlans} />
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <h2 className="text-white font-black text-lg">Membership Plans</h2>
                                            <span className="text-zinc-500 text-sm">{plans.length} plans</span>
                                        </div>
                                        <PlanList plans={plans} onRefresh={loadPlans} />
                                    </div>
                                </div>
                            )}

                            {activeTab === 'subscriptions' && (
                                <div className="space-y-6">
                                    <SubscriptionAssign
                                        members={members}
                                        plans={plans}
                                        onAssigned={loadAll}
                                    />
                                </div>
                            )}

                            {activeTab === 'shop' && <ShopDashboard />}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}