"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Code,
  Eye,
  Settings,
  Monitor,
  Smartphone,
  Tablet,
  Layers,
  Palette,
  Grid3X3,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomPanelProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  onClose?: () => void;
}

export function BottomPanel({
  isMobile,
  isTablet,
  isDesktop,
  onClose,
}: BottomPanelProps) {
  // Desktop: Fixed to viewport bottom
  // Tablet: Sticks to content bottom
  // Mobile: Fixed overlay with close button
  const containerClass = cn(
    "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t",
    isMobile
      ? "fixed bottom-0 left-0 w-full shadow-lg z-40 h-64"
      : isDesktop
      ? "fixed bottom-0 left-0 w-full max-h-[40vh]"
      : "w-full max-h-[50vh]"
  );

  return (
    <div className={containerClass}>
      <div className="flex flex-col h-full max-h-full min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <Grid3X3 className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold">Layout Configuration</h3>
            <Badge variant="outline" className="text-xs">
              {isDesktop ? "Desktop" : isTablet ? "Tablet" : "Mobile"}
            </Badge>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Content */}
        <Tabs defaultValue="preview" className="flex-1 min-h-0 flex flex-col">
          <div className="border-b px-4 py-2 shrink-0">
            <TabsList className="h-9 bg-muted/50">
              <TabsTrigger value="preview" className="text-xs gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                Preview
              </TabsTrigger>
              <TabsTrigger value="code" className="text-xs gap-1.5">
                <Code className="h-3.5 w-3.5" />
                Code
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs gap-1.5">
                <Settings className="h-3.5 w-3.5" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="responsive" className="text-xs gap-1.5">
                <Monitor className="h-3.5 w-3.5" />
                Responsive
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 min-h-0">
            <TabsContent value="preview" className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">
                        Layout Structure
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      <div className="h-6 bg-primary/10 border border-primary/20 rounded flex items-center justify-center text-xs font-medium text-primary">
                        Header (Collapsible)
                      </div>
                      <div className="h-12 bg-muted border rounded flex items-center justify-center text-xs">
                        Main Content Area
                      </div>
                      <div className="h-6 bg-accent border rounded flex items-center justify-center text-xs">
                        Bottom Panel (Current)
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-purple-500" />
                      <span className="text-sm font-medium">Theme Preview</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-3 bg-background border rounded-md space-y-1">
                        <div className="h-2 bg-foreground/20 rounded w-3/4"></div>
                        <div className="h-2 bg-foreground/10 rounded w-1/2"></div>
                        <span className="text-xs text-muted-foreground">
                          Light
                        </span>
                      </div>
                      <div className="p-3 bg-background border rounded-md space-y-1 dark:bg-slate-900">
                        <div className="h-2 bg-white/20 rounded w-3/4"></div>
                        <div className="h-2 bg-white/10 rounded w-1/2"></div>
                        <span className="text-xs text-muted-foreground">
                          Dark
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="code" className="p-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Generated Code</CardTitle>
                  <CardDescription className="text-xs">
                    React component structure for your layout
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
                    <code className="text-foreground">{`<LayoutBuilder>
  <Header 
    isCollapsed={scrollDirection === "down"}
    className="sticky top-0 z-50"
  />
  <MainSection 
    responsive={{
      desktop: "fill-space",
      tablet: "scrollable", 
      mobile: "collapsible"
    }}
  />
  <BottomPanel
    position={{
      desktop: "viewport-bottom",
      tablet: "content-bottom",
      mobile: "overlay"
    }}
  />
</LayoutBuilder>`}</code>
                  </pre>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <CardTitle className="text-sm mb-3">
                    Layout Settings
                  </CardTitle>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="headerHeight"
                        className="text-xs font-medium"
                      >
                        Header Height (px)
                      </Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          defaultValue={[64]}
                          max={120}
                          min={40}
                          step={4}
                          className="flex-1"
                        />
                        <span className="text-xs text-muted-foreground w-8">
                          64
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="panelHeight"
                        className="text-xs font-medium"
                      >
                        Panel Height (px)
                      </Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          defaultValue={[256]}
                          max={400}
                          min={200}
                          step={8}
                          className="flex-1"
                        />
                        <span className="text-xs text-muted-foreground w-12">
                          256
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="autoCollapse"
                        className="text-xs font-medium"
                      >
                        Auto-collapse Header
                      </Label>
                      <Switch id="autoCollapse" defaultChecked />
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <CardTitle className="text-sm mb-3">
                    Behavior Settings
                  </CardTitle>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-medium">
                        Default View
                      </Label>
                      <Select defaultValue="desktop">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="desktop">Desktop First</SelectItem>
                          <SelectItem value="mobile">Mobile First</SelectItem>
                          <SelectItem value="tablet">Tablet First</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs font-medium">
                        Animation Speed
                      </Label>
                      <Select defaultValue="normal">
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="slow">Slow (500ms)</SelectItem>
                          <SelectItem value="normal">Normal (300ms)</SelectItem>
                          <SelectItem value="fast">Fast (150ms)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <Label
                        htmlFor="smoothScrolling"
                        className="text-xs font-medium"
                      >
                        Smooth Scrolling
                      </Label>
                      <Switch id="smoothScrolling" defaultChecked />
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="responsive" className="p-4">
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
                    <CardTitle className="text-sm">
                      Tablet (768-1023px)
                    </CardTitle>
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
                    <CardTitle className="text-sm">
                      Mobile (&lt;768px)
                    </CardTitle>
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
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
