import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Award, Shield, Users } from "lucide-react";

export const metadata = {
  title: "About Us | Chrono Luxe",
  description:
    "Learn about our heritage, craftsmanship, and commitment to excellence",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="https://picsum.photos/1280/720?height=1080&width=1920"
          alt="Watchmaking heritage"
          fill
          priority
          className="object-cover "
        />
        <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-4xl font-bold text-foreground tracking-tight sm:text-5xl md:text-6xl">
            Our Heritage
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/80 sm:text-xl">
            A legacy of excellence in luxury timepieces since 1875
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 1875 by master watchmaker Henri Chrono in the heart
                of Switzerland, Chrono Luxe has been at the forefront of
                horological innovation for nearly 150 years.
              </p>
              <p>
                What began as a small workshop in the Jura Mountains has evolved
                into one of the world's most prestigious watch retailers, while
                maintaining our commitment to craftsmanship, precision, and
                timeless elegance.
              </p>
              <p>
                Today, Chrono Luxe represents the pinnacle of luxury watch
                retail, curating collections from the world's most prestigious
                watchmakers while offering unparalleled expertise and service to
                our discerning clientele.
              </p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="https://picsum.photos/1280/720?height=800&width=800"
              alt="Chrono Luxe heritage"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Our Values
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <Clock className="h-8 w-8" />
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium">
                  Precision
                </h3>
                <p className="text-muted-foreground">
                  We value accuracy and attention to detail in every timepiece
                  we offer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <Award className="h-8 w-8 " />
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium">
                  Excellence
                </h3>
                <p className="text-muted-foreground">
                  We strive for excellence in our products, service, and
                  customer experience.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <Shield className="h-8 w-8 " />
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium">
                  Authenticity
                </h3>
                <p className="text-muted-foreground">
                  We guarantee the authenticity and provenance of every
                  timepiece in our collection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                  <Users className="h-8 w-8 " />
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium">Service</h3>
                <p className="text-muted-foreground">
                  We provide exceptional personalized service to each and every
                  client.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="container mx-auto px-4">
        <h2 className="mb-12 text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Meet Our Team
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="text-center">
            <div className="relative mx-auto mb-4 aspect-square w-full max-w-xs overflow-hidden rounded-lg">
              <Image
                src="https://picsum.photos/1280/720?height=400&width=400"
                alt="CEO portrait"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mb-1 font-serif text-xl font-medium">
              James Laurent
            </h3>
            <p className="mb-3 text-primary">Chief Executive Officer</p>
            <p className="mx-auto max-w-sm text-muted-foreground">
              With over 25 years in the luxury watch industry, James brings
              unparalleled expertise and vision to Chrono Luxe.
            </p>
          </div>

          <div className="text-center">
            <div className="relative mx-auto mb-4 aspect-square w-full max-w-xs overflow-hidden rounded-lg">
              <Image
                src="https://picsum.photos/1280/720?height=400&width=400"
                alt="Head Watchmaker portrait"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mb-1 font-serif text-xl font-medium">
              Sophie Dubois
            </h3>
            <p className="mb-3 text-primary">Head Watchmaker</p>
            <p className="mx-auto max-w-sm text-muted-foreground">
              A master watchmaker trained in Switzerland, Sophie oversees our
              service department and ensures the highest standards of
              craftsmanship.
            </p>
          </div>

          <div className="text-center">
            <div className="relative mx-auto mb-4 aspect-square w-full max-w-xs overflow-hidden rounded-lg">
              <Image
                src="https://picsum.photos/1280/720?height=400&width=400"
                alt="Creative Director portrait"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mb-1 font-serif text-xl font-medium">Marcus Chen</h3>
            <p className="mb-3 text-primary">Creative Director</p>
            <p className="mx-auto max-w-sm text-muted-foreground">
              With a background in luxury fashion and design, Marcus brings a
              contemporary aesthetic to our brand while honoring our heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="https://picsum.photos/1280/720?height=720&width=1280"
                alt="Watch craftsmanship"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                The Art of Watchmaking
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  At Chrono Luxe, we celebrate the centuries-old tradition of
                  fine watchmaking. Each timepiece in our collection represents
                  countless hours of meticulous craftsmanship and precision
                  engineering.
                </p>
                <p>
                  Our in-house watchmakers are trained in both traditional
                  techniques and cutting-edge technology, allowing us to service
                  and maintain even the most complex timepieces with expert
                  care.
                </p>
                <p>
                  We believe that a fine watch is more than just a timekeeping
                  device—it's a work of art, an heirloom to be passed down
                  through generations, and a testament to human ingenuity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 text-center">
        <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Experience Chrono Luxe
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Visit one of our boutiques for a personalized consultation with our
          watch specialists, or explore our curated collection online.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild className="bg-primary">
            <Link href="/products">Explore Collection</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
