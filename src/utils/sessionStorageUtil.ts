export const sessionStoragePreKey = '__bug__';

// 多语言
export const getLang = () =>
  sessionStorage.getItem(`${sessionStoragePreKey}lang`);

export const setLang = (lang: string) =>
  sessionStorage.setItem(`${sessionStoragePreKey}lang`, lang);

// 登录状态
export const getLoginStatus = () =>
  sessionStorage.getItem(`${sessionStoragePreKey}LoginStatus`);

export const setLoginStatus = (status: string) =>
  sessionStorage.setItem(`${sessionStoragePreKey}LoginStatus`, status);
