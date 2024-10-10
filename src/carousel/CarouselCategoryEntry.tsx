import { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import { CarouselSelector } from "./carousel-types";

export const CarouselCategoryEntry = ({
  selector,
  itemLabel,
}: CarouselCategoryEntryProps) => {
  const { name, icon, enabled, setEnabled } = selector;

  // [3 states]
  // + null = closed, initial state
  // + false = closed
  // + true = open
  const [expanded, setExpanded] = useState<boolean | null>(null);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const expandClass = expanded === null ? "" : expanded ? "opened" : "closed";

  const expandedListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const element = expandedListRef.current;
    if (!element) {
      return;
    }
    if (!expanded) {
      element.style.height = "0px";
      return;
    }
    // Calculate the height of the element if it was "auto".
    element.style.height = "auto";
    const height = element.offsetHeight;
    // Change it back to "0px" to keep it hidden for now.
    element.style.height = "0px";
    setTimeout(() => {
      // We need to wait a bit before setting the height so the transition works.
      element.style.height = height + "px";
    });
  }, [expandedListRef, expanded]);

  return (
    <li>
      <span
        className="carousel-categories-panel-entry"
        onClick={toggleExpanded}
      >
        <span className="carousel-categories-panel-entry-details">
          <Checkbox
            checked={enabled}
            onChange={() => setEnabled(!enabled)}
            onClick={(e) => e.stopPropagation()}
            sx={{
              padding: 0,
              "& .MuiSvgIcon-root": {
                fontSize: "160%",
              },
              color: "inherit",
              "&.Mui-checked": {
                color: "inherit",
              },
            }}
          />
          <span>{icon}</span>
          <span className="carousel-categories-panel-title">{name}</span>
          <span className="carousel-categories-panel-label">
            ({selector.items.length} {itemLabel})
          </span>
        </span>
        <ExpandMoreIcon
          className={`carousel-categories-panel-expand-arrow ${expandClass}`}
        />
      </span>
      <ul ref={expandedListRef} className="carousel-categories-panel-item-list">
        {selector.items.map((item, i) => (
          <li key={i} className="carousel-categories-panel-item">
            {item.title}
          </li>
        ))}
      </ul>
    </li>
  );
};

export type CarouselCategoryEntryProps = {
  selector: CarouselSelector;
  itemLabel: string;
};
