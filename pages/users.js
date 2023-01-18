import React from 'react'
import UserProfile from '../components/UserProfile'
import Layout from '../components/Layout';

const UsersPage = () => {
  return (
    <UserProfile/>
  )
}

UsersPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UsersPage