import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig, useAccount, WagmiConfig, useDisconnect, useSignMessage } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import { useWeb3Modal,Web3Modal } from '@web3modal/react'
// import { registerWithKeyServer } from './campaign/chatDapp'
import { useState } from "react";
import { Web3Button } from "@web3modal/react";
import {registerWithKeyServer} from '../lib/chatDapp';



const chains = [arbitrum, mainnet, polygon]
const projectId = 'c03074094b17926abe3c0c0762fced2e' // TODO(philipglazman): use NEXT ENV instead

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

// async function register() {
//   const { isOpen, open, close, setDefaultChain } = useWeb3Modal()  
  
//   await open()
//   // Register key server
//   // let account = useAccount();
  
//   // await registerWithKeyServer(account.address);
//   // Your logic here
//   console.log("Button clicked");
// };

export function CustomButton() {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const label = isConnected ? "Disconnect" : "Connect Custom";

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  function onClick() {
    if (isConnected) {
      disconnect();
    } else {
      onOpen();
    }
  }

  return (
  
    <button onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : label}
    </button>
  );
}

export function Send() {
  
}

export function Register() {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data, isError, isLoading, isSuccess, signMessage, signMessageAsync } = useSignMessage({
    message: 'gm wagmi frens',
  })

  // if (isConnected) {
    async function onClick() {
      console.log("registering with key server")
    //   const { data: signMessageData, error, isLoading, signMessage, variables } = useSignMessage({
    //     message: "test"
    // });
    //   console.log(error)
      await signMessageAsync()
      console.log(data)
      console.log(address)
      
      while (typeof data === 'undefined') {
        await new Promise((resolve) => setTimeout(resolve, 2));
      }
      console.log(data)
      // WAIT UNTIL SIGNED
      registerWithKeyServer(address!.toString(), data!.toString());
    }

    return (
      <WagmiConfig config={wagmiConfig}>
      <button disabled={isLoading} onClick={onClick}>Register</button>
      </WagmiConfig>
    )
  }

export default function Login() {
  // const { isConnected } = useAccount();

  // if (!isConnected) {
  return (
    <>
    <WagmiConfig config={wagmiConfig}>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    <Web3Button icon="show" label="Connect Wallet" balance="show" />
    <Register />
    </WagmiConfig>
  </>
  )
  // } else {
  //   console.log("is connected!")
  //   return (
  //     <></>
  //   )
  // }

  // return <button onClick={() => open()}>Sign In</button>
}