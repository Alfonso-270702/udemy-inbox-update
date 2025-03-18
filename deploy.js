const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { abi, evm } = require("./compile");

const provider = new HDWalletProvider(
  process.env.SEED_PHRASE,
  "https://sepolia.infura.io/v3/15754777090d4fec8f695a03e2f313ea"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Deploying from account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(abi)) //parameter ketika manggil web3.eth.Contract itu perlu abi dari file contract kita, jadi interface itu sebenarnya abi
    .deploy({ data: evm.bytecode.object, arguments: ["Hi there!"] })
    .send({ from: accounts[0], gas: "1000000" });

  console.log("Contract deployed to", result.options.address);

  provider.engine.stop();
};

deploy();
