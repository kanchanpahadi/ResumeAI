import { SignUp } from '@clerk/clerk-react'
import React from 'react'
import { Link } from 'react-router-dom'

function SignUpPage() {
  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-10'>
      <div className='flex flex-col items-center'>
        <SignUp 
          path="/auth/sign-up"
          routing="path"
          signInUrl="/auth/sign-in"
          afterSignUpUrl="/dashboard"
          fallbackRedirectUrl="/dashboard"
        />
        <div className='bg-white border border-gray-200 rounded-b-xl w-full px-8 py-4 text-center -mt-2 shadow-md'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to="/auth/sign-in" className='text-blue-600 hover:underline font-medium'>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage