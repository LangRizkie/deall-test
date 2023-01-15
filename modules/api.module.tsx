const baseAPI = process.env.API_URL || 'https://localhost:3000'

const getData = async (route: RequestInfo | URL, init?: RequestInit) => {
  const response = await fetch(baseAPI + route, init)
  return response.json()
}

export { getData }
