import { cn } from "@/shared/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-3xl font-extrabold tracking-tight text-foreground lg:text-4xl leading-[1.1]",
      h2: "scroll-m-20 text-2xl font-bold tracking-tight text-foreground leading-snug",
      h3: "scroll-m-20 text-xl font-semibold tracking-tight text-foreground leading-snug",
      h4: "scroll-m-20 text-lg font-semibold tracking-tight text-foreground leading-snug",
      h5: "scroll-m-20 text-base font-medium tracking-tight text-foreground leading-snug",
      h6: "scroll-m-20 text-sm font-medium tracking-tight text-foreground leading-snug",
      "body-lg": "text-base text-foreground leading-relaxed",
      body: "text-base text-foreground leading-relaxed",
      "body-sm": "text-sm leading-relaxed",
      label: "text-sm font-medium text-foreground leading-none",
      "label-sm": "text-xs font-normal text-foreground leading-none",
      caption: "text-xs leading-none",
      overline: "text-xs font-semibold uppercase tracking-widest",
      code: "rounded bg-muted px-1.5 py-0.5 font-mono text-sm font-medium text-primary",
      mono: "rounded-md bg-muted p-4 font-mono text-sm text-foreground overflow-x-auto leading-relaxed",
    },
    muted: {
      true: "text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

type TypographyElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "code"
  | "pre";

const ELEMENT_MAP: Record<
  NonNullable<VariantProps<typeof typographyVariants>["variant"]>,
  TypographyElement
> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "body-lg": "p",
  body: "p",
  "body-sm": "p",
  label: "label",
  "label-sm": "label",
  caption: "span",
  overline: "span",
  code: "code",
  mono: "pre",
};

interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /** Override the rendered HTML element. Base UI's render prop is also supported via composition. */
  as?: TypographyElement;
  ref?: React.Ref<HTMLElement>;
}
/**
 * Unified typography primitive for the admin portal.
 * Built with CVA for variant management and compatible with Base UI's
 * ref-forwarding and slot composition model.
 *
 * @example
 * <Typography variant="h1">Dashboard</Typography>
 * <Typography variant="overline" muted>Section label</Typography>
 * <Typography variant="code">NODE_ENV=production</Typography>
 * // Base UI slot usage:
 * <SomeBaseUIComponent render={<Typography variant="body" />} />
 */
export const Typography = ({
  variant = "body",
  muted,
  as,
  className,
  ref,
  ...rest
}: TypographyProps) => {
  const Tag = (as ?? ELEMENT_MAP[variant!]) as React.ElementType;

  return (
    <Tag
      ref={ref}
      className={cn(typographyVariants({ variant, muted }), className)}
      {...rest}
    />
  );
};

Typography.displayName = "Typography";
