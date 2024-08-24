'use client'

import { useSession } from './SessionProvider'
import Auth from './Auth'
import { supabase } from '@/lib/supabaseClient'

export default function UserInfo() {
  const session = useSession()

  if (!session) {
    return <Auth />
  }

  return (
    <div className="text-center">
      <p className="mb-4">Welcome {session.user.email}</p>
      <button
        onClick={() => supabase.auth.signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Sign Out
      </button>
    </div>
  )
}