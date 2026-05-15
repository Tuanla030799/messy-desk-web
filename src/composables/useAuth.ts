type AuthProvider = 'password' | 'google'

type AuthUser = {
  id: string
  name: string
  email: string
  role: 'admin' | 'editor'
  provider: AuthProvider
}

type StoredAuthUser = AuthUser & {
  passwordDigest?: string
}

const AUTH_USERS_KEY = 'creative_auth_users'
const AUTH_USER_KEY = 'creative_auth_user'

const demoAdmin: StoredAuthUser = {
  id: 'demo-admin',
  name: 'Admin',
  email: 'admin@example.com',
  role: 'admin',
  provider: 'password',
  passwordDigest: 'demo-password',
}

const normalizeEmail = (email: string) => email.trim().toLowerCase()

const readUsers = () => {
  if (!import.meta.client) return [demoAdmin]

  try {
    const users = JSON.parse(window.localStorage.getItem(AUTH_USERS_KEY) || '[]') as StoredAuthUser[]
    const hasDemoAdmin = users.some((item) => item.email === demoAdmin.email)

    return hasDemoAdmin ? users : [demoAdmin, ...users]
  } catch {
    return [demoAdmin]
  }
}

const writeUsers = (users: StoredAuthUser[]) => {
  if (!import.meta.client) return
  window.localStorage.setItem(AUTH_USERS_KEY, JSON.stringify(users))
}

const persistUser = (nextUser: AuthUser | null) => {
  if (!import.meta.client) return

  if (nextUser) {
    window.localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser))
    return
  }

  window.localStorage.removeItem(AUTH_USER_KEY)
}

const readPersistedUser = () => {
  if (!import.meta.client) return null

  try {
    return JSON.parse(window.localStorage.getItem(AUTH_USER_KEY) || 'null') as AuthUser | null
  } catch {
    return null
  }
}

const createSessionToken = (provider: AuthProvider) => `${provider}-${Date.now()}-${Math.random().toString(36).slice(2)}`

export const useAuth = () => {
  const token = useCookie<string | null>('creative_auth_token', {
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
  })
  const user = useState<AuthUser | null>('auth:user', () => null)

  if (import.meta.client && token.value && !user.value) {
    user.value = readPersistedUser()
  }

  const isAuthenticated = computed(() => Boolean(token.value))

  const completeAuth = (nextUser: AuthUser, provider: AuthProvider) => {
    token.value = createSessionToken(provider)
    user.value = nextUser
    persistUser(nextUser)
  }

  const login = async (payload: { email: string; password: string }) => {
    const email = normalizeEmail(payload.email)

    if (!email || !payload.password) {
      throw new Error('Email and password are required')
    }

    const storedUser = readUsers().find((item) => item.email === email && item.provider === 'password')

    if (!storedUser || storedUser.passwordDigest !== payload.password) {
      throw new Error('Email or password is incorrect')
    }

    const { passwordDigest: _passwordDigest, ...nextUser } = storedUser
    completeAuth(nextUser, 'password')
  }

  const register = async (payload: { name: string; email: string; password: string }) => {
    const email = normalizeEmail(payload.email)
    const name = payload.name.trim()

    if (!name || !email || !payload.password) {
      throw new Error('Name, email and password are required')
    }

    const users = readUsers()

    if (users.some((item) => item.email === email)) {
      throw new Error('An account already exists for this email')
    }

    const nextStoredUser: StoredAuthUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      role: 'admin',
      provider: 'password',
      passwordDigest: payload.password,
    }

    writeUsers([...users.filter((item) => item.id !== demoAdmin.id), nextStoredUser])

    const { passwordDigest: _passwordDigest, ...nextUser } = nextStoredUser
    completeAuth(nextUser, 'password')
  }

  const loginWithGoogle = async () => {
    const email = 'google.user@example.com'
    const users = readUsers()
    const storedUser =
      users.find((item) => item.email === email && item.provider === 'google') ||
      ({
        id: `google-${Date.now()}`,
        name: 'Google User',
        email,
        role: 'admin',
        provider: 'google',
      } satisfies StoredAuthUser)

    if (!users.some((item) => item.id === storedUser.id)) {
      writeUsers([...users.filter((item) => item.id !== demoAdmin.id), storedUser])
    }

    completeAuth(storedUser, 'google')
  }

  const logout = () => {
    token.value = null
    user.value = null
    persistUser(null)
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
  }
}
