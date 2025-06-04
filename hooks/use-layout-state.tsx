"use client";

import { useState, useEffect } from "react";
import { useResponsive } from "./use-responsive";

export interface LayoutState {
  showBottomPanel: boolean;
  mainExpanded: boolean;
  headerHeight: number;
  bottomPanelHeight: number;
}

export function useLayoutState() {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const [state, setState] = useState<LayoutState>({
    showBottomPanel: !isMobile, // Show by default on desktop/tablet, hidden on mobile
    mainExpanded: false,
    headerHeight: 80,
    bottomPanelHeight: 200,
  });

  // Auto-hide bottom panel on mobile, show on desktop/tablet
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      showBottomPanel: !isMobile,
    }));
  }, [isMobile]);

  const actions = {
    toggleBottomPanel: () => {
      setState((prev) => ({
        ...prev,
        showBottomPanel: !prev.showBottomPanel,
      }));
    },

    toggleMainExpanded: () => {
      setState((prev) => ({
        ...prev,
        mainExpanded: !prev.mainExpanded,
      }));
    },

    setHeaderHeight: (height: number) => {
      setState((prev) => ({
        ...prev,
        headerHeight: height,
      }));
    },

    setBottomPanelHeight: (height: number) => {
      setState((prev) => ({
        ...prev,
        bottomPanelHeight: height,
      }));
    },
  };

  const breakpoints = {
    isMobile,
    isTablet,
    isDesktop,
  };

  return {
    state,
    actions,
    breakpoints,
  };
}
