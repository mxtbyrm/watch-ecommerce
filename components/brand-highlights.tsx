import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const brands = [
  {
    id: "rolex",
    name: "Rolex",
    logo: "https://picsum.photos/1280/720?height=100&width=200",
    description: "The epitome of luxury and precision",
  },
  {
    id: "patek-philippe",
    name: "Patek Philippe",
    logo: "https://picsum.photos/1280/720?height=100&width=200",
    description: "Timeless elegance and exceptional craftsmanship",
  },
  {
    id: "audemars-piguet",
    name: "Audemars Piguet",
    logo: "https://picsum.photos/1280/720?height=100&width=200",
    description: "Bold innovation and technical excellence",
  },
  {
    id: "omega",
    name: "Omega",
    logo: "https://picsum.photos/1280/720?height=100&width=200",
    description: "Pioneering spirit and iconic designs",
  },
];

export default function BrandHighlights() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {brands.map((brand) => (
        <div
          key={brand.id}
          className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
        >
          <div className="flex h-32 items-center justify-center border-b border-border bg-secondary p-6">
            <Image
              src={brand.logo || "https://picsum.photos/1280/720"}
              alt={brand.name}
              width={150}
              height={75}
              className="max-h-16 w-auto object-contain"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h3 className="mb-2 font-serif text-xl font-medium">
                {brand.name}
              </h3>
              <p className="mb-4 text-muted-foreground">{brand.description}</p>
            </div>
            <Button asChild variant="outline">
              <Link href={`/products?brand=${brand.id}`}>
                Explore Collection
              </Link>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
