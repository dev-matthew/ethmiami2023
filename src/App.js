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
      address: "0x2f95e08c56bb60ac1dad47c7686f3fb41c6259eb",
      //name_contains_nocase: "Test-Lock"
    }
  }
);

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className='Header'>
          <img className='Logo' src={Logo} />
          <span className='Title'>Title</span>
          <div className='ConnectButtonWrapper'><ConnectButton label="Connect Wallet" /></div>
        </div>
        <div className='Body'>
          <div className='User'>
            <div className='UserNav'>
              <div className='Slider'></div>
              <span className='Available' onClick={() => console.log("test")}>Available Listings</span>
              <span className='My'>My Properties</span>
            </div>
            <div className='AvailableListings'>
              {locks.map((lock) => (
                <div className="Listing" key={lock.address}>
                  <h1 className="ListingTitle">{lock.name}</h1>
                  <p className="ListingAddress">{lock.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
