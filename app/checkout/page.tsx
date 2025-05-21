"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/lib/cart-context";
import {
  CheckCircle2,
  ChevronLeft,
  CreditCard,
  LockIcon,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    sameAddress: true,
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderComplete(true);
      clearCart();
      window.scrollTo(0, 0);
    }, 2000);
  };

  if (orderComplete) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-900/20">
          <CheckCircle2 className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="mb-4 font-serif text-3xl font-bold">Order Confirmed!</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Thank you for your purchase. Your order #CHR-
          {Math.floor(100000 + Math.random() * 900000)} has been confirmed and
          will be shipped shortly. You will receive an email confirmation with
          your order details.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <a href="/account/orders">View Order</a>
          </Button>
          <Button asChild>
            <a href="/">Continue Shopping</a>
          </Button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-serif text-3xl font-bold">Checkout</h1>

      {/* Checkout Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          <div
            className={`flex flex-1 flex-col items-center ${
              currentStep >= 1 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                currentStep >= 1 ? "border-primary" : "border-border"
              }`}
            >
              {currentStep > 1 ? <CheckCircle2 className="h-5 w-5" /> : 1}
            </div>
            <span className="mt-2 text-sm">Shipping</span>
          </div>
          <div
            className={`h-0.5 flex-1 self-center transition-colors duration-300 ${
              currentStep >= 2 ? "bg-primary" : "bg-secondary"
            }`}
          />
          <div
            className={`flex flex-1 flex-col items-center ${
              currentStep >= 2 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                currentStep >= 2 ? "border-primary" : "border-border"
              }`}
            >
              {currentStep > 2 ? <CheckCircle2 className="h-5 w-5" /> : 2}
            </div>
            <span className="mt-2 text-sm">Payment</span>
          </div>
          <div
            className={`h-0.5 flex-1 self-center transition-colors duration-300 ${
              currentStep >= 3 ? "bg-primary" : "bg-secondary"
            }`}
          />
          <div
            className={`flex flex-1 flex-col items-center ${
              currentStep >= 3 ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                currentStep >= 3 ? "border-primary" : "border-border"
              }`}
            >
              3
            </div>
            <span className="mt-2 text-sm">Review</span>
          </div>
        </div>
      </div>

      {/* Checkout Forms */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {currentStep === 1 && (
            <Card className="border-border bg-background">
              <CardHeader className="border-b border-border">
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your shipping details</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitShipping}>
                <CardContent className="p-6">
                  <div className="grid gap-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
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
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State/Province</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="zip">Postal Code</Label>
                        <Input
                          id="zip"
                          value={formData.zip}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-border p-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.push("/cart")}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back to Cart
                  </Button>
                  <Button type="submit">Continue to Payment</Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {currentStep === 2 && (
            <Card className="border-border bg-background">
              <CardHeader className="border-b border-border">
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Choose your preferred payment method
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmitPayment}>
                <CardContent className="p-6">
                  <Tabs defaultValue="credit-card" className="w-full">
                    <TabsList className=" w-full">
                      <TabsTrigger value="credit-card">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Credit Card
                      </TabsTrigger>
                      <TabsTrigger value="paypal">
                        <svg
                          className="mr-2 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 8.5C19.5 11.5 17 14 14 14H11L10 19H7L8.5 8.5H14C17 8.5 19.5 5.5 19.5 8.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.5 3.5C16.5 6.5 14 9 11 9H8L7 14H4L5.5 3.5H11C14 3.5 16.5 0.5 16.5 3.5Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        PayPal
                      </TabsTrigger>
                      <TabsTrigger value="bank-transfer">
                        <svg
                          className="mr-2 h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 21H21M3 10H21M5 6L12 3L19 6M4 10V21M20 10V21M8 14V17M12 14V17M16 14V17"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Bank Transfer
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="credit-card" className="mt-6 space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <div className="relative">
                          <Input
                            id="cardNumber"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            className="border-border bg-card pr-10"
                            required
                          />
                          <LockIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiration Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <div className="relative">
                            <Input
                              id="cvv"
                              placeholder="XXX"
                              value={formData.cvv}
                              onChange={handleChange}
                              className="border-border bg-card pr-10"
                              required
                            />
                            <LockIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm">
                        <ShieldCheck className="h-5 w-5 text-green-500" />
                        <span>
                          Your payment information is secure and encrypted
                        </span>
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="mt-6">
                      <div className="rounded-md border border-border bg-card p-6 text-center">
                        <svg
                          className="mx-auto mb-4 h-12 w-12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M19.5 8.5C19.5 11.5 17 14 14 14H11L10 19H7L8.5 8.5H14C17 8.5 19.5 5.5 19.5 8.5Z"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.5 3.5C16.5 6.5 14 9 11 9H8L7 14H4L5.5 3.5H11C14 3.5 16.5 0.5 16.5 3.5Z"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="mb-4 text-muted-foreground">
                          You will be redirected to PayPal to complete your
                          payment securely.
                        </p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          Pay with PayPal
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="bank-transfer" className="mt-6">
                      <div className="rounded-md border border-border bg-card p-6">
                        <h3 className="mb-4 font-medium">
                          Bank Transfer Details
                        </h3>
                        <p className="mb-4 text-muted-foreground">
                          Please use the following details to make a bank
                          transfer. Your order will be processed once payment is
                          confirmed.
                        </p>
                        <div className="space-y-3 rounded-md bg-background p-4">
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">Bank:</span>
                            <span className="font-medium">Luxury Bank</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">
                              Account Name:
                            </span>
                            <span className="font-medium">Chrono Luxe Ltd</span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">
                              Account Number:
                            </span>
                            <span className="font-medium">
                              XXXX-XXXX-XXXX-XXXX
                            </span>
                          </p>
                          <p className="flex justify-between">
                            <span className="text-muted-foreground">
                              Reference:
                            </span>
                            <span className="font-medium">
                              Your Order Number
                            </span>
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="mt-8">
                    <h3 className="mb-4 font-medium">Billing Address</h3>

                    <RadioGroup defaultValue="same" className="space-y-3">
                      <div className="flex items-center space-x-2 rounded-md border border-border bg-card p-3">
                        <RadioGroupItem
                          value="same"
                          id="same-address"
                          className="border-border text-primary"
                        />
                        <Label htmlFor="same-address" className="flex-1">
                          Same as shipping address
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rounded-md border border-border bg-card p-3">
                        <RadioGroupItem
                          value="different"
                          id="different-address"
                          className="border-border text-primary"
                        />
                        <Label htmlFor="different-address" className="flex-1">
                          Use a different billing address
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-border p-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button type="submit">Continue to Review</Button>
                </CardFooter>
              </form>
            </Card>
          )}

          {currentStep === 3 && (
            <Card className="border-border bg-background">
              <CardHeader className="border-b border-border">
                <CardTitle>Order Review</CardTitle>
                <CardDescription>
                  Review your order details before placing your order
                </CardDescription>
              </CardHeader>
              <form onSubmit={handlePlaceOrder}>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="mb-2 font-medium">Shipping Address</h3>
                        <div className="rounded-md border border-border bg-card p-4 text-muted-foreground">
                          <p className="font-medium">
                            {formData.firstName} {formData.lastName}
                          </p>
                          <p>{formData.address}</p>
                          <p>
                            {formData.city}, {formData.state} {formData.zip}
                          </p>
                          <p>{formData.country}</p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {formData.email}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formData.phone}
                          </p>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-2 font-medium">Payment Method</h3>
                        <div className="rounded-md border border-border bg-card p-4 text-muted-foreground">
                          <div className="flex items-center gap-3">
                            <CreditCard className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Credit Card</p>
                              <p className="text-sm text-muted-foreground">
                                {formData.cardNumber
                                  ? `**** **** **** ${formData.cardNumber.slice(
                                      -4
                                    )}`
                                  : "Card ending in 1234"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Order Items</h3>
                      <div className="rounded-md border border-border">
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4 border-b border-border p-4 last:border-0"
                          >
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-card">
                              <Image
                                src={
                                  item.image ||
                                  "https://picsum.photos/1280/720?height=64&width=64"
                                }
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {item.brand}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Quantity: {item.quantity}
                              </p>
                            </div>
                            <p className="font-medium">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 font-medium">Delivery Method</h3>
                      <div className="rounded-md border border-border bg-card p-4">
                        <div className="flex items-center gap-3">
                          <Truck className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">
                              {shipping === 0
                                ? "Free Shipping"
                                : "Standard Shipping"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Estimated delivery: 3-5 business days
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-border p-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button type="submit" disabled={isProcessing}>
                    {isProcessing ? (
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
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          )}
        </div>

        <div>
          <Card className="sticky top-24 border-border bg-background">
            <CardHeader className="border-b border-border">
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="max-h-60 overflow-y-auto pr-2 luxury-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="mb-3 flex items-center gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-card">
                      <Image
                        src={
                          item.image ||
                          "https://picsum.photos/1280/720?height=64&width=64"
                        }
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <Separator className="my-4 bg-border" />

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
              <div className="flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <span>Your payment is secure and encrypted</span>
              </div>

              <div className="flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Free shipping on orders over $10,000</span>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
