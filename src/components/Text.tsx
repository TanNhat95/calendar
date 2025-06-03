import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

const textVariants = cva("transition-colors", {
  variants: {
    color: {
      default: "text-dark-blue",
      muted: "text-light-blue",
      accent: "text-dark-orange",
      light: "text-light-orange",
      white: "text-white",
    },
    weight: {
      normal: "font-normal",
      bold: "font-bold",
      semibold: "font-semibold",
    },
  },
  defaultVariants: {
    color: "default",
    weight: "normal",
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof textVariants> {}

export const Text = React.forwardRef<HTMLSpanElement, TextProps>(
  ({ className, color, weight, children, ...props }, ref) => {
    const finalClassName = twMerge(
      clsx(textVariants({ color, weight }), className)
    );

    return (
      <span ref={ref} className={finalClassName} {...props}>
        {children}
      </span>
    );
  }
);

Text.displayName = "Text";
