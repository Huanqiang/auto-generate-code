import React, { ReactElement } from 'react';
import './layout.css';

type IProps = {
  left: ReactElement;
  home: ReactElement;
  right: ReactElement;
};

const Home: React.FC<IProps> = ({ left, home, right }) => {
  return (
    <div className="home-container">
      <div className="home-left-sider-bar">{left}</div>
      <div className="home-main-container">{home}</div>
      <div className="home-right-sider-bar">{right}</div>
    </div>
  );
};

export default Home;
