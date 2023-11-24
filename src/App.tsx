import './App.scss';
import ReactLogo from '@/assets/react.svg?react';
import ReactUrl from '@/assets/react.svg';
import SvgIcon from '@/component/SvgIcon';

function App() {
  return (
    <>
      {/* svg组件实例 */}
      <ReactLogo />
      <h1 className="title">Vite + React</h1>
      {/* 直接引入 */}
      <img src={ReactUrl} alt="" />
      {/* 引入远端资源 */}
      <img
        src={
          new URL('./assets/react.svg', import.meta.env.VITE_IMG_BASE_URL).href
        }
        alt=""
      />
      {/* 雪碧图 */}
      <SvgIcon name="network" width="50" height="50" />
    </>
  );
}

export default App;
