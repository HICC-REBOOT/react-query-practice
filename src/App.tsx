import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserDetail from '@pages/userDetail/UserDetail';
import Layout from '@components/layout/Layout';
import Main from '@pages/Main';
import User from '@pages/user/User';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/user" element={<User />} />
        <Route path="/user/:nickname" element={<UserDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
