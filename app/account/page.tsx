"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/lib/auth-context";
import {
  Heart,
  Package,
  Clock,
  Settings,
  LogOut,
  User,
  ShoppingBag,
  CreditCard,
  Bell,
  Shield,
  Plus,
  Truck,
} from "lucide-react";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-card">
          <User className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="mb-4 font-serif text-3xl font-bold">Account Access</h1>
        <p className="mb-8 max-w-md text-muted-foreground">
          Please sign in to access your account and manage your orders,
          wishlist, and personal information.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="outline">
            <Link href="/register">Create Account</Link>
          </Button>
          <Button asChild>
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-serif text-3xl font-bold">My Account</h1>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      className="object-cover"
                      src="https://picsum.photos/1280/720?height=80&width=80"
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 font-medium">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2 ">Premium Member</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-0">
                <nav className="flex flex-col">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className={`justify-start rounded-none border-l-2 px-6 py-3 ${
                      activeTab === "profile"
                        ? "border-l-primary text-foreground bg-primary/10 hover:bg-primary/20"
                        : "border-l-transparent text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("profile")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant={activeTab === "orders" ? "default" : "ghost"}
                    className={`justify-start rounded-none border-l-2 px-6 py-3 ${
                      activeTab === "orders"
                        ? "border-l-primary text-foreground bg-primary/10 hover:bg-primary/20"
                        : "border-l-transparent text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button
                    variant={activeTab === "wishlist" ? "default" : "ghost"}
                    className={`justify-start rounded-none border-l-2 px-6 py-3 ${
                      activeTab === "wishlist"
                        ? "border-l-primary text-foreground bg-primary/10 hover:bg-primary/20"
                        : "border-l-transparent text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("wishlist")}
                  >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                  </Button>
                  <Button
                    variant={activeTab === "appointments" ? "default" : "ghost"}
                    className={`justify-start rounded-none border-l-2 px-6 py-3 ${
                      activeTab === "appointments"
                        ? "border-l-primary text-foreground bg-primary/10 hover:bg-primary/20"
                        : "border-l-transparent text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("appointments")}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Appointments
                  </Button>
                  <Button
                    variant={activeTab === "payment" ? "default" : "ghost"}
                    className={`justify-start rounded-none border-l-2 px-6 py-3 ${
                      activeTab === "payment"
                        ? "border-l-primary text-foreground bg-primary/10 hover:bg-primary/20"
                        : "border-l-transparent text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button
                    variant={activeTab === "security" ? "default" : "ghost"}
                    className={`justify-start rounded-none border-l-2 px-6 py-3 ${
                      activeTab === "security"
                        ? "border-l-primary text-foreground bg-primary/10 hover:bg-primary/20"
                        : "border-l-transparent text-muted-foreground"
                    }`}
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Security
                  </Button>
                  <Separator className="bg-border" />
                  <Button
                    variant="ghost"
                    className="justify-start rounded-none px-6 py-3 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "profile" && (
            <Card>
              <CardHeader className="border-b border-border">
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your account details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="w-full">
                    <TabsTrigger value="personal">Personal Info</TabsTrigger>
                    <TabsTrigger value="address">Addresses</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  </TabsList>

                  <TabsContent value="personal" className="mt-6">
                    <form className="space-y-6">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue={user.firstName} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue={user.lastName} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          defaultValue={user.email}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          defaultValue={user.phone}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="birthday">Date of Birth</Label>
                        <Input id="birthday" type="date" />
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Changes</Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="address" className="mt-6">
                    <div className="mb-6 grid gap-4 sm:grid-cols-2">
                      <Card>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                              Home Address
                            </CardTitle>
                            <Badge>Default</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-4 pt-2">
                          <p className="font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            123 Luxury Lane
                          </p>
                          <p className="text-sm text-muted-foreground">
                            New York, NY 10001
                          </p>
                          <p className="text-sm text-muted-foreground">
                            United States
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {user.phone}
                          </p>

                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">
                            Office Address
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4 pt-2">
                          <p className="font-medium">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            456 Business Plaza, Suite 200
                          </p>
                          <p className="text-sm text-muted-foreground">
                            New York, NY 10022
                          </p>
                          <p className="text-sm text-muted-foreground">
                            United States
                          </p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            {user.phone}
                          </p>

                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add New Address
                    </Button>
                  </TabsContent>

                  <TabsContent value="preferences" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="mb-4 font-medium">
                          Communication Preferences
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between rounded-md border border-border bg-card p-3">
                            <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">
                                  Email Notifications
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Receive emails about your orders and account
                                  activity
                                </p>
                              </div>
                            </div>
                            <Switch checked={true} />
                          </div>

                          <div className="flex items-center justify-between rounded-md border border-border bg-card p-3">
                            <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">Marketing Emails</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive emails about new products, offers, and
                                  events
                                </p>
                              </div>
                            </div>
                            <Switch checked={false} />
                          </div>

                          <div className="flex items-center justify-between rounded-md border border-border bg-card p-3">
                            <div className="flex items-center gap-3">
                              <Bell className="h-5 w-5 text-muted-foreground" />
                              <div>
                                <p className="font-medium">SMS Notifications</p>
                                <p className="text-sm text-muted-foreground">
                                  Receive text messages about your orders and
                                  account activity
                                </p>
                              </div>
                            </div>
                            <Switch checked={true} />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-4 font-medium">
                          Currency & Language
                        </h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="currency">Currency</Label>
                            <Select defaultValue="usd">
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="usd">USD ($)</SelectItem>
                                <SelectItem value="eur">EUR (€)</SelectItem>
                                <SelectItem value="gbp">GBP (£)</SelectItem>
                                <SelectItem value="jpy">JPY (¥)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="language">Language</Label>
                            <Select defaultValue="en">
                              <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                                <SelectItem value="de">German</SelectItem>
                                <SelectItem value="ja">Japanese</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button>Save Preferences</Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {activeTab === "orders" && (
            <Card>
              <CardHeader className="border-b border-border">
                <CardTitle>Order History</CardTitle>
                <CardDescription>View and track your orders</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {user.orders && user.orders.length > 0 ? (
                  <div className="space-y-6">
                    {user.orders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardHeader className="border-b border-border p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Order #{order.id}
                              </p>
                              <p className="font-medium">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">
                                ${order.total.toLocaleString()}
                              </p>
                              <Badge
                                className={
                                  order.status === "Delivered"
                                    ? "bg-green-900/20 text-green-500"
                                    : order.status === "Shipped"
                                    ? "bg-blue-900/20 text-blue-500"
                                    : "bg-primary/20 text-primary"
                                }
                              >
                                {order.status}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {order.items.map((item) => (
                              <div
                                key={item.id}
                                className="flex items-center gap-4"
                              >
                                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-background">
                                  <Image
                                    src={
                                      item.image ||
                                      "https://picsum.photos/1280/720?height=80&width=80"
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
                                    Qty: {item.quantity}
                                  </p>
                                </div>
                                <p className="font-medium">
                                  ${item.price.toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="mt-4 flex flex-wrap justify-between gap-4 border-t border-card pt-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Truck className="h-4 w-4" />
                              <span>Delivered on May 15, 2023</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                Track Order
                              </Button>
                              <Button variant="outline" size="sm">
                                View Invoice
                              </Button>
                              <Button variant="outline" size="sm">
                                Buy Again
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingBag className="mb-4 h-12 w-12 text-card" />
                    <h3 className="mb-2 text-xl font-medium">No Orders Yet</h3>
                    <p className="mb-6 max-w-md text-muted-foreground">
                      You haven't placed any orders yet. Browse our collection
                      to find your perfect timepiece.
                    </p>
                    <Button asChild className="bg-amber-700 hover:bg-amber-800">
                      <Link href="/products">Browse Collection</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "wishlist" && (
            <Card>
              <CardHeader className="border-b border-zinc-800">
                <CardTitle>My Wishlist</CardTitle>
                <CardDescription>
                  Products you've saved for later
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {user.wishlist && user.wishlist.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                    {user.wishlist.map((item) => (
                      <Card
                        key={item.id}
                        className="overflow-hidden border-zinc-800 bg-zinc-900"
                      >
                        <div className="relative aspect-square overflow-hidden bg-zinc-950">
                          <Image
                            src={
                              item.image ||
                              "https://picsum.photos/1280/720?height=300&width=300"
                            }
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-2 h-8 w-8 rounded-full bg-zinc-900/80 text-white backdrop-blur-sm hover:bg-zinc-800 hover:text-red-500"
                          >
                            <Heart className="h-4 w-4 fill-current" />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="mb-1 font-medium">{item.name}</h3>
                          <p className="mb-3 text-amber-500">
                            ${item.price.toLocaleString()}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              className="flex-1 bg-amber-700 hover:bg-amber-800"
                              size="sm"
                            >
                              Add to Cart
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:bg-red-950 hover:text-red-400"
                            >
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Heart className="mb-4 h-12 w-12 text-zinc-600" />
                    <h3 className="mb-2 text-xl font-medium">
                      Your Wishlist is Empty
                    </h3>
                    <p className="mb-6 max-w-md text-muted-foreground">
                      You haven't added any items to your wishlist yet. Browse
                      our collection to find your perfect timepiece.
                    </p>
                    <Button asChild className="bg-amber-700 hover:bg-amber-800">
                      <Link href="/products">Browse Collection</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "appointments" && (
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader className="border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Appointments</CardTitle>
                    <CardDescription>
                      Schedule a visit to our boutique
                    </CardDescription>
                  </div>
                  <Button className="bg-amber-700 hover:bg-amber-800">
                    Schedule New Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                {user.appointments && user.appointments.length > 0 ? (
                  <div className="space-y-4">
                    {user.appointments.map((appointment) => (
                      <Card
                        key={appointment.id}
                        className="overflow-hidden border-zinc-800 bg-zinc-900"
                      >
                        <CardContent className="p-4">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-900/20">
                                <Clock className="h-6 w-6 text-amber-500" />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  {appointment.date} at {appointment.time}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.location}
                                </p>
                                <p className="mt-1 text-sm text-muted-foreground">
                                  Consultation with Watch Specialist
                                </p>
                              </div>
                            </div>
                            <Badge
                              className={
                                appointment.status === "Confirmed"
                                  ? "bg-green-900/20 text-green-500"
                                  : appointment.status === "Pending"
                                  ? "bg-amber-900/20 text-amber-500"
                                  : "bg-red-900/20 text-red-500"
                              }
                            >
                              {appointment.status}
                            </Badge>
                          </div>
                          <div className="mt-4 flex flex-wrap justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:bg-red-950 hover:text-red-400"
                            >
                              Cancel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Clock className="mb-4 h-12 w-12 text-zinc-600" />
                    <h3 className="mb-2 text-xl font-medium">
                      No Appointments Scheduled
                    </h3>
                    <p className="mb-6 max-w-md text-muted-foreground">
                      You don't have any scheduled appointments. Book a personal
                      appointment with our watch specialists for a personalized
                      shopping experience.
                    </p>
                    <Button className="bg-amber-700 hover:bg-amber-800">
                      Schedule Appointment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === "payment" && (
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader className="border-b border-zinc-800">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage your payment methods
                    </CardDescription>
                  </div>
                  <Button className="bg-amber-700 hover:bg-amber-800">
                    Add Payment Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Card className="overflow-hidden border-zinc-800 bg-zinc-900">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-950">
                            <CreditCard className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-medium">Visa ending in 4242</h3>
                            <p className="text-sm text-muted-foreground">
                              Expires 12/25
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-amber-900/20 text-amber-500">
                          Default
                        </Badge>
                      </div>
                      <div className="mt-4 flex flex-wrap justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-950 hover:text-red-400"
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="overflow-hidden border-zinc-800 bg-zinc-900">
                    <CardContent className="p-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-zinc-950">
                            <svg
                              className="h-6 w-6 text-muted-foreground"
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
                          </div>
                          <div>
                            <h3 className="font-medium">PayPal</h3>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-950 hover:text-red-400"
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card className="border-zinc-800 bg-zinc-950">
              <CardHeader className="border-b border-zinc-800">
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-4 font-medium">Change Password</h3>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          className="border-zinc-800 bg-zinc-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          className="border-zinc-800 bg-zinc-900"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          className="border-zinc-800 bg-zinc-900"
                        />
                      </div>
                      <div className="flex justify-end">
                        <Button className="bg-amber-700 hover:bg-amber-800">
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div>
                    <h3 className="mb-4 font-medium">
                      Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900 p-4">
                      <div>
                        <p className="font-medium">
                          Enhance your account security
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Two-factor authentication adds an extra layer of
                          security to your account by requiring more than just a
                          password to sign in.
                        </p>
                      </div>
                      <Button variant="outline">Enable</Button>
                    </div>
                  </div>

                  <Separator className="bg-zinc-800" />

                  <div>
                    <h3 className="mb-4 font-medium">Login Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            New York, United States • Chrome on Windows
                          </p>
                          <p className="text-xs text-zinc-500">
                            Started 2 hours ago
                          </p>
                        </div>
                        <Badge className="bg-green-900/20 text-green-500">
                          Active
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between rounded-md border border-zinc-800 bg-zinc-900 p-3">
                        <div>
                          <p className="font-medium">Previous Session</p>
                          <p className="text-sm text-muted-foreground">
                            New York, United States • Safari on iPhone
                          </p>
                          <p className="text-xs text-zinc-500">3 days ago</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:bg-red-950 hover:text-red-400"
                        >
                          Revoke
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
