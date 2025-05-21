import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us | Chrono Luxe",
  description: "Get in touch with our team of watch specialists",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
        Contact Us
      </h1>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and our team will get back to you as
                soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} required />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-amber-700 hover:bg-amber-800"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Boutiques</CardTitle>
              <CardDescription>
                Visit one of our luxury boutiques for a personalized experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="mb-2 font-medium">New York Flagship</h3>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p>
                    123 Fifth Avenue
                    <br />
                    New York, NY 10010
                    <br />
                    United States
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p>+1 (212) 555-1234</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">London Boutique</h3>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p>
                    45 Bond Street
                    <br />
                    London, W1S 2SF
                    <br />
                    United Kingdom
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p>+44 (0) 20 7123 4567</p>
                </div>
              </div>

              <div>
                <h3 className="mb-2 font-medium">Paris Boutique</h3>
                <div className="flex items-start gap-3 text-gray-300">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p>
                    8 Place Vendôme
                    <br />
                    75001 Paris
                    <br />
                    France
                  </p>
                </div>
                <div className="mt-2 flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 flex-shrink-0 text-amber-500" />
                  <p>+33 (0) 1 42 60 12 34</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-gray-300">info@chronoluxe.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-gray-300">+1 (800) 555-9876</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-gray-300">Monday - Saturday: 10am - 7pm</p>
                  <p className="text-gray-300">Sunday: 12pm - 5pm</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
