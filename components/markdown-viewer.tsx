"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ImageIcon } from "lucide-react";

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export function MarkdownViewer({ content, className }: MarkdownViewerProps) {
  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        components={{
          // Custom render for paragraphs to detect [Visual: ...] tags
          p: ({ children }) => {
            const text = React.Children.toArray(children).join("");
            if (
              text.trim().startsWith("[Visual:") &&
              text.trim().endsWith("]")
            ) {
              const visualContent = text.trim().slice(8, -1).trim();
              return (
                <div className="my-6 p-4 rounded-lg bg-secondary/50 border border-border/50 flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <ImageIcon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1">
                      Visual Cue
                    </span>
                    <span className="text-foreground font-medium">
                      {visualContent}
                    </span>
                  </div>
                </div>
              );
            }
            return <p>{children}</p>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
