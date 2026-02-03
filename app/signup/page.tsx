'use client';
import Link from 'next/link'
import { signup } from './actions'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from 'next/navigation'

export default function Signup() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  React.useEffect(() => {
    if (message) {
      toast({
        variant: "destructive",
        title: "Signup Error",
        description: message,
      })
    }
  }, [message, toast])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d1a] text-white p-4">
      <div className="w-full max-w-md space-y-8 bg-[#1e1e2e] p-8 rounded-xl border border-gray-800 shadow-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Create an account</h2>
          <p className="mt-2 text-sm text-gray-400">
            Start building your website today
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-400 mb-1">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border border-gray-700 bg-[#2a2a3e] px-3 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full rounded-md border border-gray-700 bg-[#2a2a3e] px-3 py-2 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {message && (
            <div className="p-3 bg-red-900/50 border border-red-500/50 rounded text-sm text-red-200 text-center">
              {message}
            </div>
          )}

          <div>
            <button
              formAction={signup}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
           <span className="text-gray-400">Already have an account? </span>
           <Link href="/login" className="font-medium text-purple-400 hover:text-purple-300">
             Sign in
           </Link>
        </div>
      </div>
    </div>
  )
}
