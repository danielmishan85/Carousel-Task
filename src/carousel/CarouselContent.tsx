import { CarouselItem } from "./carousel-types";

export const CarouselContent = ({ items, index }: CarouselContentProps) => {
  return <div className="carousel-content">{items[index].content}</div>;
};

export type CarouselContentProps = {
  index: number;
  items: CarouselItem[];
};
