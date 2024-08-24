'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Auth() {
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) throw error
    } catch (error: any) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="flex justify-center items-center min-h-screen">
      <button
        onClick={handleGoogleLogin}
        className="px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150"
        disabled={loading}
      >
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
        <span>{loading ? 'Loading...' : 'Login with Google'}</span>
      </button>
    </div>
  )
}