import { Dispatch, forwardRef, RefObject } from "react";
import { CarouselItem } from "./carousel-types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import IconButton from "@mui/material/IconButton";

const navButtonStyle = {
  fontSize: "100%",
  color: "#071c92",
};

const navArrowStyle = {
  fontSize: "125%",
};

export const CarouselHeader = forwardRef<HTMLElement, CarouselHeaderProps>(
  ({ items, index, setIndex, showCategoryPanel }, ref) => {
    const currentItem = items[index];
    const hasNext = index < items.length - 1;
    const hasPrev = index > 0;

    const goNext = () => {
      if (!hasNext) {
        return;
      }
      setIndex(index + 1);
    };

    const goPrev = () => {
      if (!hasPrev) {
        return;
      }
      setIndex(index - 1);
    };

    return (
      <div className="carousel-header">
        <IconButton disabled={!hasPrev} onClick={goPrev} sx={navButtonStyle}>
          <ArrowBackIosNewIcon sx={navArrowStyle} />
        </IconButton>
        <span
          className="carousel-header-logo"
          onClick={showCategoryPanel}
          ref={ref as RefObject<HTMLElement>}
        >
          <span className="carousel-header-title"> {currentItem.title}</span>
          <span className="carousel-header-document-number">
            {index + 1}/{items.length}
          </span>
        </span>
        <IconButton disabled={!hasNext} onClick={goNext} sx={navButtonStyle}>
          <ArrowForwardIosIcon sx={navArrowStyle} />
        </IconButton>
      </div>
    );
  }
);

export type CarouselHeaderProps = {
  items: CarouselItem[];
  index: number;
  setIndex: Dispatch<number>;
  showCategoryPanel: () => void;
};
