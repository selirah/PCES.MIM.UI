import { useState, createContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import EN from 'lang/compiled/en.json';
import MK from 'lang/compiled/mk.json';

const MESSAGES = {
  en: { ...EN },
  mk: { ...MK },
};

export type LangTypes = 'en' | 'mk';

type ContextTypes = {
  locale: LangTypes;
  switchLanguage: (lang: LangTypes) => void;
};

const LocaleContext = createContext<ContextTypes>(null);

const LocaleContextProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = useState<LangTypes>('en');
  const [messages, setMessages] = useState(MESSAGES[locale]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('lang') as LangTypes;
      setLocale(lang ?? 'en');
      setMessages(MESSAGES[lang ?? 'mk']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchLanguage = (lang: LangTypes) => {
    setLocale(lang);
    setMessages(MESSAGES[lang]);
  };

  return (
    <LocaleContext.Provider value={{ locale, switchLanguage }}>
      <IntlProvider
        key={locale}
        locale={locale}
        messages={messages}
        defaultLocale="en"
        onError={() => null}
      >
        {children}
      </IntlProvider>
    </LocaleContext.Provider>
  );
};

export { LocaleContextProvider, LocaleContext };
