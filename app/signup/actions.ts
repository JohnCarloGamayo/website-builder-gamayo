'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function signup(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const contactNumber = formData.get('contactNumber') as string
  const confirmPassword = formData.get('confirmPassword') as string

  // Basic Validation
  if (password !== confirmPassword) {
    return { error: "Passwords do not match." }
  }

  if (!email || !password || !firstName || !lastName) {
    return { error: "Please fill in all required fields." }
  }

  // Create User
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        contact_number: contactNumber,
      }
    }
  })

  if (authError) {
    return { error: authError.message }
  }

  if (authData.user) {
    if (authData.session) {
        // User is logged in automatically (Email Confirmation Disabled)
        redirect('/dashboard')
    }
  }

  // If we reach here, it means no session was established (Email Confirmation Enabled)
  // But the user requested "once na makapag sign up sya di na need ng email verify".
  // Since we cannot force the server setting from here, we will inform the user.
  // HOWEVER, if the user strictly wants to avoid verification steps, they must disable "Confirm Email" in Supabase.
  
  return { success: true, message: 'Account created! If you have disabled email verification, please Login.' }
}

