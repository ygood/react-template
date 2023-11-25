import { IAction } from '@/provider/LanguageProvider';
import React from 'react';

interface Langs {
  [key: string]: string;
}
export interface ILanguage {
  lang: string;
  langs: Langs;
}
export interface ILanguageContext {
  state: ILanguage;
  langs: Langs;
  dispatch: React.Dispatch<IAction>;
  changeLanguage: (langKey: string) => void;
}

const defaultContext = {
  state: { lang: '', langs: {} },
  langs: {},
  dispatch: () => {},
  changeLanguage: () => {}
};

const languageContext = React.createContext<ILanguageContext>(defaultContext);
languageContext.displayName = 'LanguageContext';

export default languageContext;
