"use client";

import { Header } from "@/components/header";
import { MainSection } from "@/components/main-section";
import { BottomPanel } from "@/components/bottom-panel";
import { FloatingButton } from "@/components/floating-button";
import { useLayoutState } from "@/hooks/use-layout-state";

export default function LayoutBuilder() {
  const { state, actions, breakpoints } = useLayoutState();

  // Bottom panel height in px (h-64 = 16rem = 256px)
  const bottomPanelOffset =
    state.showBottomPanel && (breakpoints.isDesktop || breakpoints.isMobile)
      ? 256
      : 0;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - sticky without collapse behavior */}
      <Header isCollapsed={false} />

      {/* Main content area */}
      <div className="flex-1 flex flex-col relative">
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
            onClose={
              breakpoints.isMobile ? actions.toggleBottomPanel : undefined
            }
          />
        )}
      </div>

      {/* Floating Button - mobile only when bottom panel hidden */}
      {breakpoints.isMobile && !state.showBottomPanel && (
        <FloatingButton onClick={actions.toggleBottomPanel} />
      )}
    </div>
  );
}
