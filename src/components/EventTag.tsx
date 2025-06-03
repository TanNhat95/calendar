import React from "react";
import clsx from "clsx";

interface EventTagProps {
  title: string;
  type: "appointment" | "event" | "task";
  className?: string;
}

export const EventTag: React.FC<EventTagProps> = ({
  title,
  type,
  className,
}) => {
  const getTypeColor = () => {
    switch (type) {
      case "appointment":
        return {
          strip: "bg-light-blue",
          background: "bg-light-orange",
          text: "text-light-blue",
        };
      case "event":
        return {
          strip: "bg-light-blue",
          background: "bg-dark-orange",
          text: "text-light-blue",
        };
      case "task":
        return {
          strip: "bg-deep-orange",
          background: "bg-light-blue",
          text: "text-white",
        };
    }
  };

  const colors = getTypeColor();

  return (
    <div
      className={clsx(
        "relative px-[0.5rem] py-0.5 rounded-l-sm text-xs",
        colors.background,
        colors.text,
        className
      )}
    >
      <div
        className={clsx(
          "absolute left-0 top-0 h-full w-1 rounded-l-sm",
          colors.strip
        )}
      />
      {title}
    </div>
  );
};
