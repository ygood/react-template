import { ReactNode, useEffect, useMemo, useReducer, useState } from 'react';
import { ILanguage, languageContext } from '@/context';
import http from '@/http/http';
import { getLang, setLang } from '@/utils/sessionStorageUtil';
import { ConfigProvider } from 'antd';
import { defaultlang, languages } from '@/language';
import TableEmptyData from '@/component/TableEmptyData';

const initialState = {
  lang: defaultlang,
  langs: {}
};
const initStore = () => {
  return { ...initialState };
};
export interface IAction {
  type: string;
  value: any;
}

function reducer(state: ILanguage, action: IAction) {
  switch (action.type) {
    case 'change':
      // eslint-disable-next-line no-case-declarations
      const { lang, langs } = action.value;
      window.WWLangs = langs;
      return { ...state, lang, langs };
    default:
      throw new Error();
  }
}
const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState, initStore);
  const [, setLangKey] = useState(defaultlang);

  useEffect(() => {
    const lang = getLang() || '';
    setLangKey(lang as string);
    changeLanguage(lang);
  }, []);

  const changeLanguage = (lang: string) => {
    if (!lang) lang = defaultlang;
    http(`i18n/${lang}.json`).then((data: { [key: string]: string }) => {
      // 切换语言时保存用户设置语言到session storage 防止刷新都是用户设置的语言
      setLang(lang);
      dispatch && dispatch({ type: 'change', value: { lang, langs: data } });
    });
  };

  const { Provider } = languageContext;

  const antdlang = useMemo(() => {
    const curlang = languages.find((lang: any) => lang.value === state.lang);
    return curlang?.antdlangs;
  }, [state.lang]);

  return (
    <ConfigProvider locale={antdlang} renderEmpty={TableEmptyData}>
      <Provider value={{ state, langs: state.langs, dispatch, changeLanguage }}>
        {children}
      </Provider>
    </ConfigProvider>
  );
};

export default LanguageProvider;
