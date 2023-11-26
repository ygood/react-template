import { Select } from 'antd';
import { useCallback, useContext, useMemo } from 'react';
import earthPng from '@assets/image/earth.png';
import { languageContext } from '@/context';
import { languages } from '@/language';
import './_style.scss';

const { Option } = Select;

const LanguageSellect = () => {
  const languageCtx = useContext(languageContext);

  const xLanguages = useMemo(() => {
    return languages;
  }, []);

  const onLanguageChange = useCallback(
    (value: string) => {
      languageCtx.changeLanguage(value);
    },
    [languageCtx]
  );
  return (
    <>
      {xLanguages && xLanguages.length > 1 && (
        <div className="language-select-wapper">
          <img src={earthPng} alt="" />
          <Select
            className="language-select"
            size="large"
            value={languageCtx.state.lang}
            onChange={onLanguageChange}
          >
            {xLanguages.map((l: any) => (
              <Option key={l.display} value={l.value}>
                {l.display}
              </Option>
            ))}
          </Select>
        </div>
      )}
    </>
  );
};

export default LanguageSellect;
