import React from "react";
import { Button } from "@nextui-org/react";

type ArrowButtonProps = React.ComponentProps<typeof Button> & {
  direction: "left" | "right";
  onPress: () => void;
};

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onPress,
  ...props
}) => {
  const icon =
    direction === "left" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke="#5684AE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-4 h-4"
        fill="none"
        stroke="#5684AE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
    );

  return (
    <Button
      isIconOnly
      variant="light"
      size="sm"
      onPress={onPress}
      className="text-[#5684AE] hover:text-[#40678A]"
      {...props}
    >
      {icon}
    </Button>
  );
};

export const ArrowLeftButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ArrowButtonProps, "direction">
>(({ onPress, ...props }, ref) => (
  <ArrowButton direction="left" onPress={onPress} ref={ref} {...props} />
));

ArrowLeftButton.displayName = "ArrowLeftButton";

export const ArrowRightButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ArrowButtonProps, "direction">
>(({ onPress, ...props }, ref) => (
  <ArrowButton direction="right" onPress={onPress} ref={ref} {...props} />
));

ArrowRightButton.displayName = "ArrowRightButton";
