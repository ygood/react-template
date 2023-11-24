import { Result, Spin } from 'antd';
import { ReactNode } from 'react';

const style = {
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const loadingStyle = {
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

export const FullPage = ({ children }: { children: ReactNode }) => (
  <div style={style}>{children}</div>
);

export const FullPageFallback = ({ error }: { error: Error | null }) => {
  return (
    <FullPage>
      <Result
        status={500}
        title={'Sorry, something went wrong.'}
        subTitle={error?.message}
      />
    </FullPage>
  );
};

export const FullPageLoading: React.FunctionComponent<
  React.PropsWithChildren<object>
> = () => {
  return (
    <div style={loadingStyle}>
      <Spin />
    </div>
  );
};
