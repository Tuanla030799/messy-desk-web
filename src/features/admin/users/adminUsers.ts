export type AdminUserListItem = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor'
  status: 'active' | 'paused'
  provider: string
  lastSeen: string
}

type CurrentAdminUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor'
}

export const getAdminUsers = (currentUser?: CurrentAdminUser | null): AdminUserListItem[] => [
  {
    id: currentUser?.id || 'demo-admin',
    name: currentUser?.name || 'Demo Admin',
    email: currentUser?.email || 'admin@example.com',
    role: currentUser?.role || 'admin',
    status: 'active',
    provider: 'password',
    lastSeen: 'Today',
  },
  { id: 'content-editor', name: 'Content Editor', email: 'editor@example.com', role: 'editor', status: 'active', provider: 'google', lastSeen: 'Yesterday' },
  { id: 'draft-reviewer', name: 'Draft Reviewer', email: 'reviewer@example.com', role: 'editor', status: 'paused', provider: 'password', lastSeen: '12 May 2026' },
]
