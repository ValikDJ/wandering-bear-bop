import { useState, useEffect } from 'react';

/**
 * Хук useDebounce затримує оновлення значення до тих пір, поки не пройде певний час без подальших змін.
 * Корисно для оптимізації функцій, які не повинні викликатися занадто часто (наприклад, пошук, введення тексту).
 *
 * @param value Значення, яке потрібно затримати.
 * @param delay Затримка в мілісекундах.
 * @returns Затримане значення.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Встановлюємо таймер, який оновлює debouncedValue після затримки
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Очищаємо таймер, якщо значення змінилося або компонент розмонтується
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Перезапускаємо ефект, якщо value або delay змінилися

  return debouncedValue;
}