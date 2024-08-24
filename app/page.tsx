import { Suspense } from 'react'
import SessionProvider from '@/components/SessionProvider'
import UserInfo from '@/components/UserInfo'

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1 className="text-3xl font-bold mb-8 text-center">Super Lifelog</h1>
        <SessionProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <UserInfo />
          </Suspense>
        </SessionProvider>
      </div>
    </div>
  )
}