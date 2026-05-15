<template>
  <div class="min-h-screen bg-paper text-ink">
    <aside class="fixed inset-y-0 left-0 z-40 hidden w-72 border-r-2 border-ink bg-white p-5 lg:block">
      <DoodleMark />
      <nav class="mt-8 space-y-2">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="admin-link">
          {{ item.label }}
        </NuxtLink>
      </nav>
      <div class="absolute inset-x-5 bottom-5 rounded-2xl border-2 border-ink bg-paper p-4">
        <p class="text-xs font-black uppercase tracking-[0.18em] text-muted">Signed in</p>
        <p class="mt-1 truncate font-display text-2xl font-black">{{ user?.name || 'Admin' }}</p>
        <button class="mt-4 text-sm font-black underline decoration-coral decoration-4 underline-offset-4" type="button" @click="handleLogout">
          Log out
        </button>
      </div>
    </aside>

    <div class="lg:pl-72">
      <header class="sticky top-0 z-30 border-b-2 border-ink/10 bg-paper/90 backdrop-blur">
        <div class="flex min-h-20 items-center justify-between gap-4 px-5">
          <div>
            <p class="text-xs font-black uppercase tracking-[0.2em] text-muted">Admin</p>
            <h1 class="font-display text-3xl font-black">Creative console</h1>
          </div>
          <div class="flex items-center gap-3">
            <UiButton to="/" variant="secondary" size="sm">View site</UiButton>
            <UiButton variant="ghost" size="sm" @click="handleLogout">Logout</UiButton>
          </div>
        </div>
      </header>

      <main class="px-5 py-8">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'AdminLayout',
})

const router = useRouter()
const { user, logout } = useAuth()

const navItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/ui-guide', label: 'UI Guide' },
  { to: '/blog', label: 'Posts' },
]

const handleLogout = async () => {
  logout()
  await router.push('/login')
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
.admin-link.router-link-active {
  background: #b8f3df;
  border-color: #17202a;
}
</style>
