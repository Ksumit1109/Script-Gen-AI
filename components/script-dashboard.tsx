"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Copy,
  Share2,
  Youtube,
  FileText,
  BookOpen,
  Layers,
} from "lucide-react";
import { MarkdownViewer } from "./markdown-viewer";
import { motion } from "framer-motion";

interface ScriptData {
  channel_url?: string;
  topic?: string;
  final_script: string;
  research_summary: string;
  script_outline: string;
}

interface ScriptDashboardProps {
  data: ScriptData;
}

export function ScriptDashboard({ data }: ScriptDashboardProps) {
  const [activeTab, setActiveTab] = useState("script");

  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Section */}
      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <Badge
            variant="outline"
            className="mb-2 bg-primary/5 hover:bg-primary/10 transition-colors"
          >
            YouTube Script Generator
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {data.topic || "Untitled Project"}
          </h1>
          {data.channel_url && (
            <p className="text-muted-foreground flex items-center gap-2 mt-1 text-sm">
              <Youtube className="w-4 h-4" />
              {data.channel_url}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button size="sm" className="gap-2">
            <Copy className="w-4 h-4" />
            Copy All
          </Button>
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <Tabs
        defaultValue="script"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger
              value="script"
              className="gap-2 data-[state=active]:bg-background shadow-sm"
            >
              <FileText className="w-4 h-4" />
              Final Script
            </TabsTrigger>
            <TabsTrigger
              value="outline"
              className="gap-2 data-[state=active]:bg-background shadow-sm"
            >
              <Layers className="w-4 h-4" />
              Outline
            </TabsTrigger>
            <TabsTrigger
              value="research"
              className="gap-2 data-[state=active]:bg-background shadow-sm"
            >
              <BookOpen className="w-4 h-4" />
              Research
            </TabsTrigger>
          </TabsList>
        </div>

        <motion.div
          key={activeTab}
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          {/* Script Tab */}
          <TabsContent value="script" className="mt-0">
            <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle>Video Script</CardTitle>
                <CardDescription>
                  Generated script formatted for teleprompters or reading.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[65vh] pr-4">
                  <MarkdownViewer
                    content={data.final_script}
                    className="prose-headings:text-primary"
                  />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Outline Tab */}
          <TabsContent value="outline" className="mt-0">
            <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle>Structure & Outline</CardTitle>
                <CardDescription>
                  The Skeleton and flow of your video.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[65vh] pr-4">
                  <MarkdownViewer content={data.script_outline} />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Research Tab */}
          <TabsContent value="research" className="mt-0">
            <Card className="border-border/60 bg-card/50 backdrop-blur-sm shadow-xl">
              <CardHeader className="pb-2">
                <CardTitle>Research & Citations</CardTitle>
                <CardDescription>
                  Source materials and summary of facts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[65vh] pr-4">
                  <MarkdownViewer content={data.research_summary} />
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </motion.div>
      </Tabs>
    </div>
  );
}
