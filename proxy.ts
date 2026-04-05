import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Redirect logged-in users away from auth pages
  if (user && (pathname === '/logg-inn' || pathname === '/registrer')) {
    return NextResponse.redirect(new URL('/skjema', request.url))
  }

  // Protect app routes (utforsk and info are public)
  if (!user && (pathname.startsWith('/skjema') || pathname.startsWith('/profil') || pathname.startsWith('/brygger'))) {
    return NextResponse.redirect(new URL('/logg-inn', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/logg-inn', '/registrer', '/skjema/:path*', '/profil/:path*', '/brygger/:path*'],
}
