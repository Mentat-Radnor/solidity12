import pkg from 'hardhat';
import chai from "chai";

const { expect } = chai;
const { ethers } = pkg;

describe('Demo', () => {
  let owner, demo, loggerAddress ,demoAddress;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    const Logger = await ethers.getContractFactory("Logger", owner);
    const logger = await Logger.deploy();
    await logger.waitForDeployment();
    loggerAddress = await logger.getAddress();

    const Demo = await ethers.getContractFactory("Demo", owner);
    demo = await Demo.deploy(loggerAddress);
    await demo.waitForDeployment(); 
    demoAddress = await demo.getAddress();
  })

  it("allows to pay and get payment info", async () => {
    const sum = 100;
    console.log(demoAddress);
    const txData = {
      value: sum,
      to: demoAddress,
    }

    const tx = await owner.sendTransaction(txData);
    await tx.wait();

    await expect(tx).to.changeEtherBalance(demo, sum);

    const amount = await demo.payment(owner.address, 0);

    expect(amount).to.eq(sum);
  })

})