import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <Skeleton className="h-8 w-24" />
          </div>
          <Skeleton className="h-10 w-48" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* Privacy Notice Skeleton */}
        <div className="flex items-center space-x-2 mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 w-80" />
          <Skeleton className="w-4 h-4 rounded" />
        </div>

        {/* Tabs Skeleton */}
        <div className="w-full mb-6">
          <div className="grid w-full grid-cols-5 gap-2">
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
            <Skeleton className="h-10 rounded-md" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-6 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="h-4 w-8" />
            </div>
          </div>

          {/* Work Experience Cards Skeleton */}
          {Array.from({ length: 2 }).map((_, index) => (
            <Card key={index} className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Skeleton className="w-3 h-3 rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="w-4 h-4" />
                    </div>
                    <Skeleton className="h-6 w-40 mb-1" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <div className="space-y-2">
                      {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="flex items-start space-x-2">
                          <Skeleton className="w-2 h-2 rounded-full mt-2" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Message Skeleton */}
        <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <Skeleton className="w-5 h-5 rounded" />
            <div className="flex-1">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        {/* Action Items Skeleton */}
        <div className="mt-6 space-y-3">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="w-4 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}