'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export function Navigation() {
  const pathname = usePathname()

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 w-full z-40 p-6 text-white mix-blend-difference"
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link href="/" className="text-3xl text-purple-700 font-extrabold ">
          VROOM
        </Link>
        <div className="space-x-8">
          <Link href="/about" className={`text-lg ${pathname === '/about' ? 'opacity-100' : 'opacity-50'}`}>
            About
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}

