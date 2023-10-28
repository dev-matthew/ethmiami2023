import './App.css';
import { SubgraphService } from "@unlock-protocol/unlock-js";
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, ConnectButton, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { injectedWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import Logo from "./assets/logo512.png";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [
    publicProvider()
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains })
    ]
  }
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
});

const service = new SubgraphService();
const locks = await service.locks(
  {
    where: {
      address: "0x28ad99fc6ef248351de677b75a71dc96b6ca2e8a"
    }
  }
);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className='Header'>
          <img className='Logo' src={Logo} />
          <div className='ConnectButtonWrapper'><ConnectButton label="Connect Wallet" /></div>
        </div>
        <div className='Body'>
          {locks.map((lock) => (
            <div key={lock.address}>
              <h1>{lock.name}</h1>
              <p>{lock.address}</p>
            </div>
          ))}
        </div>
        {/* <div class="card">
          E
        </div> */}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
