import './App.css';
import { SubgraphService } from "@unlock-protocol/unlock-js";
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, ConnectButton, connectorsForWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { injectedWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';
import Logo from "./assets/logo.png";

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
const temp = await service.locks(
  {
    where: {
      address: "0x4a95e5aded54dece78cb580ea78a0561270c5ef1"
    }
  }
);
var locks = [];
for (let i = 0; i < temp.length; i += 1) {
  locks.push(JSON.parse(JSON.parse(temp[i].name.replace(/(?:\\[rn])+/g, ''))));
  console.log(locks[i]);
}
locks.push({
  "Address": "14360 SW 172nd St, Miami, FL 33177",
  "Description": "Amazing opportunity3/2-bathroom promises an inviting living experience in a coveted location. With close proximity to local markets, major highways, and nestled in a warm and friendly neighborhood, Call or text  for showing instructions.NO ASSOCIATION! The motivated Seller .SALE As Is.",
  "Image": "https://photos.zillowstatic.com/fp/3dce2660398ef2fbc83ade9b1bef6890-cc_ft_768.png",
  "Zillow": "https://www.zillow.com/homedetails/6502-Kendale-Lakes-Dr-APT-201-Miami-FL-33183/44257528_zpid/",
  "Duration": "30 years",
  "TotalValue": "$410,000",
  "DownPayment": "$80,000",
  "InterestRate": "10%",
  "MonthlyPayment": "$2,250",
  "PurchaseLink": "https://app.unlock-protocol.com/checkout?id=3a3a9145-6a28-4b22-adfa-cd7f510e6e9e"
})
locks.push({
  "Address": "4265 NW South Tamiami Canal Dr #1-101, Miami, FL 33126",
  "Description": "Huge price reduction!! Phenomenal place with large 2 bedroom. Key location!!! Building locate in a cul-de-sac street with very easy access to major roadways and public transportation. The building features a pool and and gated parking, one assigned space for the unit, plus guest parking.  Remodeled kitchen, large walk-in closet. Nice garden views. Rentals ok in the building. Please see broker remarks!!",
  "Image": "https://photos.zillowstatic.com/fp/9ed00938396cc3bc4f640d43e25d926b-cc_ft_768.png",
  "Zillow": "https://www.zillow.com/homedetails/4265-NW-South-Tamiami-Canal-Dr-1-101-Miami-FL-33126/43820837_zpid/",
  "Duration": "20 years",
  "TotalValue": "$219,000",
  "DownPayment": "$50,000",
  "InterestRate": "10%",
  "MonthlyPayment": "$1,765",
  "PurchaseLink": "https://app.unlock-protocol.com/checkout?id=3a3a9145-6a28-4b22-adfa-cd7f510e6e9e"
})

function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <div className='Header'>
          <img className='Logo' src={Logo} />
          <span className='Title'><b>NFDeed</b></span>
          <div className='ConnectButtonWrapper'><ConnectButton label="Connect Wallet" /></div>
        </div>
        <div className='Body'>
          <span className='AvailableListingsTitle'>Available Listings</span>
          <div className='AvailableListings'>
            {locks.map((lock, i) => (
              <div className="Listing" key={i}>
                <img className="ListingImage" src={lock.Image} />
                <h1 className="ListingTitle">{lock.Address}</h1>
                <p className="ListingDescription">{lock.Description}</p>
                <p className="ListingTotal"><b>Total:</b> {lock.TotalValue}</p>
                <p className="ListingDown"><b>Down Payment:</b> {lock.DownPayment}</p>
                <p className="ListingMonthly"><b>Monthly Payment:</b> {lock.MonthlyPayment}</p>
                <p className="ListingInterest"><b>Interest Rate:</b> {lock.InterestRate}</p>
                <p className="ListingDuration"><b>Duration:</b> {lock.Duration}</p>
                <button className="ListingPurchase" onClick={() => {
                  window.open(lock.PurchaseLink, '_blank');
                }}>Purchase</button>
                <a className="ListingZillow" href={lock.Zillow} target="_blank">View on Zillow</a>
              </div>
            ))}
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
