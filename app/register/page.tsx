"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { Eye, EyeOff, AlertCircle, Check, Info } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptMarketing, setAcceptMarketing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Check password strength when password field changes
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    let strength = 0;

    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very Weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Medium";
    if (passwordStrength === 3) return "Strong";
    return "Very Strong";
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-destructive";
    if (passwordStrength === 1) return "bg-orange-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-green-500";
    return "bg-emerald-500";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate form
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (!acceptTerms) {
      setError("You must accept the Terms of Service and Privacy Policy");
      return;
    }

    try {
      setIsLoading(true);
      await register(formData);
      router.push("/account");
    } catch (err) {
      setError("An error occurred during registration. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          {/* <Link href="/" className="inline-block">
            <span className="font-serif text-3xl font-bold tracking-tight">
              CHRONO<span className="text-primary">LUXE</span>
            </span>
          </Link> */}
          <h1 className="mt-6 font-serif text-3xl font-bold">
            Create Your Account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Join our exclusive community of watch enthusiasts
          </p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader className="border-b border-border">
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Please enter your details to create an account
              </CardDescription>
            </CardHeader>

            <CardContent className="py-6">
              {error && (
                <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive bg-transparent p-3 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">
                      First Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">
                      Last Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <Separator className="bg-border" />

                <div className="space-y-2">
                  <Label htmlFor="password">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {formData.password && (
                    <div className="mt-2 space-y-2">
                      <div className="flex w-full gap-2">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full ${
                              i < passwordStrength
                                ? getPasswordStrengthColor()
                                : "bg-zinc-800"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-zinc-400">
                        Password strength:{" "}
                        <span className="font-medium">
                          {getPasswordStrengthText()}
                        </span>
                      </p>

                      <div className="space-y-1 text-xs">
                        <div className="flex items-center gap-1">
                          <Check
                            className={`h-3 w-3 ${
                              formData.password.length >= 8
                                ? "text-green-500"
                                : "text-zinc-600"
                            }`}
                          />
                          <span
                            className={
                              formData.password.length >= 8
                                ? "text-zinc-300"
                                : "text-zinc-600"
                            }
                          >
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check
                            className={`h-3 w-3 ${
                              /[A-Z]/.test(formData.password)
                                ? "text-green-500"
                                : "text-zinc-600"
                            }`}
                          />
                          <span
                            className={
                              /[A-Z]/.test(formData.password)
                                ? "text-zinc-300"
                                : "text-zinc-600"
                            }
                          >
                            At least one uppercase letter
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check
                            className={`h-3 w-3 ${
                              /[0-9]/.test(formData.password)
                                ? "text-green-500"
                                : "text-zinc-600"
                            }`}
                          />
                          <span
                            className={
                              /[0-9]/.test(formData.password)
                                ? "text-zinc-300"
                                : "text-zinc-600"
                            }
                          >
                            At least one number
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check
                            className={`h-3 w-3 ${
                              /[^A-Za-z0-9]/.test(formData.password)
                                ? "text-green-500"
                                : "text-zinc-600"
                            }`}
                          />
                          <span
                            className={
                              /[^A-Za-z0-9]/.test(formData.password)
                                ? "text-zinc-300"
                                : "text-zinc-600"
                            }
                          >
                            At least one special character
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">
                    Confirm Password <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 w-10 text-muted-foreground hover:text-foreground"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {formData.password &&
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword && (
                      <p className="mt-1 text-xs text-destructive">
                        Passwords do not match
                      </p>
                    )}
                </div>

                <div className="space-y-3 rounded-md border border-border bg-card p-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) =>
                        setAcceptTerms(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground font-normal"
                    >
                      I agree to the{" "}
                      <Link
                        href="/terms"
                        className="text-primary hover:text-primary/80"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary hover:text-primary/80"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="marketing"
                      checked={acceptMarketing}
                      onCheckedChange={(checked) =>
                        setAcceptMarketing(checked as boolean)
                      }
                    />
                    <Label
                      htmlFor="marketing"
                      className="text-sm font-normal text-muted-foreground"
                    >
                      I want to receive exclusive offers and updates by email
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex-col border-t border-border pt-6">
              <Button type="submit" disabled={isLoading} className="w-full">
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
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>

              <div className="mt-6 flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm">
                <Info className="h-5 w-5 text-primary" />
                <p className="text-muted-foreground">
                  By creating an account, you'll gain access to exclusive
                  offers, order tracking, and a personalized shopping
                  experience.
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
