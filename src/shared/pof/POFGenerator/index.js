import { Box, Container } from "@chakra-ui/react";
import React, { useState } from "react";
import WaitForMinting from "@src/shared/pof/POFGenerator/WaitForMinting";
import MintedNFT from "@src/shared/pof/POFGenerator/MintedNFT";
import MintNewNFT from "@src/shared/pof/POFGenerator/MintNewNFT";
import ConfirmMint from "@src/shared/pof/POFGenerator/ConfirmMint";

const POFGenerator = () => {
  const [pofState, setPOFState] = useState("generate");
  const [pofData, setPOFData] = useState({});
  const [mintedData, setMintedData] = useState({});
  const [transactionHash, setTransactionHash] = useState(null);

  return (
    <Box
      background={
        pofState === "minted" &&
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
              display={pofState === "generate" ? "block" : "none"}
              changeState={setPOFState}
              setPOFData={setPOFData}
            />
            <ConfirmMint
              display={pofState === "confirm" ? "block" : "none"}
              pofData={pofData}
              changeState={setPOFState}
              setMintedData={setMintedData}
              setTransactionHash={setTransactionHash}
            />
            <WaitForMinting
              display={pofState === "minting" ? "block" : "none"}
              transactionHash={transactionHash}
            />

            <MintedNFT
              mintedData={mintedData}
              transactionHash={transactionHash}
              display={pofState === "minted" ? "block" : "none"}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
export default POFGenerator;
