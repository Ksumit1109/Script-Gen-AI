"use client";

import React, { useState } from "react";
import {
  FileText,
  List,
  BookOpen,
  Copy,
  CheckCheck,
  Download,
  Clock,
  Hash,
  PlayCircle,
  Share2,
} from "lucide-react";
import { SimpleMarkdown } from "@/components/simple-markdown";

interface ScriptData {
  final_script: string;
  research_summary: string;
  script_outline: string;
  thumbnail_url?: string;
}

interface ScriptResultsViewProps {
  data: ScriptData;
}

const TabButton = ({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: any;
  label: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      active
        ? "bg-zinc-800 text-white shadow-sm ring-1 ring-white/10"
        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
    }`}
  >
    <Icon className="w-4 h-4" />
    {label}
  </button>
);

export function ScriptResultsView({ data }: ScriptResultsViewProps) {
  const [activeTab, setActiveTab] = useState("script");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    let textToCopy = "";
    if (activeTab === "script") textToCopy = data.final_script;
    else if (activeTab === "outline") textToCopy = data.script_outline;
    else if (activeTab === "research") textToCopy = data.research_summary;

    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const wordCount = data.final_script
    ? data.final_script.split(/\s+/).length
    : 0;
  const readTime = Math.ceil(wordCount / 180);

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* HERO SECTION / STATS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        <div className="md:col-span-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Script Generation Complete
          </h1>
          <p className="text-zinc-400">Your content is ready for review.</p>
        </div>
        <div className="md:col-span-4 flex gap-4 justify-start md:justify-end items-center">
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-mono text-zinc-300">
              {readTime} min read
            </span>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/50 px-4 py-2 rounded-full">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-mono text-zinc-300">
              {wordCount} words
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: MAIN EDITOR (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* TABS & ACTIONS */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-1 bg-zinc-900/80 p-1.5 rounded-xl border border-zinc-800/60 backdrop-blur-sm">
              <TabButton
                active={activeTab === "script"}
                onClick={() => setActiveTab("script")}
                icon={FileText}
                label="Script"
              />
              <TabButton
                active={activeTab === "outline"}
                onClick={() => setActiveTab("outline")}
                icon={List}
                label="Outline"
              />
              <TabButton
                active={activeTab === "research"}
                onClick={() => setActiveTab("research")}
                icon={BookOpen}
                label="Research"
              />
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/50 rounded-md transition-all ml-auto"
            >
              {isCopied ? (
                <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </button>
          </div>

          {/* EDITOR CARD */}
          <div className="relative group min-h-[600px] bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <div className="relative p-6 md:p-8 h-full overflow-y-auto">
              {/* TITLE OF SECTION */}
              <div className="mb-6 pb-6 border-b border-zinc-800/50">
                <h2 className="text-2xl font-semibold text-white tracking-tight">
                  {activeTab === "script" && "Final Video Script"}
                  {activeTab === "outline" && "Structural Outline"}
                  {activeTab === "research" && "Research & Sources"}
                </h2>
                <p className="text-zinc-500 text-sm mt-1">
                  {activeTab === "script" &&
                    "Formatted for teleprompter usage. Tone: Engaging, Hindi/English mix."}
                  {activeTab === "outline" &&
                    "The narrative arc generated based on viral retention strategies."}
                  {activeTab === "research" &&
                    "Fact-checked data points and source attributions."}
                </p>
              </div>

              {/* CONTENT */}
              <div className="prose prose-invert max-w-none pb-12">
                <SimpleMarkdown
                  content={
                    activeTab === "script"
                      ? data.final_script
                      : activeTab === "outline"
                      ? data.script_outline
                      : data.research_summary
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: MEDIA & SETTINGS (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* THUMBNAIL PREVIEW */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-zinc-900/80">
              <h3 className="text-sm font-semibold text-zinc-300">
                Thumbnail Preview
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                AI GENERATED
              </span>
            </div>

            <div className="aspect-video relative overflow-hidden bg-zinc-950 group">
              {data.thumbnail_url && (
                <img
                  src={data.thumbnail_url}
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
              )}

              {/* Overlay UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/20 transition-all">
                  <Download className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                1920 x 1080
              </div>
            </div>

            <div className="p-4 bg-zinc-900/30">
              <div className="text-xs text-zinc-500 mb-2">Prompt used</div>
              <p className="text-xs text-zinc-300 italic border-l-2 border-zinc-700 pl-3">
                "Cinematic representation of topic"
              </p>
            </div>
          </div>

          {/* TAGS WIDGET */}
          <div className="bg-zinc-900/30 border border-zinc-800 p-5 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                <Hash className="w-4 h-4 text-zinc-500" />
                Suggested Tags
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Viral", "VideoEssay", "Trending", "DeepDive"].map((tag, i) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700 hover:border-zinc-500 hover:text-zinc-200 cursor-pointer transition-all select-none"
                >
                  #{tag}
                </span>
              ))}
              <button className="text-xs px-3 py-1.5 rounded-full border border-dashed border-zinc-700 text-zinc-500 hover:text-zinc-300 hover:border-zinc-500 transition-all">
                + Add Tag
              </button>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-100 hover:bg-white text-zinc-900 text-sm font-bold rounded-xl transition-all shadow-lg hover:shadow-xl">
              <PlayCircle className="w-4 h-4" />
              Send to Video Editor
            </button>
            <button className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white text-sm font-medium rounded-xl transition-all">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
