<template>
  <Teleport to="body">
    <div v-if="isLoading" class="fixed inset-x-0 top-0 z-[60]">
      <div class="h-1 animate-pulse bg-coral"></div>
      <div class="mx-auto mt-3 flex w-max items-center gap-3 rounded-full border-2 border-ink bg-white px-4 py-2 font-black shadow-doodle">
        <FeedbackDoodleLoader compact />
        {{ label }}
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
const { isLoading, label } = useGlobalLoading()
</script>
