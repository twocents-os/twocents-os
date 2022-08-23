import {
  Box,
  Link,
  Container,
  Text,
  Flex,
  Image,
  useToast,
  Center,
} from "@chakra-ui/react";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import frontUtils from "@src/shared/front-utils";
import { useState, useEffect } from "react";

const POFPageView = ({ pof }) => {
  const toast = useToast();
  const [transactionScannerOptions, setTransactionScannerOptions] = useState();

  useEffect(() => {
    if (!pof?.contractAddress) {
      return;
    }
    if (
      pof.contractAddress.toLowerCase() ===
      process.env.NEXT_PUBLIC_POLYGON_MAIN.toLowerCase()
    ) {
      setTransactionScannerOptions({
        name: "Polygonscan",
        link: `https://polygonscan.com/tx/${pof.transactionHash}`,
      });
    }
    if (
      pof.contractAddress.toLowerCase() ===
      process.env.NEXT_PUBLIC_ETHER_RINKEBY.toLowerCase()
    ) {
      setTransactionScannerOptions({
        name: "Etherscan (Rinkeby)",
        link: `https://rinkeby.etherscan.io/tx/${pof.transactionHash}`,
      });
    }
    if (
      pof.contractAddress.toLowerCase() ===
      process.env.NEXT_PUBLIC_ETHER_LOCAL.toLowerCase()
    ) {
      setTransactionScannerOptions({
        name: "Etherscan (LOCAL)",
        link: `https://localhost:3000/tx/${pof.transactionHash}`,
      });
    }
  }, [pof]);

  const handleAddressClick = (address) => {
    frontUtils.CopyMe(address);
    toast({
      title: "Address copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };

  return (
    <Container
      maxW={"6xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box
        maxW={"600px"}
        minW={["320px", "320px", "600px"]}
        mt="40px"
        mb="120px"
      >
        <Text
          fontWeight={700}
          fontFamily={"Pacifico"}
          fontSize={"24px"}
          fontStyle={"italic"}
        >
          Proof of Friendship
        </Text>
        <Box
          backgroundColor={"white"}
          borderRadius={"8px"}
          border="solid 2px black"
          mt="20px"
          p="20px"
          pb="60px"
        >
          <Text
            fontWeight={700}
            fontSize={"24px"}
            mt={"20px"}
            mb="10px"
            textAlign={"center"}
          >
            {pof.name}
          </Text>
          <Center>
            <Image
              src={pof.imageUrl}
              mt="20px"
              height="325px"
              width="325px"
              alt="nft-image"
              border="dashed 1px white"
              borderRadius="13px"
              fallbackSrc="https://via.placeholder.com/600x320/1a202c/FFFFFF?Text=WebsiteBuilders.com"
            />
          </Center>
          <Text textAlign={"center"} fontFamily={"roboto"}>
            {new Date(pof.createDate).toLocaleDateString()}
          </Text>
          <Flex
            mt="24px"
            justifyContent={"start"}
            alignItems={"center"}
            onClick={() => handleAddressClick(pof.receiverAddress)}
            cursor={"pointer"}
          >
            <Text fontWeight={700} fontSize={"18px"}>
              From:
            </Text>
            <Text color={"black"} mr="10px" fontWeight={700} ml="20px">
              {frontUtils.get6DigitOfAccount(pof.mintedBy)}
            </Text>
            <Box>
              <FontAwesomeIcon
                icon={faCopy}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
            <Box
              ml="20px"
              as={"a"}
              href={`/people/${pof.mintedBy}`}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
          </Flex>

          <Flex
            mt="24px"
            justifyContent={"start"}
            alignItems={"center"}
            onClick={() => handleAddressClick(pof.receiverAddress)}
            cursor={"pointer"}
          >
            <Text fontWeight={700} fontSize={"18px"}>
              To:
            </Text>
            <Text color={"black"} mr="10px" fontWeight={700} ml="20px">
              {frontUtils.get6DigitOfAccount(pof.receiverAddress)}
            </Text>
            <Box>
              <FontAwesomeIcon
                icon={faCopy}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
            <Box
              ml="20px"
              as={"a"}
              href={`/people/${pof.receiverAddress}`}
              target={"_blank"}
            >
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                color={"rgba(140, 139, 137, 0.8)"}
                size="lg"
              />
            </Box>
          </Flex>

          <Link
            href={`/people/${pof.mintedBy}`}
            textDecoration="underline"
            target={"_blank"}
            textAlign={"center"}
            display={"block"}
            mt="24px"
          >
            View Project Owner Profile
          </Link>

          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Project
          </Text>
          <Link
            href={`/project/${pof.projectId}`}
            target={"_blank"}
            textDecor={"underline"}
          >
            <Text>{pof.project.label}</Text>
          </Link>

          <Text fontWeight={700} fontSize={"18px"} mt={"20px"} mb="10px">
            Description
          </Text>
          <Text> {pof.description}</Text>
          {transactionScannerOptions && (
            <Link
              mt="20px"
              href={transactionScannerOptions.link}
              target={"_blank"}
              isExternal={true}
              color={"black"}
              textAlign={"center"}
              display={"block"}
              textDecor={"underline"}
            >
              See transaction on {transactionScannerOptions.name}
            </Link>
          )}
        </Box>
      </Box>
    </Container>
  );
};
export default POFPageView;
