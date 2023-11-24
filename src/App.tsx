import './App.scss';
import { ConfigProvider } from 'antd';
import ErrorBoundary from '@/component/ErrorBoundary';
import { FullPageFallback } from '@/component/ErrorBoundary/lib';
import { HashRouter } from 'react-router-dom';
import Router from './router/routerBefore';

function App() {
  return (
    <ConfigProvider>
      <div className="app">
        <ErrorBoundary fallbackRender={FullPageFallback}>
          <HashRouter>
            <Router />
          </HashRouter>
        </ErrorBoundary>
      </div>
    </ConfigProvider>
  );
}

export default App;
