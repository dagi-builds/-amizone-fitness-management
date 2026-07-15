const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(path, options = {}) {
    const res = await fetch(`${API_BASE_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options,
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
        const message = data?.error || `Request failed with status ${res.status}`
        throw new Error(message)
    }
    return data
}

export function registerMember(memberData) {
    return request('/members', { method: 'POST', body: JSON.stringify(memberData) })
}
export function getMembers() {
    return request('/members')
}
export function getMemberByPhone(phone) {
    return request(`/members/${encodeURIComponent(phone)}`)
}
export function updateMember(id, data) {
    return request(`/members/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}
export function deleteMember(id) {
    return request(`/members/${id}`, { method: 'DELETE' })
}

export function getPlans() {
    return request('/plans')
}
export function createPlan(planData) {
    return request('/plans', { method: 'POST', body: JSON.stringify(planData) })
}
export function updatePlan(id, data) {
    return request(`/plans/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}
export function deletePlan(id) {
    return request(`/plans/${id}`, { method: 'DELETE' })
}

export function assignSubscription(memberId, planId) {
    return request('/subscriptions', {
        method: 'POST',
        body: JSON.stringify({ member_id: memberId, plan_id: planId }),
    })
}

export function checkInMember(phone) {
    return request('/attendance/check-in', {
        method: 'POST',
        body: JSON.stringify({ phone_number: phone }),
    })
}

export function getProducts() {
    return request('/products')
}
export function createProduct(data) {
    return request('/products', { method: 'POST', body: JSON.stringify(data) })
}
export function updateProduct(id, data) {
    return request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) })
}
export function deleteProduct(id) {
    return request(`/products/${id}`, { method: 'DELETE' })
}

export function getSales() {
    return request('/sales')
}
export function createSale(data) {
    return request('/sales', { method: 'POST', body: JSON.stringify(data) })
}
export function getSalesSummary() {
    return request('/sales/summary')
}