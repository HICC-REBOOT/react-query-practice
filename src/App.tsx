import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import Main from '@pages/Main';
import EditUser from '@components/User/EditUser';
import UserDetailPage from '@pages/user/UserDetail';
import UserPage from '@pages/user/User';
import Login from '@pages/login/Login';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/user/:nickname" element={<UserDetailPage />} />
        <Route path="/user/:nickname/edit" element={<EditUser />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
