import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import FeaturedProducts from "@/components/featured-products";
import BrandHighlights from "@/components/brand-highlights";
import Newsletter from "@/components/newsletter";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src="https://picsum.photos/1280/720"
          alt="Luxury watch hero image"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex bg-background/60 backdrop-blur-sm flex-col items-center justify-center px-4 text-center">
          <h1 className="font-serif text-foreground text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Timeless Elegance
          </h1>
          <p className="mt-6 max-w-2xl text-foreground/80 text-lg sm:text-xl">
            Discover our curated collection of the world's finest timepieces,
            crafted with precision and elegance.
          </p>
          <div className="mt-10 flex gap-4">
            <Button asChild size="lg">
              <Link href="/products">Explore Collection</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/about">Our Heritage</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Featured Timepieces
        </h2>
        <FeaturedProducts />
      </section>

      {/* Brand Story */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
                Craftsmanship & Heritage
              </h2>
              <p className="mb-6 text-muted-foreground">
                For over a century, we have been dedicated to the art of
                watchmaking, combining traditional craftsmanship with innovative
                technology to create timepieces of exceptional quality and
                precision.
              </p>
              <Button asChild className="w-fit">
                <Link href="/about">Discover Our Story</Link>
              </Button>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="https://picsum.photos/1280/720?height=800&width=800"
                alt="Watchmaking craftsmanship"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Highlights */}
      <section className="container mx-auto px-4">
        <h2 className="mb-8 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Prestigious Brands
        </h2>
        <BrandHighlights />
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}
