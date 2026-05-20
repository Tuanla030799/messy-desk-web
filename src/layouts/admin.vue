<template>
  <div class="min-h-screen bg-paper text-ink">
    <AdminSidebar :user="user" @logout="handleLogout" />

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
import AdminSidebar from '@/components/layout/AdminSidebar.vue'

defineOptions({
  name: 'AdminLayout',
})

const router = useRouter()
const { user, logout } = useAuth()

const handleLogout = async () => {
  logout()
  await router.push('/login')
}
</script>
