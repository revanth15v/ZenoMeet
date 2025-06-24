// 'use client'


// import { Card, CardContent } from "@/components/ui/card"
// import {z} from "zod"
// import {zodResolver} from '@hookform/resolvers/zod'
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { useForm } from "react-hook-form"
// import { Input } from "@/components/ui/input"
// import { Alert, AlertTitle } from "@/components/ui/alert"
// import { OctagonAlert as OctagonAlertIcon } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { useState } from "react"
// import { authClient } from "@/lib/auth-client"

// const formSchema = z.object({
//     email: z.string().email(),
//     password: z.string().min(1, {message: "Password is Required"})
// })

// export const SignInView = () => {

//     const router = useRouter();

//     const [error, setError] = useState<string | null>(null);

//     const [pending, setPending] = useState(false)

//     const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   })

//   const onSubmit =  (data:z.infer<typeof formSchema> ) => {
//     setError(null)
//     setPending(true)

//   authClient.signIn.email({
//         email: data.email,
//         password: data.password
//     },
//     {
//         onSuccess: () => {
//             setPending(false)
//             router.push("/")
//         },
//         onError: ({error}) => {
//             setError(error.message)
//         }
//     }
// )

//   }
 
//     return(
//         <div className="flex flex-col gap-6">
//             <Card className="overflow-hidden p-0">
//                 <CardContent className="grid p-0 md:grid-cols-2">
//                     <Form {...form}>
//                           <form  onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
//                             <div className="flex flex-col gap-6">
//                                 <div className="flex flex-col items-center text-center">
//                                 <h1 className="text-2xl font-bold">
//                                     Welcome Back
//                                 </h1>
//                                 <p className="text-muted-foreground text-balance">
//                                     Login to your account
//                             </p>

//                                 </div>
//                                 <div className="grid gap-3">
//                                     <FormField
//                                     control={form.control}
//                                     name="email"
//                                     render={({field}) => (
//                                         <FormItem>
//                                             <FormLabel>
//                                                 Email
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                 type="email"
//                                                 placeholder="example@gmail.com"
//                                                 {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage/>
//                                         </FormItem>
//                                     )}
//                                     >

//                                     </FormField>
//                                 </div>
//                                 <div className="grid gap-3">
//                                     <FormField
//                                     control={form.control}
//                                     name="password"
//                                     render={({field}) => (
//                                         <FormItem>
//                                             <FormLabel>
//                                                 Password
//                                             </FormLabel>
//                                             <FormControl>
//                                                 <Input
//                                                 type="password"
//                                                 placeholder="********"
//                                                 {...field}
//                                                 />
//                                             </FormControl>
//                                             <FormMessage/>
//                                         </FormItem>
//                                     )}
//                                     >

//                                     </FormField>
//                                 </div>
//                                 {!!error && (
//                                     <Alert className="bg-destructive/10 border-none">
//                                         <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
//                                         <AlertTitle>
//                                             {error}
//                                         </AlertTitle>
//                                     </Alert>
//                                 )}

//                                 <Button
//                                 disabled={pending}
//                                 type="submit"
//                                 className="w-full cursor-pointer"
//                                 >
//                                     Sign In
//                                 </Button>
//                                 <div className="after:border-border relative text-center 
//                                 text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
//                                     <span className="bg-card text-muted-foreground relative z-10 px-2">
//                                         Or Continue with
//                                     </span>
//                                 </div>
//                             <div className="grid grid-cols-2 gap-4">

//                                 <Button
//                                  disabled={pending}
//                                 variant="outline"
//                                 type="button"
//                                 className="w-full cursor-pointer"
//                                 >
//                                     Google
//                                 </Button>
//                                 <Button
//                                  disabled={pending}
//                                 variant="outline"
//                                 type="button"
//                                 className="w-full cursor-pointer"
//                                 >
//                                     Github
//                                 </Button>

//                             </div>
//                             <div className="text-center text-sm">
//                                 Don't have an account?  <Link href="sign-up" className="underline underline-offset-4">
//                                 Sign Up
//                                 </Link>

//                             </div>
//                             </div>
//                             </form>
//                     </Form>
                  
//                    <div className="bg-radial from-green-700 to-green-900 relative hidden md:flex flex-col gap-y-4 items-center justify-center">

//                         <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]"/>
//                        <p className="text-2xl font-semibold text-white">
//                             ZenoMeet
//                        </p>
//                     </div>
//                 </CardContent>
           
//         </Card>
//         <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs
//         text-balance *:[a]:underline *:[a]:underline-offset-4
//         ">
//             By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
//         </div>
//         </div>
//     )
// }


'use client'

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { OctagonAlert as OctagonAlertIcon, Eye, EyeOff, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const formSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  })
  
  

