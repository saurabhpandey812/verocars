import { Skeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return (
    <div className="wrap py-12"><Skeleton className="h-14 w-2/3" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-80" />)}</div></div>
  );
}
