'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '../../contexts/AuthContext'
import { useToast } from '../../contexts/ToastContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const { login, loading, error, isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectPath = searchParams.get('from') || '/'
  const [isPageLoading, setIsPageLoading] = useState(true)

  useEffect(() => {
    if (!loading) setIsPageLoading(false)
  }, [loading])

  useEffect(() => {
    if (!isPageLoading && isAuthenticated) {
      router.push(redirectPath)
    }
  }, [isAuthenticated, router, redirectPath, isPageLoading])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')

    try {
      const result = await login(email, password)
      if (result?.success) {
        showToast('Successfully logged in!', 'success')
      } else if (result?.error) {
        setLoginError(result.error)
        showToast(result.error, 'error')
      }
    } catch {
      const msg = 'Login failed. Please check your credentials.'
      setLoginError(msg)
      showToast(msg, 'error')
    }
  }

  if (isPageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {(error || loginError) && (
              <div className="text-red-600 text-sm mt-2">
                {error || loginError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <div className="mt-6 text-sm text-center">
            <p className="font-medium text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-orange-600 hover:text-orange-500">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
