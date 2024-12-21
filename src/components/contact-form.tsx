'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { submitForm } from '@/app/action'
import { Loader2, X } from 'lucide-react'

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const [formState, setFormState] = useState({ name: '', email: '', type: 'developer', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ message: string; isError: boolean } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const result = await submitForm(formState)
      setSubmitResult({ message: result.message, isError: false })
    } catch (error) {
      setSubmitResult({ message: 'An error occurred. Please try again.', isError: true })
    }
    setIsSubmitting(false)
  }

  const formVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center p-4 z-50"
    >
    
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="bg-gray-800 text-white p-8 rounded-3xl w-full max-w-4xl h-[90vh] shadow-2xl border border-gray-700 overflow-hidden flex flex-col relative"
      >
        <motion.button
          variants={itemVariants}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
          aria-label="Close form"
        >
          <X size={24} />
        </motion.button>
        <motion.h2 
          variants={itemVariants}
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text"
        >
          Get in Touch
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6 flex-grow overflow-y-auto px-4">
          <motion.div variants={itemVariants}>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ease-in-out"
              placeholder="Your name"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ease-in-out"
              placeholder="your.email@example.com"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-300">I am a:</label>
            <select
              id="role"
              value={formState.type}
              onChange={(e) => setFormState({ ...formState, type: e.target.value })}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-300 ease-in-out"
            >
              <option value="developer">Developer</option>
              <option value="investor">Investor</option>
            </select>
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-300">Message</label>
            <textarea
              id="message"
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              required
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 ease-in-out"
              rows={6}
              placeholder="Your message here..."
            />
          </motion.div>
        </form>
        <div className="mt-6 flex flex-col items-center">
          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="w-full max-w-md bg-purple-600 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={18} />
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </motion.button>
          {submitResult && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 text-center ${submitResult.isError ? 'text-red-400' : 'text-green-400'}`}
            >
              {submitResult.message}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

