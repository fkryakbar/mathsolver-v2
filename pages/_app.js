import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#2e2e2e" />
      <Component {...pageProps} />
    </>
  );
}
