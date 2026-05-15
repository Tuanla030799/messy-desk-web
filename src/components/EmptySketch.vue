<template>
  <section class="rounded-[2rem] border-2 border-dashed border-ink bg-white p-8 text-center shadow-doodle">
    <div class="mx-auto mb-5 flex h-28 w-28 rotate-3 items-center justify-center rounded-[2rem] border-2 border-ink bg-mint">
      <div class="relative h-16 w-16 rounded-full border-2 border-ink bg-paper">
        <span class="absolute left-4 top-5 h-2 w-2 rounded-full bg-ink"></span>
        <span class="absolute right-4 top-5 h-2 w-2 rounded-full bg-ink"></span>
        <span class="absolute bottom-4 left-1/2 h-5 w-8 -translate-x-1/2 rounded-b-full border-b-2 border-ink"></span>
      </div>
    </div>
    <h2 class="font-display text-3xl font-black text-ink">{{ title }}</h2>
    <p class="mx-auto mt-3 max-w-xl text-muted">{{ description }}</p>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
}>()
</script>
