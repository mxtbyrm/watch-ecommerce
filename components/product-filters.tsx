"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [displayRange, setDisplayRange] = useState([0, 100000]);
  const [activeFilters, setActiveFilters] = useState<{
    [key: string]: string[];
  }>({
    brand: [],
    movement: [],
    material: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update display range with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayRange(priceRange);
    }, 100);
    return () => clearTimeout(timer);
  }, [priceRange]);

  const brands = [
    { id: "rolex", name: "Rolex" },
    { id: "patek-philippe", name: "Patek Philippe" },
    { id: "audemars-piguet", name: "Audemars Piguet" },
    { id: "omega", name: "Omega" },
    { id: "cartier", name: "Cartier" },
    { id: "iwc", name: "IWC" },
    { id: "jaeger-lecoultre", name: "Jaeger-LeCoultre" },
    { id: "vacheron-constantin", name: "Vacheron Constantin" },
  ];

  const movements = [
    { id: "automatic", name: "Automatic" },
    { id: "manual", name: "Manual" },
    { id: "quartz", name: "Quartz" },
  ];

  const caseMaterials = [
    { id: "steel", name: "Stainless Steel" },
    { id: "gold", name: "Gold" },
    { id: "platinum", name: "Platinum" },
    { id: "titanium", name: "Titanium" },
    { id: "ceramic", name: "Ceramic" },
  ];

  const toggleFilter = (category: string, value: string) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[category].includes(value)) {
        newFilters[category] = newFilters[category].filter(
          (item) => item !== value
        );
      } else {
        newFilters[category] = [...newFilters[category], value];
      }
      return newFilters;
    });
  };

  const handleApplyFilters = () => {
    // Here you would update the URL with the selected filters
    console.log("Price Range:", priceRange);
    console.log("Active Filters:", activeFilters);

    // Close mobile filters if open
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setPriceRange([0, 100000]);
    setDisplayRange([0, 100000]);
    setActiveFilters({
      brand: [],
      movement: [],
      material: [],
    });
  };

  const totalActiveFilters =
    Object.values(activeFilters).flat().length +
    (priceRange[0] > 0 || priceRange[1] < 100000 ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="sticky top-20 z-10 mb-4 flex items-center justify-between bg-card py-2 lg:hidden">
        <h2 className="text-xl font-medium">Products</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {totalActiveFilters > 0 && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 rounded-full p-0 text-center"
            >
              {totalActiveFilters}
            </Badge>
          )}
        </Button>
      </div>

      {/* Filter Sidebar - Desktop always visible, Mobile conditional */}
      <div
        className={`
        space-y-6 rounded-lg border border-border bg-card p-4
        ${
          isFilterOpen
            ? "fixed inset-0 z-50 overflow-auto pt-16"
            : "hidden lg:block"
        }
      `}
      >
        {isFilterOpen && (
          <div className="sticky top-0 z-10 -mt-16 flex items-center justify-between bg-background p-4 pb-2">
            <h2 className="text-xl font-medium">Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFilterOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 text-sm text-destructive hover:bg-red-950 hover:text-red-400"
            disabled={totalActiveFilters === 0}
          >
            <X className="mr-1 h-3 w-3" />
            Clear All
          </Button>
        </div>

        {/* Active Filters */}
        {totalActiveFilters > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">
              Active Filters:
            </h3>
            <div className="flex flex-wrap gap-2">
              {priceRange[0] > 0 || priceRange[1] < 100000 ? (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 bg-secondary"
                >
                  Price: ${displayRange[0].toLocaleString()} - $
                  {displayRange[1].toLocaleString()}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 text-muted-foreground hover:text-white"
                    onClick={() => {
                      setPriceRange([0, 100000]);
                      setDisplayRange([0, 100000]);
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ) : null}

              {Object.entries(activeFilters).map(([category, values]) =>
                values.map((value) => (
                  <Badge
                    key={`${category}-${value}`}
                    variant="outline"
                    className="flex items-center gap-1 bg-secondary"
                  >
                    {value}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 text-muted-foreground hover:text-white"
                      onClick={() => toggleFilter(category, value)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))
              )}
            </div>
          </div>
        )}

        <Accordion
          type="multiple"
          defaultValue={["price", "brand", "movement", "material"]}
          className="space-y-2"
        >
          <AccordionItem value="price" className="border-border">
            <AccordionTrigger className="py-3 text-base hover:no-underline">
              Price Range
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-6">
                <Slider
                  defaultValue={[0, 100000]}
                  min={0}
                  max={100000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="price-slider"
                />
                <div className="flex items-center justify-between">
                  <div className="rounded-md border border-border px-2 py-1 text-sm">
                    ${displayRange[0].toLocaleString()}
                  </div>
                  <div className="rounded-md border border-border px-2 py-1 text-sm">
                    ${displayRange[1].toLocaleString()}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="brand" className="border-border">
            <AccordionTrigger className="py-3 text-base hover:no-underline">
              Brand
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      checked={activeFilters.brand.includes(brand.id)}
                      onCheckedChange={() => toggleFilter("brand", brand.id)}
                      className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-background"
                    />
                    <Label
                      htmlFor={`brand-${brand.id}`}
                      className="flex-1 text-sm font-normal"
                    >
                      {brand.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="movement" className="border-border">
            <AccordionTrigger className="py-3 text-base hover:no-underline">
              Movement Type
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-2">
                {movements.map((movement) => (
                  <div
                    key={movement.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`movement-${movement.id}`}
                      checked={activeFilters.movement.includes(movement.id)}
                      onCheckedChange={() =>
                        toggleFilter("movement", movement.id)
                      }
                      className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-background"
                    />
                    <Label
                      htmlFor={`movement-${movement.id}`}
                      className="flex-1 text-sm font-normal"
                    >
                      {movement.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="material" className="border-border">
            <AccordionTrigger className="py-3 text-base hover:no-underline">
              Case Material
            </AccordionTrigger>
            <AccordionContent className="pt-2">
              <div className="space-y-2">
                {caseMaterials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`material-${material.id}`}
                      checked={activeFilters.material.includes(material.id)}
                      onCheckedChange={() =>
                        toggleFilter("material", material.id)
                      }
                      className="border-border data-[state=checked]:bg-primary data-[state=checked]:text-background"
                    />
                    <Label
                      htmlFor={`material-${material.id}`}
                      className="flex-1 text-sm font-normal"
                    >
                      {material.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Button
          onClick={handleApplyFilters}
          className="w-full bg-primary hover:bg-primary/80"
        >
          Apply Filters
        </Button>

        {isFilterOpen && (
          <div className="pb-4 pt-2 text-center text-sm text-muted-foreground">
            Showing {totalActiveFilters > 0 ? "filtered" : "all"} products
          </div>
        )}
      </div>
    </>
  );
}
