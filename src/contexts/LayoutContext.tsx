import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type SidebarMode = 'pinned-full' | 'interactive-hover' | 'hidden';

interface LayoutContextType {
  sidebarMode: SidebarMode;
  setSidebarMode: (mode: SidebarMode) => void;
  setTemporarySidebarMode: (mode: SidebarMode | null) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>('pinned-full');
  const [temporarySidebarMode, setTemporarySidebarMode] = useState<SidebarMode | null>(null);
  const location = useLocation();

  // Reset temporary mode when navigating away from a page that set it
  useEffect(() => {
    setTemporarySidebarMode(null); // Clear temporary mode on route change
  }, [location.pathname]);

  const effectiveSidebarMode = temporarySidebarMode || sidebarMode;

  const contextValue = useMemo(() => ({
    sidebarMode: effectiveSidebarMode,
    setSidebarMode,
    setTemporarySidebarMode,
  }), [effectiveSidebarMode, setSidebarMode, setTemporarySidebarMode]);

  return (
    <LayoutContext.Provider value={contextValue}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};