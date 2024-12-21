'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ContactForm from '@/components/contact-form'

export default function Home() {
  const [showForm, setShowForm] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)

  useEffect(() => {
    const audio = new Audio('/audio1.mp3')
    audio.loop = true

    const playAudio = () => {
      audio.play().then(() => {
        setAudioPlaying(true)
      }).catch((error) => {
        console.error('Audio playback failed:', error)
      })
    }

    // Attempt to play audio on component mount
    playAudio()

    // Add click event listener to the document to enable audio on user interaction
    const handleClick = () => {
      if (!audioPlaying) {
        playAudio()
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      audio.pause()
      document.removeEventListener('click', handleClick)
    }
  }, [audioPlaying])

  return (
    <div className="h-screen w-full bg-black text-white overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        <motion.h1 
          className="text-7xl md:text-9xl font-bold tracking-tighter mb-8"
          animate={{ y: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          A single video can convey your <span className="text-purple-500">THOUGHTS.</span>
        </motion.h1>
        <motion.button
          className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-80 transition-colors"
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [50, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
         Connect with The Founder
        </motion.button>
      </motion.div>
      {showForm && <ContactForm onClose={() => setShowForm(false)} />}
    </div>
  )
}

