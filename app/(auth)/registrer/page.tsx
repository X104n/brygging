'use client'

import { useActionState } from 'react'
import { registrer } from '@/app/actions/auth'
import Link from 'next/link'

export default function RegistrerPage() {
  const [state, action, pending] = useActionState(registrer, null)

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-bold text-amber-900 mb-6 text-center">
          Registrer deg
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
              minLength={8}
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
            {pending ? 'Registrerer…' : 'Registrer deg'}
          </button>
        </form>
        <p className="text-sm text-center text-zinc-500 mt-4">
          Har du allerede bruker?{' '}
          <Link href="/logg-inn" className="text-amber-700 hover:underline font-medium">
            Logg inn
          </Link>
        </p>
      </div>
    </div>
  )
}
