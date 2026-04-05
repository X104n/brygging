'use client'

import { useActionState } from 'react'
import { registrer } from '@/app/actions/auth'
import Link from 'next/link'
import { FlaskConical, ArrowLeft } from 'lucide-react'

export default function RegistrerPage() {
  const [state, action, pending] = useActionState(registrer, null)

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col">

      {/* Header */}
      <header className="bg-amber-900 text-white">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-base tracking-tight hover:opacity-90 transition-opacity"
          >
            <FlaskConical className="w-5 h-5 text-amber-300" />
            Bryggeskjema
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-amber-200 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Tilbake
          </Link>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
            <div className="bg-amber-800 px-6 py-5">
              <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center mb-3">
                <FlaskConical className="w-5 h-5 text-amber-300" />
              </div>
              <h1 className="text-xl font-bold text-white">Registrer deg</h1>
              <p className="text-amber-200/70 text-sm mt-0.5">Gratis konto — ingen kredittkort</p>
            </div>

            <form action={action} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5" htmlFor="email">
                  E-post
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="deg@eksempel.no"
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm text-zinc-900 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-1.5" htmlFor="password">
                  Passord
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Minst 8 tegn"
                  className="w-full border border-zinc-300 rounded-lg px-3 py-2.5 text-sm text-zinc-900 bg-zinc-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 transition-colors"
                />
              </div>

              {state?.error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm text-red-700">
                  {state.error}
                </div>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl py-2.5 mt-1 transition-colors disabled:opacity-50"
              >
                {pending ? 'Registrerer…' : 'Opprett konto'}
              </button>
            </form>
          </div>

          <p className="text-sm text-center text-zinc-500 mt-5">
            Har du allerede konto?{' '}
            <Link href="/logg-inn" className="text-amber-700 hover:text-amber-900 font-semibold hover:underline transition-colors">
              Logg inn
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
