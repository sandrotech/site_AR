"use client"

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-8 bg-muted rounded w-full" />
      </div>
    </div>
  )
}

export function SkeletonBanner() {
  return (
    <div className="w-full h-48 md:h-64 lg:h-80 bg-muted animate-pulse rounded-lg" />
  )
}

export function SkeletonText({ width = "full" }: { width?: string }) {
  return (
    <div className={`h-4 bg-muted rounded animate-pulse w-${width}`} />
  )
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <SkeletonBanner />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
