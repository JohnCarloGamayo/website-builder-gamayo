'use client';

import AuthLayout from '@/components/auth/AuthLayout';
import { login } from './actions';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const initialState = {
  error: '',
};

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-gray-400">Sign in to continue to your dashboard.</p>
      </div>

      <form action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gray-300">Email Address</Label>
          <Input id="email" name="email" type="email" placeholder="john@example.com" required className="bg-[#1a1a2e] border-[#2a2a3e] text-white" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-gray-300">Password</Label>
            <Link href="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300">
              Forgot password?
            </Link>
          </div>
          <Input id="password" name="password" type="password" required className="bg-[#1a1a2e] border-[#2a2a3e] text-white" />
        </div>

        {state?.error && (
          <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
            {state.error}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isPending}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-6"
        >
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Sign In'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-400 text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

