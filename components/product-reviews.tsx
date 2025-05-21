import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getProductReviews } from "@/lib/products";
import { Star } from "lucide-react";

export default async function ProductReviews({
  productId,
}: {
  productId: string;
}) {
  const reviews = await getProductReviews(productId);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-400">This product has no reviews yet.</p>
        <Button className="mt-4">Write a Review</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Customer Reviews</h3>
          <div className="mt-1 flex items-center">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5"
                  fill={
                    star <=
                    Math.round(
                      reviews.reduce((acc, review) => acc + review.rating, 0) /
                        reviews.length
                    )
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-muted-foreground">
              Based on {reviews.length} reviews
            </span>
          </div>
        </div>
        <Button>Write a Review</Button>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-border pb-6 last:border-0"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={review.avatar || "https://picsum.photos/1280/720"}
                    alt={review.name}
                  />
                  <AvatarFallback>
                    {review.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4"
                    fill={star <= review.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>
            <h4 className="mb-2 font-medium">{review.title}</h4>
            <p className="text-muted-foreground">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
