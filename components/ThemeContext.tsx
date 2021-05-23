import { createContext, ReactNode, useEffect, useState } from 'react';

interface ThemeContext {
    darkMode: boolean | null;
    setDarkMode: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

interface ThemeProvider {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProvider) {
    const [darkMode, rawSetDarkMode] = useState<boolean | null>(null);

    function setDarkMode(value: boolean) {
        rawSetDarkMode(value);
        if (value) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    useEffect(() => {
        rawSetDarkMode(document.documentElement.classList.contains('dark'));

        const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)');
        darkThemeMq.addEventListener('change', (e) => setDarkMode(e.matches));

        return () =>
            darkThemeMq.removeEventListener('change', (e) =>
                setDarkMode(e.matches)
            );
    }, []);

    return (
        <ThemeContext.Provider
            value={{
                darkMode,
                setDarkMode
            }}>
            {children}
        </ThemeContext.Provider>
    );
}
