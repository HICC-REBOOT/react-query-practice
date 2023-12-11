import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import Main from '@pages/Main';
import UserDetail from '@pages/user/userDetail/UserDetail';
import UserList from '@components/User/UserList';
import EditUser from '@components/User/EditUser';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/user/:nickname" element={<UserDetail />} />
        <Route path="/user/:nickname/edit" element={<EditUser />} />
      </Route>
    </Routes>
  );
}

export default App;
