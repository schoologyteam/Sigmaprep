import './globals.css';
import 'semantic-ui-css/semantic.min.css';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@app/store/store.js';

import AppRouter from '@app/AppRouter';
import { ToastContainer } from 'react-toastify';
import mixpanel from 'mixpanel-browser';

export default function Main() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <AppRouter />
    </Provider>
  );
}

mixpanel.init('27ace4d02b50eacc12d13145de4d49fb', {
  debug: true,
  track_pageview: true,
  persistence: 'localStorage',
});

const root = createRoot(document.getElementById('root'));
root.render(<Main />);
