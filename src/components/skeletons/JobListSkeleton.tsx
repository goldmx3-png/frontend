import { JobCardSkeleton } from "./JobCardSkeleton";
import { JobFiltersSkeleton } from "./JobFiltersSkeleton";

interface JobListSkeletonProps {
  showFilters?: boolean;
  cardCount?: number;
}

export function JobListSkeleton({ showFilters = true, cardCount = 5 }: JobListSkeletonProps) {
  return (
    <div>
      {showFilters && <JobFiltersSkeleton />}
      <div className="p-4 space-y-4">
        {Array.from({ length: cardCount }).map((_, index) => (
          <JobCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}