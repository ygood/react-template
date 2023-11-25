import { Empty } from 'antd';
import { useContext } from 'react';
import { languageContext } from '@/context';
import emptyImg from '@assets/image/empty.png';

const TableEmptyData = () => {
  //prettier-ignore
  const { state: { langs } } = useContext(languageContext);
  return (
    <>
      <Empty image={emptyImg} description={langs.tableEmptyData} />
    </>
  );
};

export default TableEmptyData;
