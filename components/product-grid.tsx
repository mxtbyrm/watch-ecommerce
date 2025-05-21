import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag, Eye } from "lucide-react";

export default async function ProductGrid() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-secondary hover:shadow-lg hover:shadow-shadow/10"
        >
          <Link href={`/products/${product.id}`} className="block">
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <Image
                src={
                  product.image ||
                  `https://picsum.photos/1280/720?random=${product.id}`
                }
                alt={product.name}
                fill
                className="product-image object-cover"
              />
              {product.new && (
                <Badge className="absolute left-4 top-4 bg-primary hover:bg-primary/80">
                  New
                </Badge>
              )}

              {/* Quick action buttons that appear on hover */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex gap-2 rounded-full bg-card/90 p-1 backdrop-blur-sm">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-full text-primary/80 hover:bg-secondary hover:text-primary"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-full text-primary/80 hover:bg-secondary hover:text-primary"
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-9 w-9 rounded-full text-primary/80 hover:bg-secondary hover:text-primary"
                  >
                    <Eye className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-1 text-sm font-medium text-muted-foreground">
                {product.brand}
              </div>
              <h3 className="mb-2 font-medium leading-tight">{product.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-lg text-primary font-bold">
                  ${product.price.toLocaleString()}
                </p>
                <div className="text-sm text-muted-foreground">
                  {product.movement}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
