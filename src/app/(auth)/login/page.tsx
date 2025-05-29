"use client"
import { useState } from "react"
import { login, signup } from './actions'

export default function LoginPage() {

  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
    action: 'login' | 'signup'
  ) {
    e.preventDefault()
    setError(null)
    let formData: FormData
    if ('currentTarget' in e && e.currentTarget instanceof HTMLFormElement) {
      formData = new FormData(e.currentTarget)
    } else {
      const form = e.currentTarget.closest('form');
      if (!form) return 
      formData = new FormData(form)
    }
    const result = action === 'login' ? await login(formData) : await signup(formData);
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <form onSubmit={(e) => handleSubmit(e, 'login')}>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button type="submit">Log in</button>
      <button type="button" onClick={(e) => handleSubmit(e, 'signup')}>Sign up</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  )
}