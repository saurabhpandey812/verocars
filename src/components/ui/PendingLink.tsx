"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useState, useTransition, type ComponentProps, type MouseEvent, type ReactNode } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { BookingPageSkeleton, CarDetailSkeleton, DefaultPageSkeleton } from "@/components/ui/PageSkeletons";

export type PendingVariant = "booking" | "car" | "default";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  variant?: PendingVariant;
  pendingLabel?: ReactNode;
  /** When false, keep children visible and only show the page skeleton overlay. */
  buttonSkeleton?: boolean;
};

function Overlay({ variant }: { variant: PendingVariant }) {
  const body =
    variant === "booking" ? <BookingPageSkeleton /> : variant === "car" ? <CarDetailSkeleton /> : <DefaultPageSkeleton />;
  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-bone pt-16" role="status" aria-live="polite">
      {body}
    </div>
  );
}

export function PendingLink({
  href,
  className = "",
  children,
  variant = "default",
  pendingLabel,
  buttonSkeleton = true,
  onClick,
  ...rest
}: Props) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    start(() => router.push(href));
  }

  const label =
    pending && buttonSkeleton
      ? pendingLabel ?? (
          <span className="inline-flex w-full items-center justify-center">
            <Skeleton className="h-3.5 w-20 max-w-[70%]" />
          </span>
        )
      : children;

  return (
    <>
      <Link
        href={href}
        onClick={handleClick}
        className={`${className}${pending ? " pointer-events-none relative" : ""}`}
        aria-busy={pending}
        {...rest}
      >
        {label}
      </Link>
      {pending && mounted ? createPortal(<Overlay variant={variant} />, document.body) : null}
    </>
  );
}
