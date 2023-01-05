import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { ToastContainer } from 'react-toastify';
import Router from 'next/router';
import NProgress from 'nprogress';
import { SessionProvider as NextAthuProvider } from "next-auth/react";
import '../styles/global.scss';
import "react-toastify/dist/ReactToastify.css";

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }: AppProps) {
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
