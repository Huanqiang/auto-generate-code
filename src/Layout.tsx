import React from 'react';
import Header from './components/header';
import Home from './pages/home';
// import './App.css';

const Layout: React.FC = () => {
  return (
    <div>
      <Header></Header>
      <Home></Home>
    </div>
  );
};

export default Layout;
