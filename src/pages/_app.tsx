import { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextAthuProvider } from "next-auth/react"

import '../styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextAthuProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </NextAthuProvider>
  )
}
