import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from './components/Toast';

import App from './App';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);
