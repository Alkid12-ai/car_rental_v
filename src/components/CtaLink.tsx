import Link from "next/link";
import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CtaLinkProps {
  href: string;
  children: ReactNode;
  icon?: LucideIcon;
  variant?: React.ComponentProps<typeof Button>["variant"];
  size?: React.ComponentProps<typeof Button>["size"];
  className?: string;
  /** Background of the nested icon circle, to match the button variant */
  iconClassName?: string;
}

function Inner({
  Icon,
  children,
  iconClassName,
}: {
  Icon: LucideIcon;
  children: ReactNode;
  iconClassName?: string;
}) {
  return (
    <>
      <span>{children}</span>
      <span
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-full",
          "transition-transform duration-500 ease-vanguard",
          "group-hover:translate-x-1 group-hover:-translate-y-px group-hover:scale-105",
          iconClassName ?? "bg-primary-foreground/15"
        )}
      >
        <Icon className="size-4" strokeWidth={1.5} aria-hidden="true" />
      </span>
    </>
  );
}

/**
 * design.md §4B — Nested CTA / "Button-in-Button" architecture.
 *
 * The trailing icon never sits naked beside the label: it lives in its own
 * circular wrapper, flush with the pill's right inner padding, and gains
 * internal kinetic tension on hover.
 */
export default function CtaLink({
  href,
  children,
  icon: Icon = ArrowUpRight,
  variant = "default",
  size = "lg",
  className,
  iconClassName,
}: CtaLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={cn("group rounded-full pl-6 pr-1.5", className)}
    >
      {isExternal ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          <Inner Icon={Icon} iconClassName={iconClassName}>
            {children}
          </Inner>
        </a>
      ) : (
        <Link href={href}>
          <Inner Icon={Icon} iconClassName={iconClassName}>
            {children}
          </Inner>
        </Link>
      )}
    </Button>
  );
}
