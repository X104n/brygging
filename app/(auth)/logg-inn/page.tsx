'use client'

import { useActionState } from 'react'
import { loggInn } from '@/app/actions/auth'
import Link from 'next/link'

export default function LoggInnPage() {
  const [state, action, pending] = useActionState(loggInn, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-6 text-center">
          Logg inn
        </h1>
        <form action={action} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="email">
              E-post
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1" htmlFor="password">
              Passord
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
          {state?.error && (
            <p className="text-sm text-red-600">{state.error}</p>
          )}
          <button
            type="submit"
            disabled={pending}
            className="bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-lg py-2 mt-2 transition-colors disabled:opacity-50"
          >
            {pending ? 'Logger inn…' : 'Logg inn'}
          </button>
        </form>
        <p className="text-sm text-center text-zinc-500 mt-4">
          Ikke bruker?{' '}
          <Link href="/registrer" className="text-amber-700 hover:underline font-medium">
            Registrer deg
          </Link>
        </p>
      </div>
    </div>
  )
}
