"use client";

import { Provider } from "react-redux";
import { store } from "@/state/store";
import { ReactNode } from "react";
import Cart from "@/components/Cart";
import Navbar from "./Navbar";
import Footer from "./Footer";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Navbar />
      <Cart />
      <main>{children}</main>
      <Footer />
    </Provider>
  );
}
