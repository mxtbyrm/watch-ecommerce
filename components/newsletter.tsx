"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your API
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-900/20">
          <CheckCircle2 className="h-8 w-8 text-green-500" />
        </div>
        <h3 className="mb-2 font-serif text-2xl font-medium">
          Thank You for Subscribing!
        </h3>
        <p className="text-muted-foreground">
          You've been added to our newsletter. Stay tuned for exclusive offers
          and updates.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="mb-2 font-serif text-2xl font-medium">
        Subscribe to Our Newsletter
      </h3>
      <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
        Stay updated with our latest collections, exclusive offers, and
        horological insights.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row"
      >
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1"
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </div>
  );
}
