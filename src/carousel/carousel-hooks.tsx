import { useMemo, Dispatch, useState, useEffect, RefObject } from "react";
import {
  createCategoriesFromItems,
  filterCarouselItemsByCategory,
} from "./carousel-core";
import {
  CarouselItem,
  CarouselCategory,
  CarouselSelector,
} from "./carousel-types";

export function useCategories(items: CarouselItem[]): CarouselCategory[] {
  return useMemo<CarouselCategory[]>(() => {
    return createCategoriesFromItems(items);
  }, [items]);
}

export function useEnabledCategoriesState(
  categories: CarouselCategory[]
): [boolean[], Dispatch<boolean[]>] {
  const [enabledCategories, setEnabledCategories] = useState<boolean[]>(
    categories.map(() => true)
  );
  useEffect(() => {
    setEnabledCategories(categories.map(() => true));
  }, [categories]);
  return [enabledCategories, setEnabledCategories];
}

export function useActiveItems(
  items: CarouselItem[],
  categories: CarouselCategory[],
  enabledCategories: boolean[],
  setIndex: Dispatch<number>
): CarouselItem[] {
  return useMemo<CarouselItem[]>(() => {
    // Reset the index when the active items change because after such a change
    // the current index might point to a different document, which would make
    // the carousel jump to another seemingly random document, or even worse -
    // the current index might be out of bounds.
    setIndex(0);

    return filterCarouselItemsByCategory(items, categories, enabledCategories);
  }, [items, categories, enabledCategories]);
}

export function useSelectors(
  categories: CarouselCategory[],
  enabledCategories: boolean[],
  setEnabledCategories: Dispatch<boolean[]>
): CarouselSelector[] {
  return useMemo<CarouselSelector[]>(() => {
    return categories.map((category, i) => {
      const selector: CarouselSelector = {
        name: category.name,
        icon: category.icon,
        items: category.items,
        enabled: enabledCategories[i],
        setEnabled: null!,
      };

      // Define this function separately so it can capture the selector object.
      selector.setEnabled = (enabled) => {
        enabled = Boolean(enabled);
        if (selector.enabled === enabled) {
          // Same as current state, no need to do anything.
          return;
        }
        if (!enabled) {
          let enabledCount = 0;
          for (const state of enabledCategories) {
            if (state) {
              enabledCount++;
            }
          }
          if (enabledCount === 1) {
            // Do nothing because this is the very last enabled category and
            // we do must always have at least one category enabled.
            return;
          }
        }
        const newState = [...enabledCategories];
        newState[i] = enabled;
        setEnabledCategories(newState);
      };

      return selector;
    });
  }, [categories, enabledCategories]);
}

export function useClickOutsideElements(
  callback: () => void,
  refList: RefObject<HTMLElement | null>[]
) {
  useEffect(() => {
    const hideFilterPanel = (e: Event) => {
      const clickedNode = e.target as Node;
      const targetIsInRefs = refList.some((ref) => {
        return ref.current?.contains(clickedNode);
      });
      if (targetIsInRefs) {
        return;
      }
      callback();
    };
    document.addEventListener("click", hideFilterPanel);
    return () => {
      document.removeEventListener("click", hideFilterPanel);
    };
  }, []);
}
