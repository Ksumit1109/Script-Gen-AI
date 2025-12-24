"use client";

import React from "react";

export const SimpleMarkdown = ({ content }: { content: string }) => {
  if (!content) return null;

  // Split by double newlines for paragraphs
  const paragraphs = content.split("nn");

  return (
    <div className="space-y-4 text-zinc-300 leading-relaxed">
      {paragraphs.map((para, idx) => {
        // Handle lines starting with number. (Simple list detection)
        const isList = /^\d+\./.test(para.trim());

        // Simple bold parser: replaces **text** with <strong>text</strong>
        const parseBold = (text: string) => {
          const parts = text.split(/(\*\*.*?\*\*)/g);
          return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={i} className="text-indigo-300 font-semibold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });
        };

        if (isList) {
          // Split list items if they are in one block
          return (
            <div key={idx} className="pl-4">
              {parseBold(para)}
            </div>
          );
        }

        return <p key={idx}>{parseBold(para)}</p>;
      })}
    </div>
  );
};
