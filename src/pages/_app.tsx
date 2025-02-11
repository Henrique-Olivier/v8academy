import type { AppProps } from 'next/app';
import { Open_Sans } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';
import { useRouter } from 'next/router';
import { CourseProvider } from '@/context/ProviderCourses';
import { ModalProvider } from '@/context/ProviderModal';

const openSans = Open_Sans({ subsets: ['latin'] })

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  const isCourseRoute = router.pathname.startsWith("/course");

  if (isCourseRoute) {
    return (
      <main className={openSans.className}>
        <CourseProvider>
          <ModalProvider>
          <Component {...pageProps} />
          </ModalProvider>
        </CourseProvider>
      </main>
    )
  }

  return (
    <main className={openSans.className}>
      <Component {...pageProps} />
    </main>
  )

}

export default MyApp;