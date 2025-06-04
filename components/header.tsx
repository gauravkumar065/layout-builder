"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { Menu, Bell, Search, Layout, Palette, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useCallback } from "react";

interface HeaderProps {
  // isCollapsed prop is now managed internally
}

export function Header({}: HeaderProps) {
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollThreshold = 50; // Only collapse after scrolling 50px

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > scrollThreshold && currentScrollY > lastScrollY) {
      setIsScrolledDown(true); // Scrolling down
    } else {
      setIsScrolledDown(false); // Scrolling up or above threshold
    }
    setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY); // For Mobile or negative scrolling
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Use isScrolledDown for the isCollapsed logic
  const isCollapsed = isScrolledDown;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        "transition-all duration-300 ease-in-out",
        isCollapsed ? "h-14" : "h-16"
      )}
    >
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "transition-all duration-200",
              isCollapsed ? "h-7 w-7" : "h-8 w-8"
            )}
          >
            <Menu
              className={cn(
                "transition-all",
                isCollapsed ? "h-3.5 w-3.5" : "h-4 w-4"
              )}
            />
          </Button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Layout
                className={cn(
                  "text-primary transition-all",
                  isCollapsed ? "h-4 w-4" : "h-5 w-5"
                )}
              />
              <h1
                className={cn(
                  "font-semibold text-foreground transition-all duration-200",
                  isCollapsed ? "text-sm" : "text-lg"
                )}
              >
                Responsive Layout
              </h1>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
