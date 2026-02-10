"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function UpdatedShortlyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#06162f] to-[#0a2b57] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        {/* Animated Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#0d1e3c] flex items-center justify-center text-white text-2xl font-bold"
        >
          ⏳
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          We’re Updating This Page
        </h1>

        {/* Subtitle */}
        <p className="text-gray-600 text-sm mb-6">
          This feature is under development and will be available very soon.
          Thanks for your patience!
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-block bg-[#004D9F] hover:bg-[#003d7f] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-all active:scale-95"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
