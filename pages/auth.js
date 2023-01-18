import React from 'react'
import Layout from '../components/Layout';
import UserAuth from '../components/UserAuth'

const AuthPage = () => {
  return (
    <div>
      <UserAuth/>
    </div>
  )
}

AuthPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default AuthPage