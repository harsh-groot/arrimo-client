import React from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import { store } from "../store";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import { checkAuth } from "../utils/localStorageUtils/userInfo";
import { useRouter } from "next/dist/client/router";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  const [loader, setLoader] = useState(true);
  const router = useRouter();

  
  useEffect(() => {
    if(window && window.localStorage){
      setTimeout(() => {
        setLoader(false);        
      }, 800);

      if(checkAuth()){
        router.push('/calendar-events')
      }else{
        router.push('/auth')
      }
    }
  },[])

  return loader ? <div className="loader"><Spin size="large"/> </div>  : getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
