"use client";

import * as React from "react";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { store } from "./index";
import { initializeToken } from "./slices/authSlice";

function AuthInitializer({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    store.dispatch(initializeToken());
  }, []);

  return <>{children}</>;
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <AuthInitializer>{children}</AuthInitializer>
      </Provider>
    </SessionProvider>
  );
}
