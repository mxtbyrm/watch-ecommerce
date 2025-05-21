import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts } from "@/lib/products";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="group overflow-hidden rounded-lg border border-border bg-card transition-all"
        >
          <Link href={`/products/${product.id}`} className="block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={
                  product.image ||
                  "https://picsum.photos/1280/720?height=600&width=600"
                }
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {product.new && (
                <span className="absolute left-4 top-4 rounded-full bg-primary text-white px-2 py-1 text-xs font-medium">
                  New
                </span>
              )}
            </div>
            <div className="p-4">
              <h3 className="mb-1 font-medium">{product.name}</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                {product.brand}
              </p>
              <p className="text-lg font-bold text-primary">
                ${product.price.toLocaleString()}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
