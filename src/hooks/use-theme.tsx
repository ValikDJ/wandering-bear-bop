/**
 * @file use-theme.ts
 * @description React хук та контекст для інтеграції ThemeManager у компоненти React.
 */

import React, { useContext, useEffect, useState, useMemo } from "react";
import { ThemeManager, ThemeMode } from "@/lib/ThemeManager";

// Створюємо екземпляр ThemeManager поза компонентом, щоб він був синглтоном
const themeManagerInstance = new ThemeManager();

/**
 * Інтерфейс для значень, що надаються контекстом теми.
 */
interface ThemeContextType {
  mode: ThemeMode; // Обраний режим (light, dark, system)
  actualTheme: "light" | "dark"; // Фактично застосована тема (light або dark)
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

// Створюємо контекст теми
const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

/**
 * Компонент ThemeProvider, який надає доступ до ThemeManager через контекст.
 * @param {React.PropsWithChildren} props - Властивості компонента, включаючи дочірні елементи.
 */
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(themeManagerInstance.getMode());
  const [actualTheme, setActualTheme] = useState<"light" | "dark">(themeManagerInstance.getActualTheme());

  // Оновлюємо стан компонента при зміні теми в ThemeManager
  useEffect(() => {
    const listener = () => {
      setMode(themeManagerInstance.getMode());
      setActualTheme(themeManagerInstance.getActualTheme());
    };
    themeManagerInstance.addListener(listener);
    return () => {
      themeManagerInstance.removeListener(listener);
    };
  }, []);

  // Мемоізуємо значення контексту, щоб уникнути зайвих ререндерів
  const contextValue = useMemo(() => ({
    mode,
    actualTheme,
    setTheme: (newMode: ThemeMode) => themeManagerInstance.setTheme(newMode),
    toggleTheme: () => themeManagerInstance.toggleTheme(),
  }), [mode, actualTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Хук `useTheme` для доступу до контексту теми.
 * @returns Об'єкт з поточним режимом теми, фактичною темою та функціями для її зміни.
 * @throws {Error} Якщо хук використовується поза ThemeProvider.
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};