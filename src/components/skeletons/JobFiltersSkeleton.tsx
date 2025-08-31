import { Skeleton } from "@/components/ui/skeleton";

export function JobFiltersSkeleton() {
  return (
    <div className="space-y-4 p-4 bg-card border-b border-border">
      {/* Search Bar Skeleton */}
      <div className="relative">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>

      {/* Available Filters Skeleton */}
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-26 rounded-full" />
        <Skeleton className="h-6 w-22 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded" />
      </div>
    </div>
  );
}