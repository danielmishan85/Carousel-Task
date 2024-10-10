import { CarouselItem, CarouselCategory } from "./carousel-types";

export function filterCarouselItemsByCategory<T extends CarouselItem>(
  items: T[],
  categories: CarouselCategory[],
  enabledCategories: boolean[]
): T[] {
  const enabledItems: T[] = [];
  for (const item of items) {
    for (let i = 0; i < categories.length; i++) {
      const isCategoryEnabled = enabledCategories[i];
      if (!isCategoryEnabled) {
        continue;
      }
      const category = categories[i];
      // Note: We could use a Set for this check, but we don't expect the number
      // of items and categories to be particularly large, so using an array
      // won't hurt performance.
      const passed = category.items.includes(item);
      if (passed) {
        enabledItems.push(item);
        break;
      }
    }
  }
  return enabledItems;
}

export function createCategoriesFromItems(
  items: CarouselItem[]
): CarouselCategory[] {
  const map = new Map<
    string,
    {
      icon: string;
      items: CarouselItem[];
    }
  >();
  for (const item of items) {
    for (const category of item.categories) {
      let entry = map.get(category.name);
      if (!entry) {
        entry = {
          icon: category.icon,
          items: [],
        };
        map.set(category.name, entry);
      }
      entry.items.push(item);
    }
  }

  const categories: CarouselCategory[] = [];
  for (const [categoryName, entry] of map) {
    categories.push({
      name: categoryName,
      icon: entry.icon,
      items: entry.items,
    });
  }
  return categories;
}
