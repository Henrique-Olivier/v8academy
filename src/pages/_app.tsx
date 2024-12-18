import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

const openSans = Open_Sans({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={openSans.className}>
      <Component {...pageProps} />
    </main>
  )

}

export default MyApp;