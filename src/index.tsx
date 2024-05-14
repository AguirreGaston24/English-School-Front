import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner'

import { AuthProvider, DataProvider, ThemeProvider } from './context';
import { AppRouter } from './router';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <DataProvider>
          <AppRouter />
          <Toaster />
        </DataProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);
