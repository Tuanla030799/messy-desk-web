<template>
  <LayoutPageMain>
    <LayoutPageSection :spacious="false" class="grid min-h-[calc(100vh-82px)] items-center gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr]">
      <section>
        <p class="mb-5 inline-flex rounded-full border-2 border-ink bg-white px-4 py-2 text-sm font-black uppercase tracking-[0.16em] shadow-soft-doodle">
          {{ eyebrow }}
        </p>
        <h1 class="font-display text-5xl font-black leading-none text-ink sm:text-7xl">
          {{ title }}
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-8 text-muted">
          {{ description }}
        </p>
      </section>

      <section class="doodle-card bg-white p-6 sm:p-8">
        <form class="space-y-5" @submit.prevent="handleSubmit">
          <UiInput v-if="isRegisterMode" v-model="form.values.name" label="Name" placeholder="Your name" :error="form.errors.value.name" />
          <UiInput v-model="form.values.email" label="Email" type="email" placeholder="admin@example.com" :error="form.errors.value.email" />
          <UiInput v-model="form.values.password" label="Password" type="password" placeholder="demo-password" :error="form.errors.value.password" />

          <div v-if="formError" class="rounded-2xl border-2 border-coral bg-coral/10 px-4 py-3 text-sm font-black text-ink">
            {{ formError }}
          </div>

          <div class="flex flex-wrap items-center justify-between gap-3">
            <UiButton type="submit" :loading="form.isSubmitting.value">
              {{ submitLabel }}
            </UiButton>
            <NuxtLink class="sketch-link" :to="alternatePath">{{ alternateLabel }}</NuxtLink>
          </div>
        </form>

        <div class="my-6 flex items-center gap-3">
          <span class="h-0.5 flex-1 bg-ink/20"></span>
          <span class="text-xs font-black uppercase tracking-[0.18em] text-muted">or</span>
          <span class="h-0.5 flex-1 bg-ink/20"></span>
        </div>

        <UiButton class="w-full" variant="secondary" :loading="isGoogleLoading" @click="handleGoogleLogin">
          Continue with Google
        </UiButton>
      </section>
    </LayoutPageSection>
  </LayoutPageMain>
</template>

<script setup lang="ts">
import { z } from 'zod'
import { getStringQueryParam } from '@/lib/queryParams'

const props = withDefaults(
  defineProps<{
    mode?: 'login' | 'register'
  }>(),
  {
    mode: 'login',
  },
)

const route = useRoute()
const router = useRouter()
const auth = useAuth()
const toast = useToast()
const isGoogleLoading = ref(false)
const formError = ref('')

const isRegisterMode = computed(() => props.mode === 'register')
const redirectTo = computed(() => getStringQueryParam(route.query.redirect, '/admin'))

const eyebrow = computed(() => (isRegisterMode.value ? 'Start here' : 'Welcome back'))
const title = computed(() => (isRegisterMode.value ? 'Create your creative console account.' : 'Sign in to the creative console.'))
const description = computed(() =>
  isRegisterMode.value
    ? 'Create a local demo account for the protected admin area, then jump straight into the console.'
    : 'Admin routes are protected by auth middleware. This demo keeps a local session token so refreshes and direct admin links still work.',
)
const submitLabel = computed(() => (isRegisterMode.value ? 'Create account' : 'Login'))
const alternatePath = computed(() => (isRegisterMode.value ? '/login' : '/register'))
const alternateLabel = computed(() => (isRegisterMode.value ? 'I already have an account' : 'Create account'))

const form = useForm(
  {
    name: '',
    email: isRegisterMode.value ? '' : 'admin@example.com',
    password: isRegisterMode.value ? '' : 'demo-password',
  },
  z.object({
    name: z.string(),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(6, 'Password needs at least 6 characters'),
  }).superRefine((values, context) => {
    if (isRegisterMode.value && !values.name.trim()) {
      context.addIssue({
        code: 'custom',
        path: ['name'],
        message: 'Name is required',
      })
    }
  }),
)

const finishAuth = async (message: string) => {
  toast.success(message, 'Welcome to the admin console.')
  await router.push(redirectTo.value)
}

const handleSubmit = () => {
  formError.value = ''

  form.submit(async (values) => {
    try {
      if (isRegisterMode.value) {
        await auth.register(values)
        await finishAuth('Account created')
        return
      }

      await auth.login(values)
      await finishAuth('Signed in')
    } catch (error) {
      formError.value = error instanceof Error ? error.message : 'Unable to authenticate'
    }
  })
}

const handleGoogleLogin = async () => {
  formError.value = ''
  isGoogleLoading.value = true

  try {
    await auth.loginWithGoogle()
    await finishAuth('Signed in with Google')
  } catch (error) {
    formError.value = error instanceof Error ? error.message : 'Unable to sign in with Google'
  } finally {
    isGoogleLoading.value = false
  }
}

useSeoMeta({
  title: () => (isRegisterMode.value ? 'Register' : 'Login'),
  description: () => (isRegisterMode.value ? 'Create a Creative Playground admin account.' : 'Sign in to Creative Playground admin.'),
})
</script>
