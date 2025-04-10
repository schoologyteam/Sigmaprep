import './globals.css';
import 'semantic-ui-css/semantic.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@app/store/store.js';

import AppRouter from '@app/AppRouter';
import { ToastContainer } from 'react-toastify';

export default function Main() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <AppRouter />
    </Provider>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<Main />);
