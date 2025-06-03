import React from "react";
import {
  Card as NextUICard,
  CardProps as NextUICardProps,
} from "@nextui-org/react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const cardVariants = cva("p-4 rounded-lg", {
  variants: {
    color: {
      primary: "bg-card-primary",
      secondary: "bg-card-secondary",
      accent: "bg-card-accent",
      warning: "bg-card-warning",
      white: "bg-white",
    },
  },
  defaultVariants: {
    color: "white",
  },
});

export interface CardProps
  extends NextUICardProps,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, color, ...props }, ref) => {
    const finalClassName = twMerge(clsx(cardVariants({ color }), className));

    return <NextUICard ref={ref} className={finalClassName} {...props} />;
  }
);

Card.displayName = "Card";
