import React from "react";
import { Text } from "./Text";
import { ArrowLeftButton, ArrowRightButton } from "./ArrowButton";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import clsx from "clsx";

const ChevronDownIcon = (
  props: React.SVGProps<SVGSVGElement>
): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </svg>
);

interface NavigationBarProps {
  month: string;
  onPrev: () => void;
  onNext: () => void;
  onToday?: () => void;
  mainView?: "month" | "year";
  onMainViewChange?: (view: "month" | "year") => void;
  isMini?: boolean;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  month,
  onPrev,
  onNext,
  onToday,
  mainView,
  onMainViewChange,
  isMini = false,
}) => {
  return (
    <div
      className={clsx(
        "flex items-center",
        isMini ? "justify-center gap-3" : "justify-between p-4 gap-[0.25rem]"
      )}
    >
      <div className="flex items-center gap-2">
        {!isMini && onToday && (
          <Button
            onPress={onToday}
            variant="bordered"
            size="sm"
            className="border-light-blue text-light-blue hover:bg-light-blue hover:text-white"
          >
            Today
          </Button>
        )}
        {isMini ? (
          <>
            <ArrowLeftButton onPress={onPrev} />
            <Text
              color="default"
              className={clsx(
                "font-bold",
                isMini ? "text-sm" : "text-base ml-2"
              )}
            >
              {month}
            </Text>
            <ArrowRightButton onPress={onNext} />
          </>
        ) : (
          <>
            <ArrowLeftButton onPress={onPrev} />
            <ArrowRightButton onPress={onNext} />
            <Text
              color="default"
              className={clsx(
                "font-bold",
                isMini ? "text-sm" : "text-base ml-2"
              )}
            >
              {month}
            </Text>
          </>
        )}
      </div>

      {!isMini && mainView && onMainViewChange && (
        <Dropdown size="sm" classNames={{ content: "p-0" }}>
          <DropdownTrigger>
            <Button
              variant="solid"
              size="sm"
              className="capitalize bg-[#5684AE] text-white hover:bg-[#40678A]"
              endContent={<ChevronDownIcon className="text-small" />}
            >
              {mainView}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="View selection"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={[mainView]}
            onAction={(key) => onMainViewChange(key as "month" | "year")}
            items={[
              { key: "month", label: "Month" },
              { key: "year", label: "Year" },
            ]}
          >
            {(item) => (
              <DropdownItem key={item.key} className="text-sm py-1 px-2">
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};
