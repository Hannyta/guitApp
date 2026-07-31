export async function detectCountryCode() {
  try {
    const response = await fetch('https://ipapi.co/json/')
    if (!response.ok) return null
    const data = await response.json()
    return data.country_code ?? null
  } catch {
    return null
  }
}
