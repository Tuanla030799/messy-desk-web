<template>
  <div class="rounded-[1.5rem] border-2 border-dashed border-ink bg-white p-5 text-center shadow-soft-doodle">
    <label class="block cursor-pointer">
      <input class="sr-only" type="file" :accept="accept" :multiple="multiple" @change="handleChange" />
      <span class="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-sky font-black">+</span>
      <span class="block font-display text-2xl font-black text-ink">{{ label }}</span>
      <span class="mt-1 block text-sm font-bold text-muted">{{ hint }}</span>
    </label>

    <div v-if="uploading.length" class="mt-4 space-y-2 text-left">
      <div v-for="file in uploading" :key="file.name" class="flex items-center gap-3 rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-bold">
        <UiLoadingIcon size="sm" />
        <span class="min-w-0 flex-1 truncate">{{ file.name }}</span>
        <span>Uploading</span>
      </div>
    </div>

    <div v-if="model.length" class="mt-4 space-y-2 text-left">
      <div v-for="file in model" :key="file.fileId" class="flex items-center justify-between gap-3 rounded-xl border-2 border-ink bg-paper px-3 py-2 text-sm font-bold">
        <a class="min-w-0 flex-1 truncate underline decoration-coral decoration-2 underline-offset-4" :href="file.url" target="_blank" rel="noreferrer">
          {{ file.name || file.path }}
        </a>
        <button type="button" class="rounded-full border-2 border-ink bg-white px-2 font-black" aria-label="Remove uploaded file" @click="removeFile(file.fileId)">
          x
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadedFile } from '@/types/upload'

const props = withDefaults(
  defineProps<{
    label?: string
    hint?: string
    multiple?: boolean
    accept?: string
    endpoint?: string
    uploader?: (file: File) => Promise<UploadedFile>
  }>(),
  {
    label: 'Upload files',
    hint: 'Files are uploaded immediately after selection',
    multiple: true,
  },
)

const emit = defineEmits<{
  uploaded: [file: UploadedFile]
  remove: [file: UploadedFile]
}>()

const model = defineModel<UploadedFile[]>({ default: () => [] })
const uploading = ref<File[]>([])

const uploadFile = async (file: File) => {
  if (props.uploader) {
    return props.uploader(file)
  }

  if (!props.endpoint) {
    return mockUpload(file)
  }

  const formData = new FormData()
  formData.append('file', file)

  return await $fetch<UploadedFile>(props.endpoint, {
    method: 'POST',
    body: formData,
  })
}

const handleChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''

  for (const file of files) {
    uploading.value.push(file)

    try {
      const uploaded = await uploadFile(file)
      model.value = props.multiple ? [...model.value, uploaded] : [uploaded]
      emit('uploaded', uploaded)
    } finally {
      uploading.value = uploading.value.filter((item) => item !== file)
    }
  }
}

const removeFile = (fileId: string) => {
  const file = model.value.find((item) => item.fileId === fileId)
  model.value = model.value.filter((item) => item.fileId !== fileId)

  if (file) {
    emit('remove', file)
  }
}

const mockUpload = async (file: File): Promise<UploadedFile> => {
  await new Promise((resolve) => window.setTimeout(resolve, 450))

  return {
    fileId: crypto.randomUUID(),
    url: URL.createObjectURL(file),
    path: `/uploads/${file.name}`,
    name: file.name,
  }
}
</script>
