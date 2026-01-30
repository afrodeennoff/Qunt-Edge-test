
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Link from "next/link"
import { UserAuthForm } from "../components/user-auth-form"
import { useI18n } from '@/locales/client'

export default function AuthenticationPage() {
  const t = useI18n()

  return (
    <div className="min-h-screen bg-[#030303] flex font-sans overflow-hidden relative selection:bg-teal-500/30">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none"></div>

      {/* Left Panel - Visuals */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex w-1/2 flex-col justify-between p-16 relative z-10"
      >
        <Link href="/" className="cursor-pointer flex items-center gap-3 text-white/50 hover:text-white transition-colors w-fit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          <span className="text-xs font-bold uppercase tracking-widest">Return to Base</span>
        </Link>

        <div>
          <h1 className="text-6xl font-bold tracking-tighter text-white mb-6 leading-none">
            Welcome to <br />
            <span className="text-teal-500">The Edge.</span>
          </h1>
          <p className="text-zinc-500 max-w-md text-lg leading-relaxed">
            Authorized personnel only. This terminal is monitored by behavioral algorithms.
            All execution logs are immutable.
          </p>
        </div>

        <div className="flex gap-8 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse"></div>
            <span>System: <span className="text-teal-500/80">Online</span></span>
          </div>
          <div>Latency: <span className="text-teal-500/80">12ms</span></div>
          <div>Encryption: <span className="text-teal-500/80">AES-256</span></div>
        </div>
      </motion.div>

      {/* Right Panel - Interaction */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md bg-[#080808] border border-white/5 p-12 rounded-3xl relative shadow-2xl overflow-hidden"
        >
          {/* Top scanning line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-teal-500/50 to-transparent animate-[scan_3s_linear_infinite]"></div>

          <div className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <svg className="text-teal-500 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">Secure Access</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Identify Yourself</h2>
            <p className="text-zinc-500 text-sm">Enter your credentials to access the ledger.</p>
          </div>

          <UserAuthForm />

          <div className="mt-8 text-center">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest">
              By accessing this terminal, you agree to the
              <Link href="/terms" className="text-zinc-400 hover:text-white underline mx-1">Terms</Link>
              and
              <Link href="/privacy" className="text-zinc-400 hover:text-white underline mx-1">Privacy Protocol</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}