'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Loading } from '@/components/loading'
import { Navigation } from '@/components/navigation'
import { PageTransition } from '@/components/page.transition'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, setIsLoading } = useStore()

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [setIsLoading])

  return (
    <html lang="en" className="antialiased">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Formless Studio - Digital Experiences" />
        {/* Add this line for audio autoplay */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-black">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Navigation />
            <PageTransition>
              {children}
            </PageTransition>
          </>
        )}
      </body>
    </html>
  )
}

