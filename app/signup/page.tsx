'use client';

import AuthLayout from '@/components/auth/AuthLayout';
import { signup } from './actions';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const initialState = {
  message: '',
  error: '',
  success: false
};

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signup, initialState);

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400">Join thousands of creators building the future.</p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-gray-300">First Name</Label>
            <Input id="firstName" name="firstName" placeholder="John" required className="bg-[#1a1a2e] border-[#2a2a3e] text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-gray-300">Last Name</Label>
            <Input id="lastName" name="lastName" placeholder="Doe" required className="bg-[#1a1a2e] border-[#2a2a3e] text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-[#1a1a2e] border-[#2a2a3e] text-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber" className="text-gray-300">Contact Number</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-[#2a2a3e] bg-[#222236] text-gray-400 text-sm">
              +63
            </span>
            <Input 
              id="contactNumber" 
              name="contactNumber" 
              type="tel" 
              placeholder="912 345 6789" 
              pattern="[0-9]{10}"
              required 
              className="rounded-l-none bg-[#1a1a2e] border-[#2a2a3e] text-white" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">Password</Label>
          <Input id="password" name="password" type="password" required className="bg-[#1a1a2e] border-[#2a2a3e] text-white" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-300">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" required className="bg-[#1a1a2e] border-[#2a2a3e] text-white" />
        </div>

        {state?.error && (
          <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {state.error}
          </div>
        )}

        {state?.success && (
          <div className="p-3 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-sm text-center">
             {state.message || 'Account created successfully!'}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6"
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Create Account'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
