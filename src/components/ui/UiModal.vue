<template>
  <Teleport to="body">
    <div v-if="model" class="fixed inset-0 z-50 grid place-items-center bg-ink/40 p-4" role="dialog" aria-modal="true" @click.self="model = false">
      <section class="w-full max-w-lg rounded-[1.5rem] border-2 border-ink bg-white p-5 shadow-doodle">
        <header class="flex items-start justify-between gap-4 border-b-2 border-dashed border-ink/20 pb-4">
          <div>
            <p v-if="eyebrow" class="text-xs font-black uppercase tracking-[0.18em] text-coral">{{ eyebrow }}</p>
            <h2 class="font-display text-3xl font-black text-ink">{{ title }}</h2>
          </div>
          <button class="rounded-full border-2 border-ink bg-paper px-3 py-1 font-black" type="button" aria-label="Close modal" @click="model = false">x</button>
        </header>
        <div class="py-5">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="flex justify-end gap-3 border-t-2 border-dashed border-ink/20 pt-4">
          <slot name="footer" />
        </footer>
      </section>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  eyebrow?: string
}>()

const model = defineModel<boolean>({ default: false })
</script>
