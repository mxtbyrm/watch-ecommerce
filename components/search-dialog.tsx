"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, X, Clock, ArrowRight, Sparkles, Tag } from "lucide-react";

// Mock data for search results
const recentSearches = [
  "Rolex Submariner",
  "Patek Philippe",
  "Audemars Piguet Royal Oak",
  "Omega Seamaster",
];

const popularSearches = [
  "Rolex Daytona",
  "Patek Philippe Nautilus",
  "Audemars Piguet Royal Oak",
  "Omega Speedmaster",
  "Cartier Santos",
];

const mockSearchResults = [
  {
    id: "1",
    name: "Submariner Date",
    brand: "Rolex",
    price: 14000,
    image: "https://picsum.photos/1280/720?height=80&width=80",
    category: "Diving Watches",
  },
  {
    id: "2",
    name: "Royal Oak",
    brand: "Audemars Piguet",
    price: 32000,
    image: "https://picsum.photos/1280/720?height=80&width=80",
    category: "Luxury Sports Watches",
  },
  {
    id: "3",
    name: "Nautilus",
    brand: "Patek Philippe",
    price: 35000,
    image: "https://picsum.photos/1280/720?height=80&width=80",
    category: "Luxury Sports Watches",
  },
  {
    id: "4",
    name: "Seamaster Diver 300M",
    brand: "Omega",
    price: 5200,
    image: "https://picsum.photos/1280/720?height=80&width=80",
    category: "Diving Watches",
  },
];

const mockCategories = [
  { name: "Diving Watches", count: 24 },
  { name: "Dress Watches", count: 18 },
  { name: "Chronographs", count: 32 },
  { name: "Sports Watches", count: 27 },
];

const mockBrands = [
  { name: "Rolex", count: 42 },
  { name: "Omega", count: 38 },
  { name: "Patek Philippe", count: 21 },
  { name: "Audemars Piguet", count: 16 },
];

export default function SearchDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockSearchResults>(
    []
  );
  const [isSearching, setIsSearching] = useState(false);

  // Handle search input changes
  useEffect(() => {
    if (searchQuery.length > 1) {
      setIsSearching(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        // Filter mock results based on search query
        const filteredResults = mockSearchResults.filter(
          (item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredResults);
        setIsSearching(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle pressing Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // Handle clicking on a search result
  const handleResultClick = (id: string) => {
    setOpen(false);
    router.push(`/products/${id}`);
  };

  // Handle clicking on a recent or popular search
  const handleSearchTermClick = (term: string) => {
    setSearchQuery(term);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className=" text-muted-foreground hover:text-primary"
        >
          <Search className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] md:max-w-[800px] p-0 gap-0">
        <div className="flex items-center border-b border-border p-4">
          <Search className="mr-2 h-5 w-5 flex-shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search for luxury watches, brands, or collections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="flex-shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="max-h-[70vh]">
          {searchQuery.length > 1 ? (
            <ScrollArea className="max-h-[70vh] p-4">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-primary" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-muted-foreground">
                      Search Results
                    </h3>
                    <Button variant="link" size="sm" onClick={handleSearch}>
                      View All Results
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center gap-3 rounded-md p-2 transition-colors hover:card cursor-pointer"
                        onClick={() => handleResultClick(result.id)}
                      >
                        <div className="relative h-16 w-16 overflow-hidden rounded-md bg-card">
                          <Image
                            src={
                              result.image || "https://picsum.photos/1280/720"
                            }
                            alt={result.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{result.name}</h4>
                          <p className="text-sm text-primary">{result.brand}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge
                              variant="outline"
                              className="text-xs bg-card"
                            >
                              {result.category}
                            </Badge>
                            <span className="text-sm font-medium">
                              ${result.price.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    No results found for "{searchQuery}"
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">
                    Try checking your spelling or use more general terms
                  </p>
                </div>
              )}
            </ScrollArea>
          ) : (
            <Tabs defaultValue="recent" className="p-4">
              <TabsList className="w-full">
                <TabsTrigger value="recent">
                  <Clock className="mr-2 h-4 w-4" />
                  Recent
                </TabsTrigger>
                <TabsTrigger value="popular">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="browse">
                  <Tag className="mr-2 h-4 w-4" />
                  Browse
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recent" className="mt-4 space-y-4">
                {recentSearches.length > 0 ? (
                  <div className="space-y-2">
                    {recentSearches.map((term, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-card cursor-pointer"
                        onClick={() => handleSearchTermClick(term)}
                      >
                        <div className="flex items-center">
                          <Clock className="mr-3 h-4 w-4 text-muted-foreground" />
                          <span>{term}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-muted-foreground">No recent searches</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="popular" className="mt-4 space-y-4">
                <div className="space-y-2">
                  {popularSearches.map((term, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-card cursor-pointer"
                      onClick={() => handleSearchTermClick(term)}
                    >
                      <div className="flex items-center">
                        <Sparkles className="mr-3 h-4 w-4 text-primary" />
                        <span>{term}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="browse" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 font-medium">Categories</h3>
                    <div className="space-y-2">
                      {mockCategories.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-card cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/products?category=${encodeURIComponent(
                                category.name
                              )}`
                            )
                          }
                        >
                          <span>{category.name}</span>
                          <Badge variant="outline" className="bg-card">
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3 font-medium">Brands</h3>
                    <div className="space-y-2">
                      {mockBrands.map((brand, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md p-2 transition-colors hover:bg-card cursor-pointer"
                          onClick={() =>
                            router.push(
                              `/products?brand=${encodeURIComponent(
                                brand.name
                              )}`
                            )
                          }
                        >
                          <span>{brand.name}</span>
                          <Badge variant="outline" className="bg-card">
                            {brand.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
