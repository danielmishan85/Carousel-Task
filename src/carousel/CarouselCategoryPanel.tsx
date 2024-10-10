import { forwardRef, RefObject, useMemo } from "react";
import { CarouselCategoryEntry } from "./CarouselCategoryEntry";
import { CarouselSelector } from "./carousel-types";
import Checkbox from "@mui/material/Checkbox";

export const CarouselCategoryPanel = forwardRef<
  HTMLElement,
  CarouselCategoryPanelProps
>(({ selectors, isVisible, itemLabel }, ref) => {
  const allEnabled = useMemo<boolean>(() => {
    return selectors.every((x) => x.enabled);
  }, [selectors]);

  return (
    <div
      ref={ref as RefObject<HTMLDivElement> /* Cast ref type to silence TS. */}
      className={`carousel-categories-panel ${isVisible ? "" : "closed"}`}
    >
      <ul>
        <li>
          <span className="carousel-categories-panel-entry">
            <span className="carousel-categories-panel-entry-details">
              <Checkbox
                checked={allEnabled}
                readOnly={true}
                indeterminate={!allEnabled}
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": {
                    fontSize: "160%",
                  },
                  "&.MuiCheckbox-indeterminate": {
                    color: "inherit",
                  },
                  "&.Mui-checked": {
                    color: "inherit",
                  },
                }}
              />
              <span className="carousel-categories-panel-title">
                All Award Letters
              </span>
            </span>
          </span>
        </li>
        {selectors.map((selector, index) => (
          <CarouselCategoryEntry
            key={index}
            selector={selector}
            itemLabel={itemLabel}
          />
        ))}
      </ul>
    </div>
  );
});

export type CarouselCategoryPanelProps = {
  selectors: CarouselSelector[];
  isVisible: boolean;
  itemLabel: string;
};
