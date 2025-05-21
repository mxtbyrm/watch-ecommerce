import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsLoading() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="aspect-square rounded-lg" />
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-6 w-1/4" />
        </div>
      ))}
    </div>
  );
}
