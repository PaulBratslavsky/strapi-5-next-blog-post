"use client";

import { useState } from "react";

export interface SpoilerBlock {
  __component: "blocks.spoiler";
  id: number;
  title: string;
  content: string;
}

export function SpoilerBlock({ block }: { block: SpoilerBlock }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full mb-4 rounded-lg overflow-hidden shadow-md transition-all duration-300 ease-in-out">
      <button
        className={`w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 ease-in-out ${
          isExpanded ? "bg-gray-200" : ""
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span className="text-lg font-semibold text-gray-800">
          {block.title}
        </span>
        <span
          className={`text-2xl text-gray-600 transition-transform duration-300 ease-in-out ${
            isExpanded ? "transform rotate-180" : ""
          }`}
        >
          {isExpanded ? "−" : "+"}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[1000px]" : "max-h-0"
        }`}
        aria-hidden={!isExpanded}
      >
        <div className="p-4 bg-white text-gray-700 leading-relaxed">
          {block.content}
        </div>
      </div>
    </div>
  );
}
