/**
 * @file ThemeManager.ts
 * @description Клас для керування світлою, темною та системною темами.
 * Зберігає вибір користувача у localStorage та реагує на зміни системних налаштувань.
 */

/**
 * Перелік доступних режимів теми.
 */
export enum ThemeMode {
  Light = "light",
  Dark = "dark",
  System = "system",
  Cyberpunk = "cyberpunk", // NEW: Додано режим Cyberpunk
}

/**
 * Ключ для збереження теми у localStorage.
 */
const LOCAL_STORAGE_KEY = "theme-preference";

/**
 * Клас ThemeManager керує застосуванням та збереженням теми веб-сайту.
 */
export class ThemeManager {
  private currentMode: ThemeMode;
  private mediaQuery: MediaQueryList | undefined;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.currentMode = this._getPreference() || ThemeMode.System;
    this._initializeTheme();
  }

  /**
   * Ініціалізує тему при завантаженні сторінки.
   * Встановлює слухача для системних змін теми, якщо обрано 'system' режим.
   */
  private _initializeTheme(): void {
    this._applyTheme(this.currentMode, true);

    // Слухаємо зміни системної теми, якщо поточний режим - 'system'
    if (typeof window !== "undefined" && window.matchMedia) {
      this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      this.mediaQuery.addEventListener("change", this._handleSystemThemeChange);
    }
  }

  /**
   * Застосовує вказану тему до елемента document.documentElement.
   * @param mode Режим теми для застосування (Light, Dark, System, Cyberpunk).
   * @param isInitialLoad Чи це початкове завантаження теми.
   */
  private _applyTheme(mode: ThemeMode, isInitialLoad: boolean = false): void {
    const htmlElement = document.documentElement;
    const actualTheme = this._getActualTheme(mode);

    // Видаляємо всі можливі класи тем
    htmlElement.classList.remove(ThemeMode.Light, ThemeMode.Dark, ThemeMode.Cyberpunk); // NEW: Додано Cyberpunk

    // Додаємо клас для поточної теми
    htmlElement.classList.add(actualTheme);

    // Оновлюємо поточний режим, якщо це не початкове завантаження
    if (!isInitialLoad) {
      this.currentMode = mode;
      this._savePreference(mode);
    }
    this._notifyListeners();
  }

  /**
   * Визначає фактичну тему (light/dark/cyberpunk) на основі обраного режиму та системних налаштувань.
   * @param mode Обраний режим теми.
   * @returns Фактична тема ('light', 'dark' або 'cyberpunk').
   */
  private _getActualTheme(mode: ThemeMode): "light" | "dark" | "cyberpunk" { // NEW: Додано cyberpunk
    if (mode === ThemeMode.System) {
      if (typeof window !== "undefined" && window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? ThemeMode.Dark : ThemeMode.Light;
      }
      return ThemeMode.Light; // Fallback for SSR or no matchMedia
    }
    return mode;
  }

  /**
   * Обробник зміни системної теми.
   * @param e Подія зміни MediaQueryList.
   */
  private _handleSystemThemeChange = (e: MediaQueryListEvent): void => {
    if (this.currentMode === ThemeMode.System) {
      this._applyTheme(ThemeMode.System); // Перезастосовуємо системну тему
    }
  };

  /**
   * Зберігає обраний режим теми у localStorage.
   * @param mode Режим теми для збереження.
   */
  private _savePreference(mode: ThemeMode): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    } catch (error) {
      console.warn("Failed to save theme preference to localStorage:", error);
    }
  }

  /**
   * Отримує збережений режим теми з localStorage.
   * @returns Збережений режим теми або null, якщо не знайдено.
   */
  private _getPreference(): ThemeMode | null {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (Object.values(ThemeMode).includes(stored as ThemeMode)) {
        return stored as ThemeMode;
      }
    } catch (error) {
      console.warn("Failed to read theme preference from localStorage:", error);
    }
    return null;
  }

  /**
   * Встановлює конкретний режим теми.
   * @param mode Режим теми (Light, Dark, System, Cyberpunk).
   */
  public setTheme(mode: ThemeMode): void {
    this._applyTheme(mode);
  }

  /**
   * Перемикає тему між Light, Dark, System та Cyberpunk.
   */
  public toggleTheme(): void {
    const modes = [ThemeMode.Light, ThemeMode.Dark, ThemeMode.System, ThemeMode.Cyberpunk]; // NEW: Додано Cyberpunk
    const currentIndex = modes.indexOf(this.currentMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    this.setTheme(modes[nextIndex]);
  }

  /**
   * Повертає поточний обраний режим теми (не фактичний, а збережений).
   * @returns Поточний режим теми.
   */
  public getMode(): ThemeMode {
    return this.currentMode;
  }

  /**
   * Повертає фактично застосовану тему ('light', 'dark' або 'cyberpunk').
   * @returns Фактично застосована тема.
   */
  public getActualTheme(): "light" | "dark" | "cyberpunk" { // NEW: Додано cyberpunk
    return this._getActualTheme(this.currentMode);
  }

  /**
   * Додає слухача, який буде викликаний при зміні теми.
   * @param listener Функція-слухач.
   */
  public addListener(listener: () => void): void {
    this.listeners.add(listener);
  }

  /**
   * Видаляє слухача.
   * @param listener Функція-слухач.
   */
  public removeListener(listener: () => void): void {
    this.listeners.delete(listener);
  }

  /**
   * Повідомляє всіх зареєстрованих слухачів про зміну теми.
   */
  private _notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  /**
   * Очищає слухачів та ресурси при знищенні.
   */
  public destroy(): void {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this._handleSystemThemeChange);
    }
    this.listeners.clear();
  }
}