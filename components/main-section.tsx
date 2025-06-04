"use client";

import { Button } from "@/components/ui/button";
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
import {
  ChevronDown,
  ChevronUp,
  Layers,
  Settings,
  Users,
  BarChart3,
  Globe,
  Palette,
  Code2,
  Database,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MainSectionProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  bottomPanelOffset?: number;
}

const sectionIcons = [
  Layers,
  Settings,
  Users,
  BarChart3,
  Globe,
  Palette,
  Code2,
  Database,
  Zap,
];
const sectionColors = [
  "text-purple-500 bg-purple-50 border-purple-200 dark:bg-purple-950 dark:border-purple-800",
  "text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800",
  "text-green-500 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800",
  "text-orange-500 bg-orange-50 border-orange-200 dark:bg-orange-950 dark:border-orange-800",
  "text-cyan-500 bg-cyan-50 border-cyan-200 dark:bg-cyan-950 dark:border-cyan-800",
  "text-pink-500 bg-pink-50 border-pink-200 dark:bg-pink-950 dark:border-pink-800",
  "text-indigo-500 bg-indigo-50 border-indigo-200 dark:bg-indigo-950 dark:border-indigo-800",
  "text-emerald-500 bg-emerald-50 border-emerald-200 dark:bg-emerald-950 dark:border-emerald-800",
  "text-yellow-500 bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800",
];

const sectionTypes = [
  "Layout",
  "Theme",
  "Users",
  "Analytics",
  "Global",
  "Style",
  "Code",
  "Data",
  "Performance",
];

export function MainSection({
  isMobile,
  isTablet,
  isDesktop,
  isExpanded,
  onToggleExpanded,
  bottomPanelOffset = 0,
}: MainSectionProps) {
  const renderSectionCard = (index: number) => {
    const Icon = sectionIcons[index % sectionIcons.length];
    const colorClass = sectionColors[index % sectionColors.length];
    const sectionType = sectionTypes[index % sectionTypes.length];
    const progress = 65 + ((index * 7) % 35);

    return (
      <Card
        key={index}
        className={cn(
          "group hover:shadow-md transition-all duration-200",
          colorClass
        )}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" />
              <CardTitle className="text-sm font-medium">
                {sectionType} {index + 1}
              </CardTitle>
            </div>
            <Badge variant="outline" className="text-xs">
              {progress > 80 ? "Complete" : progress > 50 ? "Active" : "Setup"}
            </Badge>
          </div>
          <CardDescription className="text-xs">
            Configure your {sectionType.toLowerCase()} settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-background group-hover:shadow-sm transition-all"
          >
            Configure
          </Button>
        </CardContent>
      </Card>
    );
  };

  // Define the grid of 15 cards
  const cardsGrid = (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 15 }).map((_, i) => renderSectionCard(i))}
    </div>
  );

  // Mobile: Show summary when collapsed
  if (isMobile && !isExpanded) {
    return (
      <div className="flex-1 p-4 space-y-4">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Layout Builder</h2>
            <p className="text-sm text-muted-foreground">
              Professional layout management system
            </p>
          </div>

          <div className="grid gap-3">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Layers className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">18 Components</p>
                    <p className="text-xs text-muted-foreground">
                      Active sections
                    </p>
                  </div>
                </div>
                <Badge>Ready</Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/10 rounded-md">
                    <Settings className="h-4 w-4 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Configuration</p>
                    <p className="text-xs text-muted-foreground">
                      85% complete
                    </p>
                  </div>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-500/10 rounded-md">
                    <Users className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">3 Active Users</p>
                    <p className="text-xs text-muted-foreground">
                      Currently editing
                    </p>
                  </div>
                </div>
                <Badge variant="outline">Live</Badge>
              </div>
            </Card>
          </div>
        </div>

        <Separator />

        <Button
          onClick={onToggleExpanded}
          className="w-full flex items-center gap-2"
        >
          <ChevronDown className="h-4 w-4" />
          Expand Full View
        </Button>
      </div>
    );
  }

  // Tablet: Independent scrolling
  if (isTablet) {
    return (
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full">
          <div
            className="p-6"
            style={{ paddingBottom: `${bottomPanelOffset}px` }}
          >
            {cardsGrid}
          </div>
        </ScrollArea>
      </div>
    );
  }

  // Desktop or Mobile expanded
  return (
    <div className="flex-1 overflow-hidden">
      <ScrollArea className="h-full w-full">
        <div
          className="p-6"
          style={{ paddingBottom: `${bottomPanelOffset}px` }}
        >
          {cardsGrid}
          {isMobile && (
            <div className="mt-6 pt-4 border-t">
              <Button
                variant="outline"
                onClick={onToggleExpanded}
                className="w-full flex items-center gap-2"
              >
                <ChevronUp className="h-4 w-4" />
                Back to Summary
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
