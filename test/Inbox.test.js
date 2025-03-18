const assert = require("assert");
const ganache = require("ganache"); // Local test network
const { Web3 } = require("web3");
const { abi, evm } = require("../compile");

const web3 = new Web3(ganache.provider());

// class Car {
//   park() {
//     return "stoppped";
//   }

//   drive() {
//     return "vrruuuummm";
//   }
// }

// let car;

// beforeEach(() => {
//   car = new Car();
// });

// describe("Car", () => {
//   it("Cark has park function", () => {
//     assert.equal(car.park(), "stoppped");
//   });

//   it("Car has drive function", () => {
//     assert.equal(car.drive(), "vrruuuummm");
//   });
// });

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(abi))
    .deploy({
      data: evm.bytecode.object,
      arguments: ["H test mocha"],
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
});

describe("Inbox", () => {
  it("deploy contract", () => {
    assert.ok(inbox.options.address);
  });

  it("Has default message", async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, "H test mocha");
  });

  it("Can change message", async () => {
    await inbox.methods.setMessage("Aku ngantuk").send({
      from: accounts[0],
    });
    const message = await inbox.methods.message().call();
    assert.equal(message, "Aku ngantuk");
  });
});
