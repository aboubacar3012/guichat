"use client";
// import { ThemeProvider } from "@material-tailwind/react";
import { PropsWithChildren, useEffect } from "react";
import { Notifications } from "react-push-notification";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import BottomTab from "../components/BottomTab";
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';
import { SafeArea } from 'capacitor-plugin-safe-area';

export default function ProvidersLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      Keyboard.addListener('keyboardWillShow', (info) => {
        console.log('keyboard will show with height:', info.keyboardHeight);
        // document.body.style.setProperty('--keyboard-height', `-${info.keyboardHeight}px`);
        Keyboard.setScroll({ isDisabled: false });
      });

      Keyboard.addListener('keyboardWillHide', () => {
        console.log('keyboard will hide');
        document.body.style.removeProperty('--keyboard-height');
      });
    }
  }, []);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      (async function () {
        const safeAreaData = await SafeArea.getSafeAreaInsets();
        const { insets } = safeAreaData;
        for (const [key, value] of Object.entries(insets)) {
          document.documentElement.style.setProperty(
            `--safe-area-inset-${key}`,
            `${value}px`,
          );
        }
      })()
    }
  }, []);

  return (
    <div className="pt-safe px-safe pb-safe toolbar">
      <Notifications />
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          {/* <ThemeProvider>  */}
          {children}
          <BottomTab />
          {/* </ThemeProvider> */}
        </PersistGate>
      </Provider>
    </div>
  );
}
