import { Suspense } from "react";
import ProductGrid from "@/components/product-grid";
import ProductFilters from "@/components/product-filters";
import ProductsLoading from "./loading";

export const metadata = {
  title: "Products | Chrono Luxe",
  description: "Browse our exclusive collection of luxury timepieces",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
        Our Collection
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <ProductFilters />
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<ProductsLoading />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
