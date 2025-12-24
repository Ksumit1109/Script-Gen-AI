"use client";

import React, { useState } from "react";
import { Sparkles, Youtube, Hash, Loader2, ArrowRight } from "lucide-react";

interface ScriptGeneratorFormProps {
  onSuccess: (data: any) => void;
}

export function ScriptGeneratorForm({ onSuccess }: ScriptGeneratorFormProps) {
  const [topic, setTopic] = useState("");
  const [channelUrl, setChannelUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // Mock function for view state, in a real app this would likely come from context or props if needed
  // But for this component, we just need to trigger the success.
  // The user's code snippet had `setView('dashboard')` which implies a parent state change.
  // We'll map that to calling `onSuccess` with mock data if not generating real data, or just keeping the existing flow.

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/v1/script/generate-script",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            channel_url: channelUrl,
            topic: topic,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate script");
      }

      const data = await response.json();
      onSuccess(data);
    } catch (err) {
      console.error(err);
      // Fallback for demo purposes if API is not running, or handle error properly
      // alert("Failed to generate script. Check console.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-zinc-900/50 rounded-2xl mb-4 border border-zinc-800 ring-1 ring-zinc-700/50 shadow-lg shadow-indigo-500/10 backdrop-blur-md">
          <Sparkles className="w-6 h-6 text-indigo-400" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          Generate Viral Scripts
        </h1>
        <p className="text-zinc-400 text-lg">
          Enter your channel details and topic to let AI craft the perfect
          narrative.
        </p>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl shadow-black/20 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
          {/* Channel URL Input */}
          <div className="space-y-2">
            <label
              htmlFor="channel"
              className="block text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1"
            >
              YouTube Channel URL
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Youtube className="h-5 w-5 text-zinc-500 group-focus-within:text-red-500 transition-colors" />
              </div>
              <input
                id="channel"
                type="url"
                required
                value={channelUrl}
                onChange={(e) => setChannelUrl(e.target.value)}
                placeholder="https://www.youtube.com/@channelname"
                className="w-full pl-12 pr-4 py-4 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none transition-all text-zinc-100 placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Topic Input */}
          <div className="space-y-2">
            <label
              htmlFor="topic"
              className="block text-xs font-bold text-zinc-400 uppercase tracking-wider ml-1"
            >
              Video Topic
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Hash className="h-5 w-5 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                id="topic"
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Marvel Cinematic Universe timeline explained"
                className="w-full pl-12 pr-4 py-4 bg-zinc-950/50 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 outline-none transition-all text-zinc-100 placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isGenerating}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-lg rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Channel Tone...
              </>
            ) : (
              <>
                Generate Script
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-center text-xs text-zinc-600 mt-4">
            By generating, you agree to the AI usage terms. Standard tokens
            apply.
          </p>
        </form>
      </div>

      {/* Recent Generations Mockup */}
      <div className="mt-8 pt-8 border-t border-zinc-800/50">
        <h3 className="text-sm font-semibold text-zinc-500 mb-4 ml-1 tracking-wider">
          RECENTLY GENERATED
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="p-3 bg-zinc-900/20 border border-zinc-800/50 rounded-lg flex items-center gap-3 hover:bg-zinc-900/40 cursor-pointer transition-colors group">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                Marvel Explained
              </div>
              <div className="text-xs text-zinc-600">Generated 2m ago</div>
            </div>
          </div>
          <div className="p-3 bg-zinc-900/20 border border-zinc-800/50 rounded-lg flex items-center gap-3 hover:bg-zinc-900/40 cursor-pointer transition-colors group">
            <div className="w-10 h-10 bg-zinc-800 rounded-lg flex items-center justify-center text-zinc-500 group-hover:text-red-500 group-hover:bg-red-500/10 transition-colors">
              <Youtube className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                Top 10 Gadgets
              </div>
              <div className="text-xs text-zinc-600">Generated 2h ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
