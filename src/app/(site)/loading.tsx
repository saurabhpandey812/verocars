import { Skeleton } from "@/components/ui/Skeleton";
export default function Loading() {
  return <div className="wrap grid gap-4 py-16"><Skeleton className="h-12 w-2/3" /><Skeleton className="h-5 w-1/2" /><Skeleton className="mt-6 h-64 w-full" /></div>;
}
