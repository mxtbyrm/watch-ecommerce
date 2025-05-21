"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculatedSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const calculatedShipping = calculatedSubtotal > 10000 ? 0 : 250;
    const calculatedTax = calculatedSubtotal * 0.07;

    setSubtotal(calculatedSubtotal);
    setShipping(calculatedShipping);
    setTax(calculatedTax);
    setTotal(calculatedSubtotal + calculatedShipping + calculatedTax);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-card">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="mb-4 font-serif text-3xl font-bold">
          Your Cart is Empty
        </h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Looks like you haven't added any watches to your cart yet. Explore our
          collection to find your perfect timepiece.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Return to Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/products">Browse Collection</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-serif text-3xl font-bold">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="border-b border-border px-6">
              <div className="hidden sm:grid sm:grid-cols-6">
                <div className="col-span-3 font-medium">Product</div>
                <div className="col-span-1 text-center font-medium">Price</div>
                <div className="col-span-1 text-center font-medium">
                  Quantity
                </div>
                <div className="col-span-1 text-right font-medium">Total</div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b border-border last:border-0"
                  >
                    <div className="grid grid-cols-1 p-6 sm:grid-cols-6">
                      <div className="col-span-3 flex items-center gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-card">
                          <Image
                            src={
                              item.image ||
                              "https://picsum.photos/1280/720?height=96&width=96"
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.brand}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="mt-2 flex items-center text-sm text-destructive hover:text-destructive/80"
                          >
                            <Trash2 className="mr-1 h-3 w-3" />
                            Remove
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 flex items-center justify-center py-2 sm:py-0">
                        <span className="text-center sm:hidden">Price: </span>
                        <span className="text-center">
                          ${item.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="col-span-1 flex items-center justify-center py-2 sm:py-0">
                        <div className="flex items-center rounded-md border border-border">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-l-md border-r border-border hover:bg-secondary"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item.id,
                                Number.parseInt(e.target.value) || 1
                              )
                            }
                            className="h-8 w-12 rounded-none border-0 bg-transparent text-center"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-r-md border-l border-border hover:bg-secondary"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 flex items-center justify-end py-2 sm:py-0">
                        <span className="font-medium sm:hidden">Total: </span>
                        <span className="font-medium">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-border px-6 py-4">
              <Button
                variant="ghost"
                onClick={() => clearCart()}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive/80"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Clear Cart
              </Button>
              <Button asChild variant="outline">
                <Link href="/products" className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="sticky top-24">
            <CardHeader className="border-b border-border">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `$${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-medium">
                    $
                    {tax.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <Separator className="my-3 bg-border" />

                <div className="flex justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-lg font-bold">
                    $
                    {total.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 border-t border-border p-6">
              <Button
                className="w-full"
                onClick={() => router.push("/checkout")}
              >
                <span className="flex items-center gap-2">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>

              <div className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Secure checkout powered by Stripe
              </div>

              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <svg
                  className="h-6 w-auto"
                  viewBox="0 0 38 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="38" height="24" rx="3" fill="#F3F4F6" />
                  <path
                    d="M14.5 16.5H11.5L9 7.5H12L14.5 16.5Z"
                    fill="#2563EB"
                  />
                  <path
                    d="M21.5 7.5C20.5 7.5 19 8 19 9.5C19 10.7 20.2 11.2 21 11.5C21.8 11.8 22 12.1 22 12.5C22 13.1 21.2 13.5 20.5 13.5C19.5 13.5 19 13.2 18.5 13L18 15C18.5 15.3 19.5 15.5 20.5 15.5C22.5 15.5 24 14.5 24 12.5C24 10.5 21.5 10.5 21.5 9.5C21.5 9 22 8.5 23 8.5C23.7 8.5 24.5 8.7 25 9L25.5 7C25 7 23.5 6.5 22.5 6.5C20.5 6.5 19 8 19 9.5"
                    fill="#2563EB"
                  />
                  <path
                    d="M27 7.5L26.5 8C27.5 8.5 28 9.5 28 10.5V15.5H30.5V7.5H27Z"
                    fill="#2563EB"
                  />
                  <path d="M33 7.5L30.5 15.5H33L35.5 7.5H33Z" fill="#2563EB" />
                  <path
                    d="M17 7.5L14 15.5H16.5L17 14H20L20.2 15.5H22.5L21 7.5H17ZM17.7 12L18.5 9.5L19.2 12H17.7Z"
                    fill="#2563EB"
                  />
                </svg>
                <svg
                  className="h-6 w-auto"
                  viewBox="0 0 38 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="38" height="24" rx="3" fill="#F3F4F6" />
                  <path
                    d="M22.5 17H15.5C11.5 17 8.5 14 8.5 10C8.5 6 11.5 3 15.5 3H22.5C26.5 3 29.5 6 29.5 10C29.5 14 26.5 17 22.5 17Z"
                    fill="#FF5F00"
                  />
                  <path
                    d="M15.5 10C15.5 8 16.5 6.2 18 5C16.5 3.8 14.5 3 12.5 3C8.5 3 5.5 6 5.5 10C5.5 14 8.5 17 12.5 17C14.5 17 16.5 16.2 18 15C16.5 13.8 15.5 12 15.5 10Z"
                    fill="#EB001B"
                  />
                  <path
                    d="M32.5 10C32.5 14 29.5 17 25.5 17C23.5 17 21.5 16.2 20 15C21.5 13.8 22.5 12 22.5 10C22.5 8 21.5 6.2 20 5C21.5 3.8 23.5 3 25.5 3C29.5 3 32.5 6 32.5 10Z"
                    fill="#F79E1B"
                  />
                </svg>
                <svg
                  className="h-6 w-auto"
                  viewBox="0 0 38 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="38" height="24" rx="3" fill="#F3F4F6" />
                  <path
                    d="M13 9.5C13 10.9 11.9 12 10.5 12C9.1 12 8 10.9 8 9.5C8 8.1 9.1 7 10.5 7C11.9 7 13 8.1 13 9.5Z"
                    fill="#0A2540"
                  />
                  <path d="M15 7H17V15H15V7Z" fill="#0A2540" />
                  <path
                    d="M23.2 7.2C22.4 6.8 21.4 6.5 20.2 6.5C17.9 6.5 16.2 7.8 16.2 9.8C16.2 11.3 17.4 12.2 18.9 12.7C19.6 13 19.9 13.2 19.9 13.5C19.9 14 19.3 14.2 18.7 14.2C17.8 14.2 17.1 14 16.2 13.5L15.8 15.2C16.7 15.7 17.8 15.9 18.9 15.9C21.4 15.9 23 14.6 23 12.5C23 11.1 22 10.3 20.5 9.8C19.8 9.5 19.4 9.3 19.4 9C19.4 8.6 19.8 8.3 20.5 8.3C21.2 8.3 22 8.5 22.7 8.8L23.2 7.2Z"
                    fill="#0A2540"
                  />
                  <path
                    d="M30 12.4C30 12.4 29.7 13.9 29.6 14.3C29.5 14 29 12.4 29 12.4L28.2 9.5H26.2L28.2 15.5H30.2L33 9.5H31L30 12.4Z"
                    fill="#0A2540"
                  />
                </svg>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
