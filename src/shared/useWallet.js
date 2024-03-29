import erc721 from "@src/shared/abi/erc721.json";
import erc20 from "@src/shared/abi/erc20.json";
import erc721POF from "@src/shared/abi/erc721-pof.json";
import erc1155CredentialMint from "@src/shared/abi/erc1155credentialmint.json";
import erc721CredentialMint from "@src/shared/abi/erc721credentialmint.json";
import erc20CredentialMint from "@src/shared/abi/erc20credentialmint.json";
import { Contract, ethers } from "ethers";
import { useProvider, useSigner } from "wagmi";
import useErrorHandler from "@src/shared/error/useErrorHandler";

export const useWallet = () => {
  const errorHandler = useErrorHandler();
  const placeTag = "shared-useWallet";
  const provider = useProvider();
  const [, getSigner] = useSigner();

  const resolveAddress = async (address) => {
    const contractRegex = new RegExp(/^0x[a-fA-F0-9]{40}$/);
    const ethRegex = new RegExp(
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/
    );
    if (contractRegex.test(address)) {
      return address;
    }
    if (ethRegex.test(address)) {
      return provider.resolveName(address);
    }
    throw new Error("Invalid Receiver Address Format");
  };

  const mintIoU = async (
    contractAddress,
    address,
    name,
    reason,
    imageUrl,
    amount
  ) => {
    try {
      if (!provider) {
        throw new Error("Provider not init");
      }

      const signer = await getSigner();
      const connectedContract = new Contract(contractAddress, erc721, signer);

      const txn = await connectedContract.makeAnEpicNFT(
        address,
        name,
        reason,
        imageUrl,
        amount
      );

      const log = await txn.wait(1);
      const [from, to, value] = log.events[4].args;
      return {
        tokenId: value.toNumber(),
        transactionHash: txn.hash,
      };
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const buyBack = async (
    contractAddress,
    tokenId,
    address,
    amount,
    onTransactonCreated
  ) => {
    try {
      if (!provider) {
        throw new Error("Provider not init");
      }

      const signer = await getSigner();
      const connectedContract = new Contract(contractAddress, erc721, signer);

      const tx = await connectedContract.buyBack(tokenId, address, {
        value: ethers.utils.parseEther(amount),
      });
      onTransactonCreated(tx.hash);
      await tx.wait();
      return tx.hash;
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const mintPOF = async (
    contractAddress,
    address,
    name,
    description,
    imageUrl
  ) => {
    if (!provider) {
      throw new Error("Provider not init");
    }

    const signer = await getSigner();
    const connectedContract = new Contract(contractAddress, erc721POF, signer);

    console.log("=== starting generate transaction");
    const txn = await connectedContract.mintPOF(
      address,
      name,
      description,
      imageUrl
    );

    const log = await txn.wait(1);

    console.log("=== transaction ready");

    const [from, to, value] = log.events[3].args;
    return {
      tokenId: value.toNumber(),
      transactionHash: txn.hash,
    };
  };

  const getContractSymbol = async (contractAddress) => {
    try {
      if (!provider) {
        throw new Error("Provider not init");
      }

      const connectedContract = new Contract(contractAddress, erc20, provider);
      const symbol = await connectedContract.symbol();
      return symbol;
    } catch (error) {
      errorHandler(error, [placeTag]);
      return null;
    }
  };

  const mint1155 = async (contractAddress, mintData) => {
    if (!provider) {
      throw new Error("Provider not init");
    }
    console.log(">>> Called", contractAddress, address);

    const signer = await getSigner();
    const connectedContract = new Contract(
      contractAddress,
      erc1155CredentialMint,
      signer
    );

    console.log("=== starting generate transaction");
    const { address, name, description, image, tokenId } = mintData;
    console.log(">>> mint data", address, name, description, image, tokenId);
    // return;
    const txn = await connectedContract.mintCredentials(
      address,
      tokenId,
      name,
      description,
      image
    );

    const log = await txn.wait(1);

    console.log("=== transaction ready");
    console.log(log.events);

    return { hash: txn.hash };
  };

  const mint721 = async (contractAddress, mintData) => {
    if (!provider) {
      throw new Error("Provider not init");
    }
    console.log(">>> Called", contractAddress, address);

    const signer = await getSigner();
    const connectedContract = new Contract(
      contractAddress,
      erc721CredentialMint,
      signer
    );

    console.log("=== starting generate transaction");
    const { address, name, description, image } = mintData;
    console.log(">>> mint data", address, name, description, image);
    // return;
    const txn = await connectedContract.mintCredentials(
      address,
      name,
      description,
      image
    );

    const log = await txn.wait(1);

    console.log("=== transaction ready");
    console.log(log.events);

    const [from, to, tokenId] = log.events[0].args;
    return { hash: txn.hash, tokenId: tokenId.toNumber() };
  };

  const mint20 = async (contractAddress, mintData) => {
    if (!provider) {
      throw new Error("Provider not init");
    }
    console.log(">>> Called", contractAddress, address);

    const signer = await getSigner();
    const connectedContract = new Contract(
      contractAddress,
      erc20CredentialMint,
      signer
    );

    console.log("=== starting generate transaction");
    const { address, amount } = mintData;
    // return;
    const txn = await connectedContract.mintCredentials(address, amount);

    const log = await txn.wait(1);

    console.log("=== transaction ready");
    console.log(log.events);

    return { hash: txn.hash };
  };

  return {
    getContractSymbol,
    mintIoU,
    mintPOF,
    buyBack,
    resolveAddress,
    provider,
    mint1155,
    mint721,
    mint20,
  };
};