const SignInView = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const fieldsRef = useRef<HTMLDivElement[]>([]);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
      email: "",
      password: "",
      
    },
  });

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([cardRef.current, titleRef.current, subtitleRef.current, ...fieldsRef.current, buttonsRef.current, footerRef.current], {
      opacity: 0,
      y: 30
    });

    gsap.set(heroRef.current, {
      opacity: 0,
      x: 50
    });

    // Animation sequence
    tl.to(containerRef.current, {
      opacity: 1,
      duration: 0.3
    })
    .to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    })
    .to(heroRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.6")
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.4")
    .to(fieldsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: "power2.out"
    }, "-=0.3")
    .to(buttonsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    }, "-=0.2")
    .to(footerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.1");

    // Floating animation for hero elements
    gsap.to(".floating-icon", {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.3
    });

    // Continuous glow animation
    gsap.to(".glow-effect", {
      boxShadow: "0 0 30px rgba(34, 197, 94, 0.4)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });

  }, []);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);
    
    // Simulate API call - replace with your actual auth logic
   authClient.signIn.email({
         email: data.email,
       password: data.password
     },
    {
        onSuccess: () => {
            setPending(false)
            router.push("/dashboard")
         },
        onError: ({error}) => {
             setError(error.message)
         }
     }
 )

    try {
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success animation
      gsap.to(formRef.current, {
        scale: 0.95,
        opacity: 0.7,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          setPending(false);
          router.push('/')
        }
      });
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setPending(false);
    }
  };

  const addToFieldsRef = (el: HTMLDivElement | null) => {
    if (el && !fieldsRef.current.includes(el)) {
      fieldsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50 flex items-center justify-center p-4 opacity-0"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <Card 
          ref={cardRef}
          className="overflow-hidden border-0 shadow-2xl bg-white/80 backdrop-blur-xl glow-effect"
        >
          <CardContent className="grid p-0 lg:grid-cols-2 min-h-[700px]">
            {/* Form Section */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <Form {...form}>
                <form
                  ref={formRef}
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full max-w-md space-y-6"
                >
                  {/* Header */}
                  <div className="text-center space-y-3">
                    <h1 
                      ref={titleRef}
                      className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"
                    >
                     Welcome Back
                    </h1>
                    <p 
                      ref={subtitleRef}
                      className="text-slate-600 text-lg"
                    >
                      Login to your account
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    

                    <div ref={addToFieldsRef}>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@example.com"
                                className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white/50 backdrop-blur-sm transition-all duration-300"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div ref={addToFieldsRef}>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium">
                              Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Create a secure password"
                                  className="h-12 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500 bg-white/50 backdrop-blur-sm transition-all duration-300 pr-10"
                                  {...field}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    
                  </div>

                  {error && (
                    <Alert className="bg-red-50 border-red-200 text-red-800">
                      <OctagonAlertIcon className="h-4 w-4 text-red-600" />
                      <AlertTitle>{error}</AlertTitle>
                    </Alert>
                  )}

                  <div ref={buttonsRef} className="space-y-4">
                    <Button
                      disabled={pending}
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold transition-all duration-300 transform hover:scale-[1.02] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {pending ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Hold on, we're signing you in...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="bg-white px-4 text-slate-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        disabled={pending}
                        variant="outline"
                        type="button"
                        className="h-12 border-slate-200 hover:border-slate-300 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Google
                      </Button>
                      <Button
                        disabled={pending}
                        variant="outline"
                        type="button"
                        className="h-12 border-slate-200 hover:border-slate-300 transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </Button>
                    </div>
                  </div>

                  <div ref={footerRef} className="text-center">
                    <p className="text-slate-600">
                      Don't have an account?{" "}
                      <Link
                        href="/sign-up"
                        className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors duration-300"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </Form>
            </div>

            {/* Hero Section */}
            <div 
              ref={heroRef}
              className="hidden lg:flex bg-gradient-to-br from-emerald-600 via-emerald-700 to-blue-800 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white/10 rounded-full blur-lg"></div>
              </div>

              <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center text-white">
                {/* Logo */}
                <div className="mb-8 floating-icon">
                  <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]"/>
                </div>

                <h2 className="text-4xl font-bold mb-4">Welcome to ZenoMeet</h2>
                <p className="text-xl text-emerald-100 mb-8 max-w-md">
                  Join thousands of professionals who trust ZenoMeet for their meetings and collaboration.
                </p>

                {/* Feature Icons */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="text-center floating-icon">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                      <Shield size={20} />
                    </div>
                    <p className="text-sm text-emerald-100">Secure</p>
                  </div>
                  <div className="text-center floating-icon">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                      <Zap size={20} />
                    </div>
                    <p className="text-sm text-emerald-100">Fast</p>
                  </div>
                  <div className="text-center floating-icon">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
                      <Sparkles size={20} />
                    </div>
                    <p className="text-sm text-emerald-100">Premium</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-slate-500 mt-8">
          <p>
            By creating an account, you agree to our{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-emerald-600 hover:text-emerald-700 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInView;



