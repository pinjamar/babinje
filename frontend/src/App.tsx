import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container, Menu } from 'semantic-ui-react';
import ItemList from './pages/ItemList';
import { BabinjeItem } from './Models';

const App: React.FC = () => {
  return (
    <div>
      <Menu inverted>
        <Container>
          <Menu.Item as="div">Babinje</Menu.Item>
        </Container>
      </Menu>

      <Container text>
        <Outlet />
      </Container>
    </div>
  );
};

export default App;
