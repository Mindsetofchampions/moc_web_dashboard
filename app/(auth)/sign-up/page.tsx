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

export default function SignUp() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password } = values;
    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/sign-in",
    }, {
      onRequest: (ctx) => {
        console.log("Request is being sent...");
      },
      onSuccess: (ctx) => {
        form.reset();
        router.push('/sign-in');
        console.log("Sign-up successful!");
      },
      onError: (ctx) => {
        console.error("Error during sign-up:", ctx.error.message);
        alert(ctx.error.message);
      },
    });
    console.log(values)
  }

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
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              {...form.register("name")}
              className="w-full bg-[#9B9B9B0D] backdrop-blur-sm text-[#49454F] p-3 pl-12 rounded-md"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              {...form.register("email")}
              className="w-full bg-[#9B9B9B0D] backdrop-blur-sm text-[#49454F] p-3 pl-12 rounded-md"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </span>
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              {...form.register("password")}
              className="w-full bg-[#9B9B9B0D] backdrop-blur-sm text-[#49454F] p-3 pl-12 rounded-md"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </span>
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Buttons Row */}
          <div className="flex items-center justify-between mt-2">
            <Link href="/sign-in" className="text-white text-sm hover:underline w-full bg-[#9B9B9B0D] backdrop-blur-sm p-3  rounded-md text-center">
              Already have an account? Sign In
            </Link>
          </div>

          {/* Separator Line */}
          <div className="flex items-center">
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>

          {/* Sign up Buttons */}
          <button type="submit" className="w-full bg-[#9B9B9B0D] hover:bg-red-700 text-white p-3 rounded-md transition duration-300">
            Create Account
          </button>

          <button 
            type="button" 
            onClick={async () => {
              await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboards", // Redirect to dashboard after successful sign-up
              });
            }} 
            className="w-full bg-[#9B9B9B0D] text-white p-3 rounded-md transition duration-300 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="currentColor"/>
            </svg>
            Sign-up with Google
          </button>
        </form>
      </div>
    </div>
  )
}