/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/lib/auth-schema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type UserRole = 'VOLUNTEER' | 'ORGANIZATION' | 'STUDENT';

const USER_TYPES = [
  { value: 'VOLUNTEER', label: 'Volunteer' },
  { value: 'ORGANIZATION', label: 'Organization' },
  { value: 'STUDENT', label: 'Student' },
] as const;

export default function SignUp() {
  const router = useRouter();
  const [selectedUserType, setSelectedUserType] = useState<UserRole>('VOLUNTEER');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError('');
    
    try {
      const { name, email, password } = values;
      
      // Step 1: Create the account with Better Auth
      const { data, error: authError } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/sign-in",
      });

      if (authError) {
        console.error("Error during sign-up:", authError.message);
        setError(authError.message || '');
        setIsLoading(false);
        return;
      }

      // Step 2: Set the user's role
      try {
        const roleResponse = await fetch('/api/user/set-role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            role: selectedUserType,
          }),
        });

        const roleResult = await roleResponse.json();

        if (!roleResponse.ok) {
          console.error('Failed to set user role:', roleResult.error);
          setError(`Account created but failed to set role: ${roleResult.error}`);
        } else {
          console.log('Role set successfully:', roleResult);
        }
      } catch (roleError) {
        console.error('Error setting role:', roleError);
        setError('Account created but failed to set role. Please contact support.');
      }

      // Step 3: Reset form and redirect
      form.reset();
      router.push('/sign-in');
      console.log("Sign-up successful!");
      
    } catch (error) {
      console.error("Unexpected error during sign-up:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      await authClient.signIn.social({
        provider: "google",
        callbackURL: `/auth/callback?role=${selectedUserType}`,
      });
    } catch (error) {
      console.error("Error with Google sign-up:", error);
      setError("Failed to sign up with Google. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/carbon-fiber.png"
          alt="Carbon Fiber Background"
          fill
          className="object-cover opacity-20"
        />
      </div>

      {/* Sign Up Container */}
      <div className="z-10 w-full max-w-md p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image 
            src="/moc-logo.png"
            alt="Mindset of Champions Foundation"
            width={200}
            height={200}
          />
        </div>

        {/* Form */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-[400px]">
          {/* Role Selector */}
          <div className="mb-4">
            <div className="flex bg-[#9B9B9B0D] backdrop-blur-sm rounded-lg p-1">
              {USER_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSelectedUserType(type.value)}
                  disabled={isLoading}
                  className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedUserType === type.value
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-300 hover:text-white'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-400 text-sm mb-2 text-center">
              {error}
            </div>
          )}

          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              {...form.register("name")}
              disabled={isLoading}
              className="w-full bg-[#9B9B9B0D] backdrop-blur-sm text-[#49454F] p-3 pl-12 rounded-md disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              {...form.register("email")}
              disabled={isLoading}
              className="w-full bg-[#9B9B9B0D] backdrop-blur-sm text-[#49454F] p-3 pl-12 rounded-md disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              {...form.register("password")}
              disabled={isLoading}
              className="w-full bg-[#9B9B9B0D] backdrop-blur-sm text-[#49454F] p-3 pl-12 rounded-md disabled:opacity-50"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between mt-2">
            <Link 
              href="/sign-in" 
              className={`text-white text-sm hover:underline w-full bg-[#9B9B9B0D] backdrop-blur-sm p-3 rounded-md text-center ${
                isLoading ? 'pointer-events-none opacity-50' : ''
              }`}
            >
              Already have an account? Sign In
            </Link>
          </div>

          {/* Separator Line */}
          <div className="flex items-center">
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          {/* Sign up Buttons */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#9B9B9B0D] hover:bg-red-700 text-white p-3 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* <button 
            type="button" 
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full bg-[#9B9B9B0D] text-white p-3 rounded-md transition duration-300 flex items-center justify-center gap-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="currentColor"/>
            </svg>
            Sign-up with Google
          </button> */}
        </form>
      </div>
    </div>
  )
}