<template>
  <main class="min-h-screen bg-paper text-ink">
    <header class="border-b border-ink/10 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <BrandDoodleMark />
        <NuxtLink to="/blog" class="hidden rounded-full px-4 py-2 text-sm font-black text-muted transition hover:bg-mint hover:text-ink sm:inline-flex">
          Explore
        </NuxtLink>
      </div>
    </header>

    <section class="relative isolate overflow-visible">
      <div class="absolute inset-0 -z-10 error-grid"></div>

      <div class="mx-auto flex min-h-[calc(100vh-74px)] max-w-4xl flex-col items-center justify-center px-5 pb-12 pt-6 text-center">
        <p class="rounded-full border-2 border-ink bg-white px-4 py-1.5 text-xs font-black uppercase tracking-[0.16em] shadow-soft-doodle">
          {{ statusLabel }}
        </p>

        <h1 class="mt-4 font-display text-4xl font-black leading-none text-ink sm:text-6xl lg:text-7xl">
          {{ heading }}
        </h1>

        <div class="my-5 w-full max-w-[300px] sm:max-w-[340px] lg:max-w-[360px]">
          <svg class="h-auto w-full drop-shadow-[4px_6px_0_rgba(23,32,42,0.18)]" viewBox="0 0 440 300" role="img" :aria-label="illustrationLabel">
            <path d="M44 248c29-45 82-68 157-70 78-3 145 17 202 60" fill="none" stroke="#17202a" stroke-linecap="round" stroke-width="8" opacity=".12" />
            <path d="M126 210c-8-34 3-67 27-88 24-20 59-29 94-20 36 9 63 33 74 66 11 34 2 70-22 94-26 24-66 34-104 23-35-10-61-38-69-75Z" fill="#fff" stroke="#17202a" stroke-width="6" />
            <path d="M166 118 142 67l55 28" fill="#bde0fe" stroke="#17202a" stroke-linejoin="round" stroke-width="6" />
            <path d="M265 99 323 73l-24 58" fill="#f9c74f" stroke="#17202a" stroke-linejoin="round" stroke-width="6" />
            <path d="M189 95c15-16 46-18 69-4" fill="none" stroke="#17202a" stroke-linecap="round" stroke-width="6" />
            <circle cx="185" cy="165" r="11" fill="#17202a" />
            <circle cx="265" cy="165" r="11" fill="#17202a" />
            <path d="M221 188c6 8 17 8 23 0" fill="none" stroke="#17202a" stroke-linecap="round" stroke-width="6" />
            <path d="M139 178c-29-8-54-8-75 0M139 198c-31 3-56 13-75 30M308 178c28-8 53-8 75 0M307 198c31 3 56 13 75 30" fill="none" stroke="#17202a" stroke-linecap="round" stroke-width="5" />
            <path d="M127 234c-39-7-65-27-72-59-5-22 5-41 24-45 16-4 30 4 35 19 5 16-1 31-16 39" fill="none" stroke="#ff6f91" stroke-linecap="round" stroke-width="8" />
            <path d="M286 101c15 6 28 18 38 34" fill="none" stroke="#17202a" stroke-linecap="round" stroke-width="5" opacity=".18" />
            <rect x="83" y="44" width="44" height="44" rx="13" fill="#c8b6ff" stroke="#17202a" stroke-width="5" transform="rotate(-10 105 66)" />
            <path d="M99 66h13M105 59v13" stroke="#17202a" stroke-linecap="round" stroke-width="5" />
            <circle cx="352" cy="56" r="23" fill="#b8f3df" stroke="#17202a" stroke-width="5" />
            <path d="M344 56h16" stroke="#17202a" stroke-linecap="round" stroke-width="5" />
          </svg>
        </div>

        <NuxtLink to="/" class="sketch-button mb-2 inline-flex min-w-36 px-5 py-2 text-sm" @click="handleHome">
          Back Home
          <span aria-hidden="true" class="ml-2">→</span>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const statusCode = computed(() => props.error?.statusCode || 404)
const isMissingPage = computed(() => statusCode.value === 404)
const statusLabel = computed(() => `${statusCode.value} Error`)
const heading = computed(() => (isMissingPage.value ? 'Missing Page' : 'Something spilled'))
const illustrationLabel = computed(() => (isMissingPage.value ? 'A doodle cat looking for a missing page' : 'A doodle cat beside a messy sketch'))

useHead({
  title: isMissingPage.value ? 'Missing Page' : 'Something went wrong',
})

const handleHome = () => {
  clearError({ redirect: '/' })
}
</script>

<style scoped>
.error-grid {
  background:
    linear-gradient(rgba(23, 32, 42, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(23, 32, 42, 0.055) 1px, transparent 1px),
    radial-gradient(circle at 20% 18%, rgba(249, 199, 79, 0.28), transparent 28%),
    radial-gradient(circle at 82% 20%, rgba(184, 243, 223, 0.34), transparent 28%),
    #fffaf0;
  background-size: 32px 32px, 32px 32px, auto, auto, auto;
}
</style>
