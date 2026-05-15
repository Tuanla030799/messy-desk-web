<template>
  <AuthPage mode="register" />
</template>

<script setup lang="ts">
import AuthPage from '@/features/auth/AuthPage.vue'

definePageMeta({
  middleware: 'guest',
})
</script>
