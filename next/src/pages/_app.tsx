import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { nanoid } from "nanoid";
console.log(nanoid());

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
