'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100))
    }, 20)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end justify-end bg-black p-12"
    >
      <div className="text-[20vw] md:text-[15vw] font-light leading-none tracking-tighter text-white">
        {progress}
        <span className="text-[8vw] md:text-[6vw] align-top">%</span>
      </div>
    </motion.div>
  )
}

