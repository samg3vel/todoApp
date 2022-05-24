import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from "../lib/chakra/theme";
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { StrictMode } from 'react';
import React from 'react';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default MyApp
