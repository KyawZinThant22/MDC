import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import "react-toastify/dist/ReactToastify.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Header />
      <ToastContainer />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
