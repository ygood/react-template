import LanguageSellect from '@/component/LanguageSelect';
import { Layout } from 'antd';

const { Header } = Layout;

const LayoutHeader = () => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    background: '#3C9EF4',
    FlexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgb(222, 224, 227)',
    width: '100%',
    padding: '0px 20px'
  };
  return (
    <Header style={style}>
      <div className="demo-logo" />
      <LanguageSellect />
    </Header>
  );
};

export default LayoutHeader;
