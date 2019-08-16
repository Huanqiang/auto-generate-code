import React from 'react';
import Layout from './Layout';
import { Provider } from 'react-redux';
import store from './store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Layout></Layout>
    </Provider>
  );
};

export default App;
