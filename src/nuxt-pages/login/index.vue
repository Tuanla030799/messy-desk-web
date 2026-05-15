<template>
  <main class="mx-auto grid min-h-[calc(100vh-82px)] max-w-7xl items-center gap-8 px-5 py-10 lg:grid-cols-[0.9fr_1.1fr]">
    <section>
      <p class="mb-5 inline-flex rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] shadow-soft-doodle">
        Welcome back
      </p>
      <h1 class="font-display text-5xl font-black leading-none text-ink sm:text-7xl">
        Sign in to the creative console.
      </h1>
      <p class="mt-6 max-w-xl text-lg leading-8 text-muted">
        Admin routes are protected by a lightweight auth middleware. This demo stores a
        session token in a cookie so refreshes and direct admin links still work.
      </p>
    </section>

    <section class="doodle-card bg-white p-6 sm:p-8">
      <form class="space-y-5" @submit.prevent="handleSubmit">
        <UiInput v-model="form.values.email" label="Email" type="email" placeholder="admin@example.com" :error="form.errors.value.email" />
        <UiInput v-model="form.values.password" label="Password" type="password" placeholder="demo-password" :error="form.errors.value.password" />

        <div class="flex flex-wrap items-center justify-between gap-3">
          <UiButton type="submit" :loading="form.isSubmitting.value">
            Login
          </UiButton>
          <NuxtLink class="sketch-link" to="/">Back home</NuxtLink>
        </div>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { getStringQueryParam } from '@/lib/queryParams'

definePageMeta({
  middleware: 'guest',
})

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const toast = useToast()

const form = useForm(
  {
    email: 'admin@example.com',
    password: 'demo-password',
  },
  z.object({
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password needs at least 6 characters'),
  }),
)

const redirectTo = computed(() => getStringQueryParam(route.query.redirect, '/admin'))

const handleSubmit = () => {
  form.submit(async (values) => {
    await auth.login(values)
    toast.success('Signed in', 'Welcome to the admin console.')
    await router.push(redirectTo.value)
  })
}

useSeoMeta({
  title: 'Login',
  description: 'Sign in to Creative Playground admin.',
})
</script>
