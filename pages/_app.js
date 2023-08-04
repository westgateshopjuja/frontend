import Head from "next/head";
import {
  Button,
  MantineProvider,
  Text,
  createEmotionCache,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { withUrqlClient } from "next-urql";
import { SessionProvider, signIn } from "next-auth/react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";

import "tailwindcss/tailwind.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import UserData from "../context/userdata";

export const searchClient = algoliasearch(
  "YTL735AQT8",
  "1c20f00d762ed7fa5d4d751839fa5990"
);

function App(props) {
  const {
    Component,
    pageProps: { session, ...pageProps },
  } = props;

  const myCache = createEmotionCache({
    key: "mantine",
    prepend: false,
  });

  const TestModal = ({ context, id, innerProps }) => (
    <>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Button
        uppercase
        fullWidth
        color="dark"
        radius={null}
        mt="md"
        onClick={signIn}
      >
        go to login
      </Button>
    </>
  );

  return (
    <>
      <SessionProvider session={session}>
        <Head>
          <title>Page title</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>

        <MantineProvider
          emotionCache={myCache}
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: "light",
            fontFamily: "Satoshi",
          }}
        >
          <ModalsProvider modals={{ login: TestModal /* ...other modals */ }}>
            <Notifications />
            <InstantSearch searchClient={searchClient} indexName="thrifthub">
              <UserData>
                <Component {...pageProps} />
              </UserData>
            </InstantSearch>
          </ModalsProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}

export default withUrqlClient((_ssrExchange, ctx) => ({
  // ...add your Client options here
  url: process.env.NEXT_PUBLIC_SERVER_REMOTE,
}))(App);
