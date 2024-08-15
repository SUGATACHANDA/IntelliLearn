"use client";

import { Category } from "@prisma/client";
import { IconType } from "react-icons"
import {FcBiotech, FcEngineering, FcEnteringHeavenAlive, FcFilmReel, FcMultipleDevices, FcMusic, FcOldTimeCamera, FcReadingEbook, FcSalesPerformance, FcSportsMode} from "react-icons/fc";
import CategoryItem from "./category-item";

interface CategoriesProps{
    items:  Category[]
}

const iconMap: Record<Category["name"], IconType> = {
 "Humanities": FcReadingEbook,
 "Finance": FcSalesPerformance,
 "Computer Science": FcMultipleDevices,
 "Bio-Medical": FcBiotech,
 "Engineering": FcEngineering,
 "Ethics": FcEnteringHeavenAlive
};

const Categories = ({ items }:CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
            key={item.id}
            label={item.name}
            icon={iconMap[item.name]}
            value={item.id}
         />
      ))}
    </div>
  );
};

export default Categories;
