import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "../components/Layout";
import Image from "next/image";
import UserAuth from "../components/UserAuth";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  return (
    <>
      <Head>
        <title>Arrimo App</title>
        <meta name="description" content="Generated Arroimo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
