import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Header } from '../components/Header';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import NProgress from 'nprogress';
import { SessionProvider as NextAthuProvider } from "next-auth/react";
import '../styles/global.scss';
import "react-toastify/dist/ReactToastify.css";


export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
 
    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);
 
    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);
  
  return (
    <>
      <NextAthuProvider session={pageProps.session}>
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={1350}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
        <Component {...pageProps} />
      </NextAthuProvider>
    </>
  )
}
