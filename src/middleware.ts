import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Si non connecté, rediriger vers login
    if (!token) {
      if (path.startsWith('/junior') || path.startsWith('/startup')) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
    }

    // Vérifier les rôles
    if (token) {
      const role = token.role as string
      if (path.startsWith('/junior') && role !== 'JUNIOR') {
        return NextResponse.redirect(new URL('/', req.url))
      }
      if (path.startsWith('/startup') && role !== 'STARTUP') {
        return NextResponse.redirect(new URL('/', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => true,
    },
  }
)

export const config = {
  matcher: ['/junior/:path*', '/startup/:path*'],
}
