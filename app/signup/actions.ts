'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Use signInWithOtp to send OTP instead of creating account immediately
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      data: {
        // Store password for later account creation after OTP verification
        temp_password: password
      }
    }
  })

  if (error) {
    redirect(`/signup?message=${encodeURIComponent(error.message)}`)
  }

  // Redirect to OTP verification page
  redirect(`/verify-otp?email=${encodeURIComponent(email)}`)
}
