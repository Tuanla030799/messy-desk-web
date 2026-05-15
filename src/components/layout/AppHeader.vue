<template>
  <header class="sticky top-0 z-30 border-b-2 border-ink/10 bg-paper/86 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4">
      <BrandDoodleMark />

      <nav class="hidden items-center gap-2 rounded-full border-2 border-ink bg-white px-2 py-2 shadow-doodle lg:flex">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="nav-pill">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <NuxtLink class="sketch-button hidden sm:inline-flex" :to="isAuthenticated ? '/admin' : '/login'">
        {{ isAuthenticated ? 'Admin' : 'Login' }}
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const navItems = [
  { to: '/', label: 'Desk' },
  { to: '/blog', label: 'Blog' },
  { to: '/notes', label: 'Notes' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/playground', label: 'Playground' },
  { to: '/ui-guide', label: 'UI' },
]

const { isAuthenticated } = useAuth()
</script>
