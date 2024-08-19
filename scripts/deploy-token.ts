import hre, { ethers, network } from "hardhat";

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
    const RECHFactory = await ethers.getContractFactory("$RECH");
    const RECH = await RECHFactory.deploy();
    await RECH.deployed();

    console.log("$RECH deployed to:", RECH.address);

    if (network.name !== "localhost" && network.name !== "hardhat") {
        console.log("Sleeping before verification...");
        await sleep(20000);

        await hre.run("verify:verify", {
            address: RECH.address,
            contract: "contracts/RECHToken.sol:RECH",
        });
    }
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
