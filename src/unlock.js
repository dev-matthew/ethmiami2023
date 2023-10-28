const ethers = require("ethers");
const { WalletService } = require("@unlock-protocol/unlock-js");

const networks = {
  4: {
    unlockAddress: "0x627118a4fB747016911e5cDA82e2E77C531e8206", // Smart contracts docs include all addresses on all networks
    provider: "https://rpc.unlock-protocol.com/5",
  },
};

// Initializing RPC provider and connect it to Goerli
const provider = new ethers.providers.JsonRpcProvider(networks[5].provider);

// Create a wallet. PUT OUR OWN
// This one should have a little bit of eth but please send more if you use it:
// 0x42fb30ae9694c45f76d98d01adf4103fc7b636a6
const wallet = new ethers.Wallet.fromMnemonic(
  "solid entry walnut extend aisle skirt myth clog need analyst edit bench"
).connect(provider);

async function create_lock() {
    const walletService = new WalletService(networks);
  
    // Connect to a provider with a wallet
    await walletService.connect(provider, wallet);
  
    // This only resolves when the transaction has been mined, but the callback returns the hash immediately
    await walletService.createLock(
      {
        maxNumberOfKeys: 100,
        name: "testing silver",
        expirationDuration: 12121311,
        keyPrice: "0.01", // Key price needs to be a string
      },
      {}, // transaction options
      (error, hash) => {
        // This is the hash of the transaction!
        console.log({ hash });
      }
    );
  }

async function purchase_key() {
  const walletService = new WalletService(networks);

  // Connect to a provider with a wallet
  await walletService.connect(provider, wallet);

  // This lock exists on Rinkeby (you can create one from the dashboard if needed)
  const lockAddress = "0xF735257c43dB1723AAE2A46d71E467b1b8a8422A";

  // This only resolves when the transaction has been mined, but the callback returns the hash immediately
  await walletService.purchaseKey(
    {
      lockAddress,
    },
    {}, // transaction options
    (error, hash) => {
      // This is the hash of the transaction!
      console.log({ hash });
    }
  );
}
