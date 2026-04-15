import App from '../../App';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from '../common/ErrorBoundary';
import React from 'react';

// 这是一个极其精简的 Layout 壳子，真正的 UI 逻辑转移到 App.jsx 中通过 CyberLayout 处理
const PageLayout = () => {
  return (
    <div className='app-container'>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      <ToastContainer />
    </div>
  );
};

export default PageLayout;
