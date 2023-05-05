import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Layout from "@src/shared/layout";
import { StateProvider } from "@src/shared/state";
import "../styles/globals.css";
import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import * as gtag from "@src/shared/gtag";
import Head from "next/head";
import { WagmiProvider, chain, defaultChains } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

config.autoAddCss = false;

const infuraId = "edef52d9ebca4c1ca34269859cacff75";

// Chains for connectors to support
const chains = defaultChains;

const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    chain.mainnet.rpcUrls[0];
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      options: {
        appName: "TwoCents Protocol App",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
    `,
        }}
      />
      <Head>
        <title>TwoCents</title>
        <meta name="description" content="TwoCents" />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:title" content="Two Cents" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alpha.twocents.so" />
        <meta
          property="og:image"
          content="https://alpha.twocents.so/og/OpenGraph.png"
        />
        <meta
          property="og:description"
          content="Prove and reward Web3 contributors"
        />
        <meta name="theme-color" content="#FF0000" />
      </Head>
      <WagmiProvider autoConnect={true} connectors={connectors}>
        <StateProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StateProvider>
      </WagmiProvider>
    </>
  );
}
export default MyApp;
