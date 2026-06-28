import { useEffect, useState } from 'react'
import { getMembers, getPlans } from '../lib/api'
import MemberForm from '../components/admin/MemberForm'
import MemberTable from '../components/admin/MemberTable'
import PlanForm from '../components/admin/PlanForm'
import PlanList from '../components/admin/PlanList'
import SubscriptionAssign from '../components/admin/SubscriptionAssign'

export default function AdminDashboard() {
    const [members, setMembers] = useState([])
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(true)

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

    return (
        <div className="min-h-screen bg-zinc-950 px-4 md:px-10 py-8 md:py-12">
            <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-zinc-100 tracking-tight">
                            Amizone Fitness Center
                        </h1>
                        <p className="text-zinc-500 mt-1 text-sm md:text-base">Admin dashboard</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 self-start sm:self-auto">
                        <p className="text-zinc-500 text-sm">Total members</p>
                        <p className="text-emerald-400 text-2xl font-bold">{members.length}</p>
                    </div>
                </div>

                {loading ? (
                    <p className="text-zinc-500">Loading...</p>
                ) : (
                    <>
                        <MemberForm onRegistered={loadMembers} />

                        <div>
                            <h2 className="text-zinc-100 text-lg md:text-xl font-semibold mb-4">Members</h2>
                            <MemberTable members={members} />
                        </div>

                        <PlanForm onCreated={loadPlans} />

                        <div>
                            <h2 className="text-zinc-100 text-lg md:text-xl font-semibold mb-4">Membership Plans</h2>
                            <PlanList plans={plans} />
                        </div>

                        <SubscriptionAssign members={members} plans={plans} onAssigned={loadMembers} />
                    </>
                )}
            </div>
        </div>
    )
}