import React, { useState } from 'react';
import HomeLayout from './HomeLayout';
import ComponentMenus from './side-bar';
import Main from './main';
import PerprotysBar from './right-side-bar';

const Home: React.FC = () => {
  return (
    <HomeLayout
      left={<ComponentMenus></ComponentMenus>}
      home={<Main></Main>}
      right={<PerprotysBar></PerprotysBar>}
    ></HomeLayout>
  );
};

export default Home;
