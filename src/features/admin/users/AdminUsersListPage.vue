<template>
  <LayoutPageSection class="space-y-6" :spacious="false">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="text-xs font-black uppercase tracking-[0.18em] text-coral">People</p>
        <h2 class="font-display text-4xl font-black">Admin users</h2>
        <p class="mt-2 max-w-2xl font-bold text-muted">Quan ly tai khoan demo, vai tro va trang thai truy cap khu vuc admin.</p>
      </div>
      <UiButton :to="`${basePath}/create`" size="sm">Create user</UiButton>
    </div>

    <div class="grid gap-5 lg:grid-cols-3">
      <UiCard v-for="metric in metrics" :key="metric.label">
        <p class="text-xs font-black uppercase tracking-[0.18em] text-muted">{{ metric.label }}</p>
        <p class="mt-3 font-display text-4xl font-black">{{ metric.value }}</p>
        <p class="mt-2 text-sm font-bold text-muted">{{ metric.helper }}</p>
      </UiCard>
    </div>

    <UiCard>
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 class="font-display text-3xl font-black">User list</h3>
            <p class="mt-1 text-sm font-bold text-muted">Local demo accounts and editorial seats.</p>
          </div>
          <UiInput v-model="search" class="w-full sm:w-72" placeholder="Search users..." />
        </div>
      </template>

      <UiTable :columns="columns" :rows="rows">
        <template #cell-name="{ row }">
          <NuxtLink class="sketch-link" :to="`${basePath}/${row.id}`">
            {{ row.name }}
          </NuxtLink>
        </template>

        <template #cell-status="{ row }">
          <UiBadge :tone="row.status === 'active' ? 'success' : 'warning'">{{ row.status }}</UiBadge>
        </template>

        <template #cell-actions="{ row }">
          <div class="flex flex-wrap gap-2">
            <UiButton :to="`${basePath}/${row.id}`" size="sm" variant="ghost">Detail</UiButton>
            <UiButton :to="`${basePath}/edit/${row.id}`" size="sm" variant="secondary">Edit</UiButton>
          </div>
        </template>
      </UiTable>
    </UiCard>
  </LayoutPageSection>
</template>

<script setup lang="ts">
import { getAdminUsers } from './adminUsers'

const { user } = useAuth()
const basePath = '/admin/users'
const search = ref('')
const users = computed(() => getAdminUsers(user.value))

const metrics = computed(() => [
  { label: 'Total users', value: users.value.length, helper: 'Demo admin seats' },
  { label: 'Active', value: users.value.filter((item) => item.status === 'active').length, helper: 'Can access admin' },
  { label: 'Roles', value: '2', helper: 'Admin and editor' },
])

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'lastSeen', label: 'Last seen' },
  { key: 'actions', label: 'Actions' },
]

const filteredUsers = computed(() => {
  const keyword = search.value.trim().toLowerCase()

  if (!keyword) {
    return users.value
  }

  return users.value.filter((item) =>
    [item.name, item.email, item.role, item.status, item.provider].some((value) => value.toLowerCase().includes(keyword)),
  )
})

const rows = computed(() =>
  filteredUsers.value.map((item) => ({
    id: item.id,
    name: item.name,
    email: item.email,
    role: item.role,
    status: item.status,
    lastSeen: item.lastSeen,
    actions: '',
  })),
)

useSeoMeta({
  title: 'Admin Users',
  description: 'Manage admin users and roles.',
})
</script>
