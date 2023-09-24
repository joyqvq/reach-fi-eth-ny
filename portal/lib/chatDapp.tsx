import { Core } from '@walletconnect/core'
import { ChatClient, IChatClient } from '@walletconnect/chat-client'
import { ISyncClient, SyncClient, SyncStore } from '@walletconnect/sync-client'
import { IdentityKeys } from '@walletconnect/identity-keys'


// Initialize core separately to allow sharing it between sync and chat
// const core = new Core({
//   projectId: 'c03074094b17926abe3c0c0762fced2e'
// })

// // SyncClient enables syncing data across devices
// const syncClient = await SyncClient.init({
//   projectId: 'c03074094b17926abe3c0c0762fced2e',
//   core
// })

// const chatClient = await ChatClient.init({
//     core,
//     projectId: 'c03074094b17926abe3c0c0762fced2e',
//     keyserverUrl: 'https://keys.walletconnect.com',
//     syncClient,
//     SyncStoreController: SyncStore
// })

export let chatClient: IChatClient
export let syncClient: ISyncClient


export async function createChatClient() {
  const projectId = 'c03074094b17926abe3c0c0762fced2e'

  const core = new Core({ projectId })

  syncClient = await SyncClient.init({
    core,
    projectId,
    // relayUrl: 'wss://relay.walletconnect.com'
  })

  let keys =  new IdentityKeys(core);

  chatClient = await ChatClient.init({
    logger: 'debug',
    identityKeys: keys,
    keyserverUrl: 'https://keys.walletconnect.com',
    projectId: 'c03074094b17926abe3c0c0762fced2e',
    // relayUrl: 'wss://relay.walletconnect.com',
    syncClient,
    SyncStoreController: SyncStore
  })
}

// Register brand manager's addres
export async function registerWithKeyServer(address: string, sig: string) {
  try {
    await createChatClient();
    console.log(address)
    await chatClient.register({ account: `eip155:1:`+ address, onSign: async (sig) => {
          console.log(sig);
           return sig;
        } });
    console.log("registered with key server");
      } catch (e) {
        console.log(e);
      }
}

export async function messageDapp(from: string, to: string, message: string) {
    await createChatClient();
    const inviteePublicKey = await chatClient.resolve({ account: 'eip155:1:' + to })
    await chatClient.invite({
    message: message,
    inviterAccount: `eip155:1:` + from, // your CAIP-2 formatted account that you registered previously.
    inviteeAccount: 'eip155:1:' + to, // the CAIP-2 formatted account of the recipient.
    inviteePublicKey
    });
}