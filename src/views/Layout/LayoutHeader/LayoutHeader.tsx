import { Layout } from 'antd';

const { Header } = Layout;

const LayoutHeader = () => {
  const style = {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderBottom: '1px solid rgb(222, 224, 227)',
    width: '100%',
    padding: '0px'
  };
  return (
    <Header style={style}>
      <div className="demo-logo" />
    </Header>
  );
};

export default LayoutHeader;
