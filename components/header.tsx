"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { useAuth } from "@/lib/auth-context";
import { useMobile } from "@/hooks/use-mobile";
import SearchDialog from "@/components/search-dialog";
import { ShoppingBag, User, Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

export default function Header() {
  const pathname = usePathname();
  const isMobile = useMobile();
  const { cart } = useCart();
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-serif text-2xl font-bold tracking-tight">
              CHRONO<span className="text-primary">LUXE</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <SearchDialog />

            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="text-muted-foreground hover:text-primary"
            >
              <Link href={user ? "/account" : "/login"}>
                <User className="h-5 w-5" />
              </Link>
            </Button>

            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative text-muted-foreground hover:text-primary"
            >
              <Link href="/cart">
                <ShoppingBag className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            </Button>
            <ModeToggle />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-muted-foreground hover:text-primary"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="py-6">
                    <Link href="/" className="flex items-center">
                      <span className="font-serif text-2xl font-bold tracking-tight">
                        CHRONO<span className="text-primary">LUXE</span>
                      </span>
                    </Link>
                  </div>

                  <nav className="flex flex-col space-y-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className={`text-lg font-medium transition-colors hover:text-primary ${
                          pathname === link.href
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto space-y-4 py-6">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Search
                      </p>
                      <div className="flex">
                        <Input
                          type="search"
                          placeholder="Search for watches..."
                          className="rounded-r-none"
                        />
                        <Button className="rounded-l-none">
                          <SearchDialog />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Account
                      </p>
                      <Button asChild className="w-full justify-start">
                        <Link href={user ? "/account" : "/login"}>
                          <User className="mr-2 h-4 w-4" />
                          {user ? "My Account" : "Sign In"}
                        </Link>
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Cart
                      </p>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <Link href="/cart">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          {cartItemsCount > 0
                            ? `${cartItemsCount} items`
                            : "Cart is empty"}
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
