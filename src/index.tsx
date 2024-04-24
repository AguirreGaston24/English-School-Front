import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from './context/theme';
import { AuthProvider } from './context/auth';
import { AppRouter } from './router';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
