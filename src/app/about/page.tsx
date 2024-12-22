'use client'

import React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParallax } from '@/hooks/useParallax'

export default function About() {
  const [theme, setTheme] = useState('dark')
  const parallaxY = useParallax(300)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'} p-24 pt-32 transition-colors duration-500`}>
      
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-2 bg-violet-700 origin-left z-50"
      />
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-full bg-violet-700 text-white hover:bg-violet-600 transition-colors"
        >
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
      <motion.div
        variants={staggerChildren}
        initial="initial"
        animate="animate"
        className="max-w-2xl"
        id="parallax-container"
        style={{ y: parallaxY }}
      >
        <motion.h1 variants={fadeInUp} className="text-6xl font-light mb-12 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">About VROOM</motion.h1>
        <motion.p variants={fadeInUp} className="text-xl font-light leading-relaxed opacity-80 mb-12">
          At <span className="text-violet-500 font-bold">VROOM</span>, we believe communication is the cornerstone of collaboration and success. In today's fast-paced world, we set out to create a better way to communicate—one that's simple, efficient, and personal.
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">Our Mission</motion.h2>
        <motion.p variants={fadeInUp} className="text-xl font-light leading-relaxed opacity-80 mb-12">
          To empower individuals and businesses with a seamless way to share ideas, provide feedback, and collaborate effectively through video-first communication.
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">What We Do</motion.h2>
        <motion.p variants={fadeInUp} className="text-xl font-light leading-relaxed opacity-80 mb-12">
          <span className="text-violet-500 font-bold">VROOM</span> is a video communication platform that allows users to record and share short, impactful video messages. Whether you're explaining a complex concept, providing feedback, or aligning with your team, our platform ensures your message is delivered with clarity, context, and a personal touch.
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">Why Choose Us?</motion.h2>
        <motion.ul variants={fadeInUp} className="list-none text-xl font-light leading-relaxed opacity-80 mb-12 space-y-4">
          {[
            "Time-Saving: Replace long emails and unnecessary meetings with concise video messages.",
            "Clarity & Context: Combine visuals, voice, and expressions for effective communication.",
            "Tailored for India: Support for multiple Indian languages and local integrations.",
            "Secure & Reliable: Your data stays secure and compliant with local regulations."
          ].map((item, index) => (
            <motion.li
              key={index}
              className="flex items-center space-x-2 hover:text-violet-500 transition-colors cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-violet-500">•</span>
              <span>{item}</span>
            </motion.li>
          ))}
        </motion.ul>
        <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">Our Vision</motion.h2>
        <motion.p variants={fadeInUp} className="text-xl font-light leading-relaxed opacity-80 mb-12">
          We envision a world where communication barriers are eliminated, and collaboration becomes second nature—regardless of where you are or what language you speak.
        </motion.p>
        <motion.h2 variants={fadeInUp} className="text-4xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-pink-500">Join Us</motion.h2>
        <motion.p variants={fadeInUp} className="text-xl font-light leading-relaxed opacity-80 mb-8">
          We're building more than just a tool; we're creating a movement that transforms how people work and connect. Whether you're a startup founder, a freelancer, or part of a growing team, <span className="text-violet-500 font-bold">VROOM</span> is here to help you work smarter, faster, and better.
        </motion.p>
        <motion.p variants={fadeInUp} className="text-xl font-light leading-relaxed opacity-80 mt-8">
          Let's make communication effortless—together.
        </motion.p>
        <motion.button
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-8 py-4 bg-violet-700 text-white rounded-full text-xl font-semibold hover:bg-violet-600 transition-colors"
        >
          Get Started with VROOM
        </motion.button>
      </motion.div>
    </div>
  )
}

