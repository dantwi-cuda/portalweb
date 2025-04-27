import { useState } from "react";
import Icon from "./Icon";

// Define the types for the Accordion props
interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

const Accordion: React.FC<AccordionProps> = ({ items, className = "space-y-5" }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div
          className="accordion shadow-base dark:shadow-none rounded-md"
          key={index}
        >
          <div
            className={`flex justify-between cursor-pointer transition duration-150 font-medium w-full text-start text-base text-slate-600 dark:text-slate-300 px-8 py-4 ${
              activeIndex === index
                ? "bg-slate-50 dark:bg-slate-700 dark:bg-opacity-60 rounded-t-md "
                : "bg-white dark:bg-slate-700  rounded-md"
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <span>{item.title}</span>
            <span
              className={`text-slate-900 dark:text-white text-[22px] transition-all duration-300 h-5 ${
                activeIndex === index ? "rotate-180 transform" : ""
              }`}
            >
              <Icon icon="heroicons-outline:chevron-down" />
            </span>
          </div>

          {activeIndex === index && (
            <div
              className={`${
                index === activeIndex
                  ? "dark:border dark:border-slate-700 dark:border-t-0"
                  : ""
              } text-sm text-slate-600 font-normal bg-white dark:bg-slate-900 dark:text-slate-300 rounded-b-md`}
            >
              <div
                className="px-8 py-4"
                dangerouslySetInnerHTML={{ __html: item.content }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
