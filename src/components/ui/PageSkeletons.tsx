import { Skeleton } from "@/components/ui/Skeleton";

export function BookingPageSkeleton() {
  return (
    <div className="wrap py-12" aria-busy="true" aria-label="Loading booking">
      <Skeleton className="h-12 w-2/3 max-w-md sm:h-14" />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-4">
          <Skeleton className="h-10 w-full max-w-lg" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-12 w-40" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}

export function CarDetailSkeleton() {
  return (
    <div className="wrap py-8 pb-28 lg:pb-12" aria-busy="true" aria-label="Loading car details">
      <Skeleton className="mb-6 h-4 w-48" />
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div className="space-y-6">
          <Skeleton className="aspect-[16/10] w-full" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-12 w-4/5 max-w-xl" />
          <Skeleton className="h-20 w-full max-w-2xl" />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 5 }, (_, i) => (
              <Skeleton key={i} className="h-16" />
            ))}
          </div>
        </div>
        <Skeleton className="hidden h-56 w-full lg:block" />
      </div>
    </div>
  );
}

export function DefaultPageSkeleton() {
  return (
    <div className="wrap grid gap-4 py-16" aria-busy="true" aria-label="Loading">
      <Skeleton className="h-12 w-2/3" />
      <Skeleton className="h-5 w-1/2" />
      <Skeleton className="mt-6 h-64 w-full" />
    </div>
  );
}
