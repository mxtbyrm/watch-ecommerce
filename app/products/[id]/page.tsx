import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AddToCartButton from "@/components/add-to-cart-button";
import ProductImageGallery from "@/components/product-image-gallery";
import RelatedProducts from "@/components/related-products";
import ProductReviews from "@/components/product-reviews";
import { getProductById } from "@/lib/products";
import { Clock, Shield, Truck, Award } from "lucide-react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    return {
      title: "Product Not Found | Chrono Luxe",
    };
  }

  return {
    title: `${product.name} | Chrono Luxe`,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-16 grid gap-8 md:grid-cols-2 lg:gap-12">
        {/* Product Images */}
        <div>
          <ProductImageGallery images={product.images} />
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="outline" className="bg-background text-primary">
              {product.brand}
            </Badge>
            {product.new && <Badge className="bg-primary">New</Badge>}
          </div>

          <h1 className="mb-2 font-serif text-3xl font-bold">{product.name}</h1>
          <p className="mb-6 text-2xl font-bold text-primary">
            ${product.price.toLocaleString()}
          </p>

          <div className="mb-6">
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <Separator className="mb-6 bg-border" />

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                Movement
              </h3>
              <p className="font-medium">{product.movement}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                Case Material
              </h3>
              <p className="font-medium">{product.caseMaterial}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                Water Resistance
              </h3>
              <p className="font-medium">{product.waterResistance}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-3">
              <h3 className="mb-1 text-sm font-medium text-muted-foreground">
                Warranty
              </h3>
              <p className="font-medium">5 Years International</p>
            </div>
          </div>

          <AddToCartButton product={product} />

          <Separator className="my-6 bg-zinc-800" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  On orders over $10,000
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Authenticity Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  100% authentic products
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">30-Day Returns</h3>
                <p className="text-sm text-muted-foreground">On unworn items</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">5-Year Warranty</h3>
                <p className="text-sm text-muted-foreground">
                  International coverage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <Tabs defaultValue="details" className="mb-16">
        <TabsList className="w-full">
          <TabsTrigger value="details">Details & Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="delivery">Delivery & Returns</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 animate-fade-in">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-serif text-xl font-medium">
                Technical Specifications
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between rounded-md border border-border bg-card p-3">
                  <span className="text-muted-foreground">Case Diameter</span>
                  <span className="font-medium">
                    {product.specifications?.caseDiameter}
                  </span>
                </li>
                <li className="flex justify-between rounded-md border border-border bg-card p-3">
                  <span className="text-muted-foreground">Case Thickness</span>
                  <span className="font-medium">
                    {product.specifications?.caseThickness}
                  </span>
                </li>
                <li className="flex justify-between rounded-md border border-border bg-card p-3">
                  <span className="text-muted-foreground">Band Material</span>
                  <span className="font-medium">
                    {product.specifications?.bandMaterial}
                  </span>
                </li>
                <li className="flex justify-between rounded-md border border-border bg-card p-3">
                  <span className="text-muted-foreground">Movement Type</span>
                  <span className="font-medium">
                    {product.specifications?.movementType}
                  </span>
                </li>
                <li className="flex justify-between rounded-md border border-border bg-card p-3">
                  <span className="text-muted-foreground">Power Reserve</span>
                  <span className="font-medium">
                    {product.specifications?.powerReserve}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 font-serif text-xl font-medium">Features</h3>
              <ul className="space-y-3">
                {product.features?.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 rounded-md border border-border bg-card p-3"
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                      <Award className="h-3 w-3 text-primary" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6 animate-fade-in">
          <Suspense
            fallback={
              <div className="py-8 text-center text-muted-foreground">
                Loading reviews...
              </div>
            }
          >
            <ProductReviews productId={params.id} />
          </Suspense>
        </TabsContent>

        <TabsContent value="delivery" className="mt-6 animate-fade-in">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 font-serif text-xl font-medium">
                Shipping Information
              </h3>
              <div className="space-y-4 rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Standard Shipping</h4>
                    <p className="text-sm text-muted-foreground">
                      Free on orders over $10,000
                    </p>
                    <p className="text-sm text-muted-foreground">
                      3-5 business days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Express Shipping</h4>
                    <p className="text-sm text-muted-foreground">$50</p>
                    <p className="text-sm text-muted-foreground">
                      1-2 business days
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Secure Delivery</h4>
                    <p className="text-sm text-muted-foreground">
                      All packages are insured and require signature upon
                      delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-serif text-xl font-medium">
                Returns & Warranty
              </h3>
              <div className="space-y-4 rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">30-Day Returns</h4>
                    <p className="text-sm text-muted-foreground">
                      Return unworn items within 30 days for a full refund
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">5-Year Warranty</h4>
                    <p className="text-sm text-muted-foreground">
                      All watches come with a 5-year international warranty
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Authenticity Guarantee</h4>
                    <p className="text-sm text-muted-foreground">
                      All watches are certified authentic with documentation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <section>
        <h2 className="mb-8 font-serif text-2xl font-bold">
          You May Also Like
        </h2>
        <Suspense
          fallback={
            <div className="py-8 text-center text-muted-foreground">
              Loading related products...
            </div>
          }
        >
          <RelatedProducts currentProductId={params.id} />
        </Suspense>
      </section>
    </div>
  );
}
