"use client";

import React, { useState, useEffect } from "react";
import { Youtube, Share2, Download } from "lucide-react";
import { ShinyText } from "@/components/ui/shiny-text";
import { ScriptGeneratorForm } from "@/components/script-generator-form";
import { ScriptResultsView } from "@/components/script-results-view";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [scriptData, setScriptData] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-zinc-800/60 bg-[#09090b]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => setScriptData(null)} // Reset to home
          >
            <div className="bg-gradient-to-br from-red-600 to-red-700 p-2 rounded-lg shadow-lg shadow-red-900/20">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                Script Gen AI
              </span>
              <ShinyText
                text={scriptData ? "Project Editor" : "New Project"}
                className="text-lg font-bold tracking-tight text-white"
                speed={4}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {scriptData && (
              <>
                <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-sm font-medium rounded-lg transition-all hover:border-zinc-700">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                  <Download className="w-4 h-4" /> Export
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {scriptData ? (
          <ScriptResultsView data={scriptData} />
        ) : (
          <ScriptGeneratorForm onSuccess={setScriptData} />
        )}
      </main>
    </div>
  );
}
