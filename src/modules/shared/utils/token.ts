export const getToken = () => {
  const authInfo = localStorage.getItem('sb-flnfpmjlnofgwbgfuiar-auth-token')
  const access_token = JSON.parse(authInfo)?.access_token
  return access_token
}

export const setTokens = (access_token: string, refresh_token?: string | null) => {
  localStorage.setItem('access_token', access_token)
  if (refresh_token) {
    localStorage.setItem('refresh_token', refresh_token)
  }
}

export const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}

export const getTokens = () => {
  return {
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null,
  }
}
