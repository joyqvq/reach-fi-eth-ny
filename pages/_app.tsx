import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { baseGoerli } from "wagmi/chains";
import { theme } from "../styles/theme";
import Footer from "../components/core/Footer";
import "@web3inbox/widget-react/dist/compiled.css";
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { InjectedConnector } from 'wagmi/connectors/injected'

// import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import Navbar from "../components/core/Navbar";

const { chains, publicClient } = configureChains(
	[baseGoerli],
	[
	  jsonRpcProvider({
		rpc: () => ({
		http: 'https://summer-rough-crater.base-goerli.discover.quiknode.pro/' // 👈 Replace this with your HTTP URL from the previous step
		}),
	  })
	]
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    connectors: [
      new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
      })
    ]
    })

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

// 2. Configure Web3Modal
// const wagmiConfig = defaultWagmiConfig({
//   chains,
//   projectId,
//   appName: "Kent Ave Bagel Shop",
// });

// createWeb3Modal({ wagmiConfig: config, projectId, chains });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={config}>
          <Grid
            templateAreas={`"header" "main" "footer"`}
            w="100%"
            width="100%"
            gridTemplateRows={"100px 3f 40px"}
            gridTemplateColumns={"1fr"}
            paddingY="2em"
          >
            <GridItem area={"header"} padding={4}>
              <Navbar />
            </GridItem>
            <GridItem area={"main"} padding={10}>
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Component {...pageProps} />
              </Flex>
            </GridItem>
            <GridItem area={"footer"}>
              <Footer />
            </GridItem>
          </Grid>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
}

export default MyApp;