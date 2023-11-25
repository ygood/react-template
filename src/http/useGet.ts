import { useEffect } from 'react';
import { ResponseINF } from '@/entity/ResponseINF';
import { useHttp } from './http';
import useAsync from './useAsync';

const useGet = <T>(url: string, param: { [key: string]: any } = {}) => {
  const client = useHttp();
  const { run, ...result } = useAsync<ResponseINF<T>>();
  const play = () => {
    return run(client(url, param || {}));
  };
  useEffect(() => {
    play();
    //eslint-disable-next-line
  }, []);
  return { ...result, replay: play };
};

export default useGet;
