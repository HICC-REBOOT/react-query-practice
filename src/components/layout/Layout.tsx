import React from 'react';
import { Outlet } from 'react-router-dom';
import * as L from './style/Layout.style';

function Layout() {
  return (
    <L.Container>
      <Outlet />
    </L.Container>
  );
}

export default Layout;
