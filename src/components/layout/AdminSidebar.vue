<template>
  <aside class="fixed inset-y-0 left-0 z-40 hidden w-72 border-r-2 border-ink bg-white p-5 lg:block">
    <BrandDoodleMark />
    <nav class="mt-8 space-y-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="admin-link"
        :class="{ 'admin-link-active': isActive(item) }"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
    <div class="absolute inset-x-5 bottom-5 rounded-2xl border-2 border-ink bg-paper p-4">
      <p class="text-xs font-black uppercase tracking-[0.18em] text-muted">Signed in</p>
      <p class="mt-1 truncate font-display text-2xl font-black">{{ user?.name || 'Admin' }}</p>
      <button class="mt-4 text-sm font-black underline decoration-coral decoration-4 underline-offset-4" type="button" @click="$emit('logout')">
        Log out
      </button>
    </div>
  </aside>

  <nav class="sticky top-20 z-20 flex gap-2 overflow-x-auto border-b-2 border-ink/10 bg-white px-5 py-3 lg:hidden">
    <NuxtLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="admin-mobile-link"
      :class="{ 'admin-mobile-link-active': isActive(item) }"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
type AdminSidebarItem = {
  to: string
  label: string
  exact?: boolean
}

defineProps<{
  user?: {
    name: string
  } | null
}>()

defineEmits<{
  logout: []
}>()

const route = useRoute()

const navItems: AdminSidebarItem[] = [
  { to: '/admin', label: 'Dashboard', exact: true },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/notes', label: 'Notes' },
  { to: '/admin/blog', label: 'Blog' },
  { to: '/ui-guide', label: 'UI Guide', exact: true },
]

const isActive = (item: AdminSidebarItem) => {
  if (item.exact) {
    return route.path === item.to
  }

  return route.path === item.to || route.path.startsWith(`${item.to}/`)
}
</script>

<style scoped>
.admin-link {
  border: 2px solid transparent;
  border-radius: 1rem;
  color: #17202a;
  display: flex;
  font-weight: 900;
  padding: 0.8rem 1rem;
  text-decoration: none;
}

.admin-link:hover,
.admin-link-active {
  background: #b8f3df;
  border-color: #17202a;
}

.admin-mobile-link {
  border: 2px solid #17202a;
  border-radius: 999px;
  color: #17202a;
  flex: 0 0 auto;
  font-size: 0.875rem;
  font-weight: 900;
  padding: 0.45rem 0.85rem;
  text-decoration: none;
}

.admin-mobile-link-active {
  background: #b8f3df;
}
</style>
