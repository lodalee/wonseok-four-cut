import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import { store, persistor } from "./store";
import theme from "./lib/style/theme";

const Providers = ({ children }: { children: ReactNode }) => {
  const queryErrorHandler = (error) => {
    // toast(`데이터를 가져오지 못했습니다! ${error.message}`);
    console.log(`데이터를 가져오지 못함!  ${error.message}`);
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
        retry: 0,
        suspense: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </PersistGate>
        </Provider>
      </CookiesProvider>
    </QueryClientProvider>
  );
};
export default Providers;
