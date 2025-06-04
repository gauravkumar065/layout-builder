"use client";

import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Monitor, Smartphone, Tablet, Grid3X3 } from "lucide-react";
import { ResizablePanel } from "@/components/resizable-panel";
import { useLayoutState } from "@/hooks/use-layout-state";

interface BottomPanelProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function BottomPanel({
  isMobile,
  isTablet,
  isDesktop,
}: BottomPanelProps) {
  const { state, actions } = useLayoutState();

  const panelContent = (
    <div
      className={cn(
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t flex flex-col p-0",
        isMobile
          ? "h-[256px]"
          : isTablet
          ? "h-auto max-h-[50vh]"
          : "h-auto max-h-[40vh]"
      )}
    >
      <div className="px-4 py-3 border-b shrink-0 flex items-center gap-2">
        <Grid3X3 className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold">Layout Configuration</span>
        <Badge variant="outline" className="text-xs ml-1">
          {isDesktop ? "Desktop" : isTablet ? "Tablet" : "Mobile"}
        </Badge>
      </div>
      <div className="flex-1 min-h-0 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Monitor className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm">Desktop (≥1024px)</CardTitle>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Header:</span>
                <span>Sticky + Collapsible</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Main:</span>
                <span>Fill Space</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Panel:</span>
                <span>Viewport Bottom</span>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Tablet className="h-4 w-4 text-green-500" />
              <CardTitle className="text-sm">Tablet (768-1023px)</CardTitle>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Header:</span>
                <span>Sticky + Collapsible</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Main:</span>
                <span>Independent Scroll</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Panel:</span>
                <span>Content Bottom</span>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Smartphone className="h-4 w-4 text-purple-500" />
              <CardTitle className="text-sm">{"Mobile (<768px)"}</CardTitle>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Header:</span>
                <span>Sticky + Collapsible</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Main:</span>
                <span>Summary View</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Panel:</span>
                <span>Hidden + Float Button</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    // On mobile, just render the panel content (parent controls visibility)
    return (
      <div
        className={cn(
          "fixed bottom-0 left-0 w-full z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t flex flex-col p-0"
        )}
      >
        <ResizablePanel
          direction="vertical"
          defaultSize={state.bottomPanelHeight}
          minSize={100}
          maxSize={600}
          resizeFrom="top"
          onResize={actions.setBottomPanelHeight}
        >
          {panelContent}
        </ResizablePanel>
      </div>
    );
  }

  if (isDesktop) {
    // Fixed to viewport bottom
    return (
      <div className="fixed bottom-0 left-0 w-full z-40">
        <ResizablePanel
          direction="vertical"
          defaultSize={state.bottomPanelHeight}
          minSize={100}
          maxSize={600}
          resizeFrom="top"
          onResize={actions.setBottomPanelHeight}
        >
          {panelContent}
        </ResizablePanel>
      </div>
    );
  }

  // Tablet: fixed to viewport bottom (like desktop)
  if (isTablet) {
    return (
      <div className="fixed bottom-0 left-0 w-full z-40">
        <ResizablePanel
          direction="vertical"
          defaultSize={state.bottomPanelHeight}
          minSize={100}
          maxSize={600}
          resizeFrom="top"
          onResize={actions.setBottomPanelHeight}
        >
          {panelContent}
        </ResizablePanel>
      </div>
    );
  }

  // Tablet: relative, at content bottom
  return <div className="w-full">{panelContent}</div>;
}
