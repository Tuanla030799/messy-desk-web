<template>
  <div class="space-y-4">
    <CommonFileUpload
      v-model="model"
      accept="image/*"
      :endpoint="endpoint"
      :hint="hint"
      :label="label"
      :multiple="multiple"
      :uploader="uploader"
    />

    <div v-if="model.length" class="grid grid-cols-3 gap-3 sm:grid-cols-4">
      <button
        v-for="image in model"
        :key="image.fileId"
        type="button"
        class="overflow-hidden rounded-2xl border-2 border-ink bg-white shadow-soft-doodle"
        @click="previewImage = image"
      >
        <img :src="image.url" :alt="image.name || image.path" class="aspect-square w-full object-cover" />
      </button>
    </div>

    <UiModal v-model="previewOpen" :title="previewImage?.name || 'Image preview'">
      <img v-if="previewImage" :src="previewImage.url" :alt="previewImage.name || previewImage.path" class="max-h-[70vh] w-full rounded-2xl border-2 border-ink object-contain" />
      <p v-if="previewImage" class="mt-3 text-sm font-bold text-muted">{{ previewImage.path }}</p>
    </UiModal>
  </div>
</template>

<script setup lang="ts">
import type { UploadedFile } from '@/types/upload'

withDefaults(
  defineProps<{
    label?: string
    hint?: string
    multiple?: boolean
    endpoint?: string
    uploader?: (file: File) => Promise<UploadedFile>
  }>(),
  {
    label: 'Upload images',
    hint: 'Images are uploaded and previewed immediately',
    multiple: true,
  },
)

const model = defineModel<UploadedFile[]>({ default: () => [] })
const previewImage = ref<UploadedFile>()
const previewOpen = computed({
  get: () => Boolean(previewImage.value),
  set: (value) => {
    if (!value) {
      previewImage.value = undefined
    }
  },
})
</script>
