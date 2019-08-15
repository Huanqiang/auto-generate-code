import React, { useState } from 'react';
import HomeLayout from './HomeLayout';
import ComponentMenus from './side-bar';
import Main from './main';
import PerprotysBar from './right-side-bar';

import { components } from '../../mock';

const Home: React.FC = () => {
  const [component, setComponent] = useState<IComponentClass | undefined>(
    undefined
  );
  return (
    <HomeLayout
      left={
        <ComponentMenus
          components={components}
          onCreateComponent={c => setComponent(c)}
        ></ComponentMenus>
      }
      home={<Main componentType={component}></Main>}
      right={<PerprotysBar></PerprotysBar>}
    ></HomeLayout>
  );
};

export default Home;
