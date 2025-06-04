"use client";

import { Header } from "@/components/header";
import { MainSection } from "@/components/main-section";
import { BottomPanel } from "@/components/bottom-panel";
import { FloatingButton } from "@/components/floating-button";
import { useLayoutState } from "@/hooks/use-layout-state";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Grid3X3 } from "lucide-react";

export default function LayoutBuilder() {
  const { state, actions, breakpoints } = useLayoutState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Bottom panel height in px (h-64 = 16rem = 256px)
  const bottomPanelOffset =
    state.showBottomPanel && (breakpoints.isDesktop || breakpoints.isMobile)
      ? 256
      : 0;

  const navItems = [
    {
      name: "Layout",
      link: "#features",
    },
    {
      name: "Custom Layouts",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - sticky without collapse behavior */}
      <div className="relative w-full">
        <Navbar>
          {/* Desktop Navigation */}
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <div className="flex items-center gap-4">
              <NavbarButton variant="secondary">Login</NavbarButton>
            </div>
          </NavBody>

          {/* Mobile Navigation */}
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </MobileNavHeader>

            <MobileNavMenu
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
            >
              {navItems.map((item, idx) => (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              ))}
              <div className="flex w-full flex-col gap-4">
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              </div>
            </MobileNavMenu>
          </MobileNav>
        </Navbar>

        {/* Main content area */}
        <div className="container mx-auto p-8 pt-24">
          <MainSection
            isMobile={breakpoints.isMobile}
            isTablet={breakpoints.isTablet}
            isDesktop={breakpoints.isDesktop}
            isExpanded={state.mainExpanded}
            onToggleExpanded={actions.toggleMainExpanded}
            bottomPanelOffset={bottomPanelOffset}
          />

          {/* Bottom Panel - responsive positioning */}
          {state.showBottomPanel && (
            <BottomPanel
              isMobile={breakpoints.isMobile}
              isTablet={breakpoints.isTablet}
              isDesktop={breakpoints.isDesktop}
            />
          )}
        </div>

        {/* Panel Trigger - mobile only when bottom panel hidden */}
        {breakpoints.isMobile && !state.showBottomPanel && (
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg bg-background hover:bg-accent"
                onClick={actions.toggleBottomPanel}
              >
                <Grid3X3 className="h-5 w-5 text-primary" />
                <span className="sr-only">Open Layout Configuration</span>
              </Button>
            </SheetTrigger>
          </Sheet>
        )}
      </div>
    </div>
  );
}
