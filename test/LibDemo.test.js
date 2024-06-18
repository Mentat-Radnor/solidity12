import pkg from 'hardhat';
import chai from "chai";

const { expect } = chai;
const { ethers } = pkg;

describe('LibDemo', () => {
  let owner, libDemo, libDemoAddress;

  beforeEach(async () => {
    [owner] = await ethers.getSigners();

    const LibDemo = await ethers.getContractFactory("LibDemo", owner);
    libDemo = await LibDemo.deploy();
    await libDemo.waitForDeployment();
    libDemoAddress = await libDemo.getAddress();
  })

  it("compares strings", async () => {
    const str = "cat";
    const result = await libDemo.runnerStr(str, str);

    expect(result).to.be.true;

    const result2 = await libDemo.runnerStr(str, "Any string");

    expect(result2).to.be.false;
  })


  it("finds uint in array", async () => {
    const array = [1, 2, 3, 4];
    const result = await libDemo.runnerArr(array, 1);

    expect(result).to.be.true;

    const result2 = await libDemo.runnerArr(array, 6);

    expect(result2).to.be.false;
  })

})