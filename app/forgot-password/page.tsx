"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-block">
              <span className="font-serif text-3xl font-bold tracking-tight">
                CHRONO<span className="text-amber-500">LUXE</span>
              </span>
            </Link>
          </div>

          <Card className="border-zinc-800 bg-zinc-950">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/20">
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Check Your Email</h3>
                <p className="mb-6 text-zinc-400">
                  We've sent a password reset link to{" "}
                  <span className="font-medium text-white">{email}</span>.
                  Please check your inbox and follow the instructions to reset
                  your password.
                </p>
                <div className="space-y-3 text-sm text-zinc-400">
                  <p>Didn't receive the email?</p>
                  <ul className="space-y-1">
                    <li>• Check your spam or junk folder</li>
                    <li>• Make sure the email address is correct</li>
                    <li>
                      • Or{" "}
                      <Button
                        variant="link"
                        className="h-auto p-0 text-amber-500 hover:text-amber-400"
                        onClick={() => setIsSubmitted(false)}
                      >
                        try again
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t border-zinc-800 pt-6">
              <Button asChild variant="outline">
                <Link href="/login" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Return to Login
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-tight">
              CHRONO<span className="text-amber-500">LUXE</span>
            </span>
          </Link>
          <h1 className="mt-6 font-serif text-3xl font-bold">
            Reset Your Password
          </h1>
          <p className="mt-2 text-zinc-400">
            Enter your email to receive a password reset link
          </p>
        </div>

        <Card className="border-zinc-800 bg-zinc-950">
          <form onSubmit={handleSubmit}>
            <CardHeader className="border-b border-zinc-800">
              <CardTitle>Forgot Password</CardTitle>
              <CardDescription>
                We'll send you instructions on how to reset your password
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-md border border-red-900 bg-red-950 p-3 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border-zinc-800 bg-zinc-900 pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex-col border-t border-zinc-800 pt-6">
              <Button
                type="submit"
                className="w-full bg-amber-700 hover:bg-amber-800"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </Button>

              <div className="mt-6 text-center">
                <Button
                  asChild
                  variant="link"
                  className="text-amber-500 hover:text-amber-400"
                >
                  <Link href="/login" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
