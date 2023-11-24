import React, { PropsWithChildren } from 'react';

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export default class ErrorBoundary extends React.Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { hasError: boolean; error: Error | null }
> {
  // 当子组件抛出异常时，这里会接收到并且调用
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  render() {
    const { children, fallbackRender } = this.props;
    if (this.state?.hasError) {
      return fallbackRender({ error: this.state?.error });
    }
    return children;
  }
}
