import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type SidebarMode = 'pinned-full' | 'interactive-hover' | 'hidden';

interface LayoutContextType {
  sidebarMode: SidebarMode;
  setSidebarMode: (mode: SidebarMode) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayoutProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  // Determine initial sidebar mode based on route
  const getInitialSidebarMode = (): SidebarMode => {
    if (location.pathname === '/homework') {
      return 'interactive-hover'; // Collapsed by default for homework
    }
    // You might want to load a user preference from localStorage here for other pages
    return 'hidden'; // NEW: Default to hidden for other pages
  };

  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(getInitialSidebarMode);

  // Effect to update sidebarMode if the path changes to/from homework
  useEffect(() => {
    setSidebarMode(getInitialSidebarMode());
  }, [location.pathname]); // Re-evaluate when pathname changes

  const contextValue = useMemo(() => ({
    sidebarMode,
    setSidebarMode,
  }), [sidebarMode, setSidebarMode]);

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