import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { AppRouter } from './router';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
