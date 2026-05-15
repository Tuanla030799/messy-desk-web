type AuthUser = {
  name: string
  email: string
  role: 'admin' | 'editor'
}

export const useAuth = () => {
  const token = useCookie<string | null>('creative_auth_token', {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })
  const user = useState<AuthUser | null>('auth:user', () => null)

  const isAuthenticated = computed(() => Boolean(token.value))

  const login = async (payload: { email: string; password: string }) => {
    if (!payload.email || !payload.password) {
      throw new Error('Email and password are required')
    }

    token.value = `demo-${Date.now()}`
    user.value = {
      name: payload.email.split('@')[0] || 'Admin',
      email: payload.email,
      role: 'admin',
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }
}
