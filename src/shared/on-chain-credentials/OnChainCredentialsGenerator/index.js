import { Box, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import WaitForMinting from "@src/shared/on-chain-credentials/OnChainCredentialsGenerator/WaitForMinting";
import MintedNFT from "@src/shared/on-chain-credentials/OnChainCredentialsGenerator/MintedNFT";
import MintNewNFT from "@src/shared/on-chain-credentials/OnChainCredentialsGenerator/MintNewNFT";
import ConfirmMint from "@src/shared/on-chain-credentials/OnChainCredentialsGenerator/ConfirmMint";

const OnChainCredentialsGenerator = () => {
  const [credentialMintingState, setCredentialMintingState] =
    useState("generate");
  const [credentialData, setCredentialData] = useState({});
  const [mintedData, setMintedData] = useState({});
  const [transactionHash, setTransactionHash] = useState(null);

  return (
    <Box
      background={
        credentialMintingState === "minted" &&
        "linear-gradient(173.53deg, #FFFDD9 16.1%, rgba(241, 195, 77, 0.29) 98.42%)"
      }
    >
      <Container
        maxW={"6xl"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box maxW={"600px"} mb="120px" minW={["300px", "300px", "600px"]}>
          <Box mt="20px" p="20px" pb="60px">
            <MintNewNFT
              display={credentialMintingState === "generate" ? "block" : "none"}
              changeState={setCredentialMintingState}
              setCredentialData={setCredentialData}
            />
            <ConfirmMint
              display={credentialMintingState === "confirm" ? "block" : "none"}
              credentialData={credentialData}
              changeState={setCredentialMintingState}
              setMintedData={setMintedData}
              setTransactionHash={setTransactionHash}
            />
            <WaitForMinting
              display={credentialMintingState === "minting" ? "block" : "none"}
            />

            <MintedNFT
              mintedData={mintedData}
              transactionHash={transactionHash}
              display={credentialMintingState === "minted" ? "block" : "none"}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default OnChainCredentialsGenerator;
