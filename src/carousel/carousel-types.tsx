import { Dispatch, ReactNode } from "react";

export type CarouselItem = {
  title: string;
  content: ReactNode;
  categories: {
    name: string;
    icon: string;
  }[];
};

export type CarouselCategory = {
  name: string;
  icon: string;
  items: CarouselItem[];
};

export type CarouselSelector = {
  name: string;
  icon: string;
  items: CarouselItem[];
  enabled: boolean;
  setEnabled: Dispatch<boolean>;
};
