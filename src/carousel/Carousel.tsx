import { useRef, useState } from "react";
import { CarouselContent } from "./CarouselContent";
import { CarouselCategoryPanel } from "./CarouselCategoryPanel";
import { CarouselHeader } from "./CarouselHeader";
import { CarouselItem } from "./carousel-types";
import {
  useCategories,
  useEnabledCategoriesState,
  useActiveItems,
  useSelectors,
  useClickOutsideElements,
} from "./carousel-hooks";

export const Carousel = <T extends CarouselItem>({
  items,
  itemLabel,
}: CarouselProps<T>) => {
  // The index in the items array of the current document being shown.
  const [index, setIndex] = useState<number>(0);
  // List of distinct categories and the items that belong to them.
  const categories = useCategories(items);
  // List of booleans that indicate which categories are enabled (true) and
  // which are disabled (false).
  const [enabledCategories, setEnabledCategories] =
    useEnabledCategoriesState(categories);
  // List of items that are currently
  const activeItems = useActiveItems(
    items,
    categories,
    enabledCategories,
    setIndex
  );
  // A list of selectors, which are wrappers around the categories list and
  // enabled categories state that makes it easier to pass them around.
  const selectors = useSelectors(
    categories,
    enabledCategories,
    setEnabledCategories
  );

  const [isCategoryPanelVisible, setIsCategoryPanelVisible] = useState(false);

  const headerTitleRef = useRef<HTMLElement>(null);
  const categoriesPanelRef = useRef<HTMLElement>(null);

  useClickOutsideElements(() => {
    setIsCategoryPanelVisible(false);
  }, [headerTitleRef, categoriesPanelRef]);

  return (
    <>
      <CarouselHeader
        ref={headerTitleRef}
        items={activeItems}
        index={index}
        setIndex={setIndex}
        showCategoryPanel={() => setIsCategoryPanelVisible(true)}
      />
      {
        <CarouselCategoryPanel
          ref={categoriesPanelRef}
          selectors={selectors}
          isVisible={isCategoryPanelVisible}
          itemLabel={itemLabel}
        />
      }
      <CarouselContent items={activeItems} index={index} />
    </>
  );
};

export type CarouselProps<T extends CarouselItem> = {
  items: T[];
  itemLabel: string;
};
