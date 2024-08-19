import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { RECH } from "../typechain";

const parseUnits = ethers.utils.parseUnits;

describe("Test $RECH", function () {
    let rech: RECH;
    let owner: SignerWithAddress;
    let other: SignerWithAddress;

    this.beforeEach(async function () {
        [owner, other] = await ethers.getSigners();

        const RECHFactory = await ethers.getContractFactory("$RECH");
        rech = await RECHFactory.deploy();
    });

    it("Name, symbol, supply and decimals are correct", async function () {
        expect(await rech.name()).to.equal("$RECH Token");
        expect(await rech.symbol()).to.equal("$RECH");
        expect(await rech.totalSupply()).to.equal(parseUnits("100000000"));
        expect(await rech.decimals()).to.equal(18);
    });

    it("Initially deployer has all the supply", async function () {
        expect(await rech.balanceOf(owner.address)).to.equal(
            await rech.totalSupply()
        );
    });

    it("Can make a transfer after disable antisnipe", async function () {
        rech.setAntisnipeDisable();
        rech.setLiquidityRestrictorDisable();
        await expect(rech.transfer(other.address, 1))
            .to.emit(rech, "Transfer")
            .withArgs(owner.address, other.address, 1);
    });

    it("Can make a transfer after disable antisnipe", async function () {
        rech.setAntisnipeDisable();
        rech.setLiquidityRestrictorDisable();
        await expect(rech.transfer(other.address, 1))
            .to.emit(rech, "Transfer")
            .withArgs(owner.address, other.address, 1);
    });

    it("Can't make a transfer to zero address", async function () {
        rech.setAntisnipeDisable();
        rech.setLiquidityRestrictorDisable();
        await expect(rech.transfer(ethers.constants.AddressZero, 1))
            .to.be.revertedWith("ERC20: transfer to the zero address");
    });

});
