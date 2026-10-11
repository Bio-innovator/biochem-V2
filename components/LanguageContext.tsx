'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'zh' | 'en';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'zh',
  setLang: () => {},
  toggleLang: () => {},
});

const LANG_KEY = 'lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  // 首次进入：优先读取用户手动选择；否则按浏览器系统语言判断
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_KEY);
      if (saved === 'zh' || saved === 'en') {
        setLangState(saved);
        return;
      }
      const nav = (navigator.language || 'zh').toLowerCase();
      setLangState(nav.startsWith('zh') ? 'zh' : 'en');
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
  };

  const toggleLang = () => setLang(lang === 'zh' ? 'en' : 'zh');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
