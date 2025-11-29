const { AptosClient, AptosAccount, TxnBuilderTypes, BCS, HexString } = require("aptos");
const fs = require("fs");
const path = require("path");

const NODE_URL = "https://fullnode.testnet.aptoslabs.com/v1";
const PRIVATE_KEY = "0xabb8e46bfd6b4766c6e53adb7fabba756ed724bd15d498b1352d9da98ed36fbd";
const payload = require("../../move/payload.json");

async function main() {
    const client = new AptosClient(NODE_URL, {
        HEADERS: {
            Authorization: "Bearer AG-LQMVYAPKMIQ4BBGK5DZ11EY23AXDNTRUR"
        }
    });
    const account = new AptosAccount(HexString.ensure(PRIVATE_KEY).toUint8Array());

    console.log("Deploying with account:", account.address().hex());

    console.log("Fetching account details...");
    try {
        const accountDetails = await client.getAccount(account.address());
        console.log("Account details:", accountDetails);
    } catch (e) {
        console.error("Failed to fetch account details:", e);
    }

    const metadataHex = payload.args[0].value;
    const bytecodeHex = payload.args[1].value[0];

    const transaction = await client.publishPackage(
        account,
        new HexString(metadataHex).toUint8Array(),
        [new TxnBuilderTypes.Module(new HexString(bytecodeHex).toUint8Array())]
    );

    console.log("Transaction hash:", transaction);
    await client.waitForTransaction(transaction);
    console.log("Deployed successfully!");
}

main().catch(console.error);
