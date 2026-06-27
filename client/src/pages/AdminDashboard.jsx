import { useEffect, useState } from 'react'
import { getMembers } from '../lib/api'
import MemberForm from '../components/admin/MemberForm'
import MemberTable from '../components/admin/MemberTable'

export default function AdminDashboard() {
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true)

    async function loadMembers() {
        setLoading(true)
        try {
            const data = await getMembers()
            setMembers(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadMembers()
    }, [])

    return (
        <div className="min-h-screen bg-zinc-950 px-10 py-12">
            <div className="max-w-6xl mx-auto space-y-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-zinc-100 tracking-tight">
                            Amizone Fitness Center
                        </h1>
                        <p className="text-zinc-500 mt-1">Admin dashboard</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4">
                        <p className="text-zinc-500 text-sm">Total members</p>
                        <p className="text-emerald-400 text-2xl font-bold">{members.length}</p>
                    </div>
                </div>

                <MemberForm onRegistered={loadMembers} />

                <div>
                    <h2 className="text-zinc-100 text-xl font-semibold mb-4">Members</h2>
                    {loading ? (
                        <p className="text-zinc-500">Loading...</p>
                    ) : (
                        <MemberTable members={members} />
                    )}
                </div>
            </div>
        </div>
    )
}