import { useState } from 'react';

interface State<D> {
  data: D | null;
  error: Error | null;
  stat: 'idle' | 'loading' | 'success' | 'error';
}
const defaultState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
};

const useAsync = <D>(initState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultState,
    ...initState
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: 'success',
      error: null
    });

  const setError = (error: Error) => {
    setState({
      data: null,
      stat: 'error',
      error
    });
  };

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error('请传入promise类型的数据');
    }
    setState({ ...state, stat: 'loading' });
    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        console.log('run error', error);
        setError(error.message);
        return error.message;
      });
  };

  return {
    isIdle: state.stat === 'idle',
    isLoading: state.stat === 'loading',
    isSuccess: state.stat === 'success',
    isError: state.stat === 'error',
    run,
    setData,
    setError,
    ...state
  };
};
export default useAsync;
