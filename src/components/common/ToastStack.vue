<template>
  <Teleport to="body">
    <div class="fixed bottom-4 right-4 z-[70] flex w-[min(92vw,360px)] flex-col gap-3">
      <article v-for="toast in toasts" :key="toast.id" class="rounded-2xl border-2 border-ink bg-white p-4 shadow-doodle">
        <div class="flex items-start justify-between gap-3">
          <div>
            <p class="font-display text-xl font-black text-ink">{{ toast.title }}</p>
            <p v-if="toast.message" class="mt-1 text-sm font-bold text-muted">{{ toast.message }}</p>
          </div>
          <button class="font-black" type="button" @click="dismiss(toast.id)">x</button>
        </div>
      </article>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts, dismiss } = useToast()
</script>
