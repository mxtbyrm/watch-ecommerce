import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-tight">
                CHRONO<span className="text-primary">LUXE</span>
              </span>
            </Link>
            <p className="mt-4 text-muted-foreground">
              Purveyors of fine timepieces since 1875. Discover our curated
              collection of luxury watches from the world's most prestigious
              brands.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Shop</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/products" className="hover:text-primary">
                  All Watches
                </Link>
              </li>
              <li>
                <Link
                  href="/products?brand=rolex"
                  className="hover:text-primary"
                >
                  Rolex
                </Link>
              </li>
              <li>
                <Link
                  href="/products?brand=patek-philippe"
                  className="hover:text-primary"
                >
                  Patek Philippe
                </Link>
              </li>
              <li>
                <Link
                  href="/products?brand=audemars-piguet"
                  className="hover:text-primary"
                >
                  Audemars Piguet
                </Link>
              </li>
              <li>
                <Link
                  href="/products?brand=omega"
                  className="hover:text-primary"
                >
                  Omega
                </Link>
              </li>
              <li>
                <Link
                  href="/products?movement=automatic"
                  className="hover:text-primary"
                >
                  Automatic Watches
                </Link>
              </li>
              <li>
                <Link href="/products?new=true" className="hover:text-primary">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Information</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium">Newsletter</h3>
            <p className="mb-4 text-muted-foreground">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex">
              <Input
                type="email"
                placeholder="Your email address"
                className="rounded-r-none border-r-0"
              />
              <Button className="rounded-l-none ">Subscribe</Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              By subscribing you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Chrono Luxe. All rights reserved.</p>
          <p className="mt-2">
            All product names, logos, and brands are property of their
            respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
