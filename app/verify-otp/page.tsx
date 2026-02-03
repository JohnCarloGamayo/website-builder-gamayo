'use client';
import Link from 'next/link'
import { verifyOTP, resendOTP } from './actions'
import React, { Suspense, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from 'next/navigation'
import { Mail, ArrowLeft } from 'lucide-react'

function VerifyOTPForm() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || ''
  const message = searchParams.get('message')
  const [isResending, setIsResending] = useState(false)

  React.useEffect(() => {
    if (message) {
      toast({
        variant: "destructive",
        title: "Verification Error",
        description: message,
      })
    }
  }, [message, toast])

  const handleResend = async () => {
    setIsResending(true)
    const result = await resendOTP(email)
    
    if (result.error) {
      toast({
        variant: "destructive",
        title: "Resend Failed",
        description: result.error,
      })
    } else {
      toast({
        title: "OTP Sent!",
        description: "A new verification code has been sent to your email.",
      })
    }
    setIsResending(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d1a] text-white p-4">
      <div className="w-full max-w-md space-y-8 bg-[#1e1e2e] p-8 rounded-xl border border-gray-800 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Verify Your Email</h2>
          <p className="mt-2 text-sm text-gray-400">
            We've sent a 6-digit code to
          </p>
          <p className="text-purple-400 font-medium">{email}</p>
        </div>

        <form className="mt-8 space-y-6">
          <input type="hidden" name="email" value={email} />
          
          <div className="space-y-4">
            <div>
              <label htmlFor="token" className="block text-sm font-medium text-gray-400 mb-2 text-center">
                Enter verification code
              </label>
              <input
                id="token"
                name="token"
                type="text"
                maxLength={6}
                pattern="[0-9]{6}"
                required
                autoComplete="one-time-code"
                className="relative block w-full rounded-md border border-gray-700 bg-[#2a2a3e] px-4 py-3 text-white text-center text-2xl tracking-widest placeholder-gray-500 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono"
                placeholder="000000"
              />
              <p className="mt-2 text-xs text-gray-500 text-center">
                The code expires in 10 minutes
              </p>
            </div>
          </div>

          {message && (
            <div className="p-3 bg-red-900/50 border border-red-500/50 rounded text-sm text-red-200 text-center">
              {message}
            </div>
          )}

          <div className="space-y-3">
            <button
              formAction={verifyOTP}
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-3 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
            >
              Verify & Continue
            </button>

            <button
              type="button"
              onClick={handleResend}
              disabled={isResending}
              className="w-full text-center text-sm text-gray-400 hover:text-purple-400 transition-colors disabled:opacity-50"
            >
              {isResending ? 'Sending...' : "Didn't receive the code? Resend"}
            </button>
          </div>
        </form>
        
        <div className="text-center">
          <Link 
            href="/signup" 
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function VerifyOTP() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#0d0d1a] text-white">
        <div className="text-gray-400">Loading...</div>
      </div>
    }>
      <VerifyOTPForm />
    </Suspense>
  )
}
