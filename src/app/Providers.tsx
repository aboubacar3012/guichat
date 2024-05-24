"use client";
// import { ThemeProvider } from "@material-tailwind/react";
import { PropsWithChildren, useEffect } from "react";
import { Notifications } from "react-push-notification";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Notifications />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {/* <ThemeProvider>  */}
          {children as any}
          {/* </ThemeProvider> */}
        </PersistGate>
      </Provider>
    </div>
  );
}
