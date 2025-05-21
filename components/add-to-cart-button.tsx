"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart-context";
import { ShoppingBag, Heart, Minus, Plus, Check, Share2 } from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AddToCartButtonProps {
  product: any;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.images?.[0] || product.image,
      quantity,
    });

    setIsAdded(true);

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);

    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${
        isWishlisted ? "removed from" : "added to"
      } your wishlist.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this ${product.name} on Chrono Luxe`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-md border border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="h-11 w-11 rounded-r-none border-r border-border"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number.parseInt(e.target.value) || 1)}
            className="h-11 w-16 rounded-none border-0 text-center outer"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
            className="h-11 w-11 rounded-l-none border-l border-border"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleToggleWishlist}
                variant="outline"
                size="icon"
                className={`h-11 w-11 ${
                  isWishlisted
                    ? "text-destructive hover:text-destructive"
                    : "hover:text-destructive"
                }`}
              >
                <Heart
                  className="h-5 w-5"
                  fill={isWishlisted ? "currentColor" : "none"}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isWishlisted ? "Remove from wishlist" : "Add to wishlist"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleShare}
                variant="outline"
                size="icon"
                className="h-11 w-11"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share product</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Button
        onClick={handleAddToCart}
        className="group relative w-full overflow-hidden py-6 text-lg font-medium"
        disabled={isAdded}
      >
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            isAdded ? "opacity-100" : "opacity-0"
          }`}
        >
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </span>
        <span
          className={`flex items-center justify-center transition-opacity duration-300 ${
            isAdded ? "opacity-0" : "opacity-100"
          }`}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Add to Cart
        </span>
      </Button>
    </div>
  );
}
