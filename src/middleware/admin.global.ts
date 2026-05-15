export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/admin')) {
    return
  }

  const { isAuthenticated } = useAuth()

  if (isAuthenticated.value) {
    return
  }

  return navigateTo({
    path: '/login',
    query: {
      redirect: to.fullPath,
    },
  })
})
