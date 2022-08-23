import {
  Box,
  Button,
  Flex,
  Textarea,
  Image,
  Text,
  Container,
  Input,
  Link,
  Spinner,
  useToast,
  chakra,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import Select, { components } from "react-select";
import React, { useEffect, useState } from "react";
import { usePageState } from "@src/shared/state";
import FileUploadButton from "@src/shared/file-upload-button";
import UIButton from "@src/shared/ui-button";
import { useApi } from "@src/shared/api";
import frontUtils from "@src/shared/front-utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { useWallet } from "@src/shared/useWallet";
import useErrorHandler from "@src/shared/error/useErrorHandler";

const WaitForMinting = ({ transactionHash, ...props }) => {
  return (
    <Box {...props} mt="40px">
      <Flex
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Spinner
          thickness="5px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
        <Text fontWeight={700} fontSize={"24px"} mt="34px">
          Minting ...
        </Text>
        <Text fontWeight={400} fontSize={"16px"} mt="34px">
          Please Wait - don&rsquo;t close this window
        </Text>
      </Flex>
      {transactionHash && (
        <Link
          href={`https://polygonscan.com/tx/${transactionHash}`}
          target={"_blank"}
          isExternal={true}
          color={"black"}
          textAlign={"center"}
          display={"block"}
          textDecor={"underline"}
        >
          See transaction on polygonscan
        </Link>
      )}
    </Box>
  );
};

const MintedNFT = ({ mintedData, transactionHash, ...props }) => {
  const toast = useToast();
  const handleAddressClick = () => {
    frontUtils.CopyMe(
      `${window.location.href.split("/").slice(0, 3).join("/")}/iou/receiver/${
        mintedData?.iou?._id
      }`
    );
    toast({
      title: "Copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };

  const handleTwitterShareClick = () => {
    const linkToReward = `${window.location.href
      .split("/")
      .slice(0, 3)
      .join("/")}/iou/receiver/${mintedData?.iou?._id}`;
    const twitterPostUrl = `https://twitter.com/intent/tweet?url=${linkToReward}&text=Thanks%20for%20your%20contribution%20@someone`;
    window.open(twitterPostUrl, "_blank").focus();
  };
  return (
    <Flex
      flexDirection={"column"}
      {...props}
      justifyContent={"center"}
      alignItems={"center"}
      mt="40px"
    >
      <Text textAlign={"center"} fontSize={"24px"} fontWeight={700}>
        Transaction Was Minted Successfully
      </Text>
      {transactionHash && (
        <Link
          mt="20px"
          href={`https://polygonscan.com/tx/${transactionHash}`}
          target={"_blank"}
          isExternal={true}
          color={"black"}
          textAlign={"center"}
          display={"block"}
          textDecor={"underline"}
        >
          See transaction on polygonscan
        </Link>
      )}
      <Text textAlign={"center"} fontSize={"16px"} mt="20px">
        Share the following link to reciver
      </Text>
      <Flex w="100%" alignItems={"center"} mt="34px">
        <Input
          readOnly={true}
          autoFocus={true}
          value={`${window.location.href
            .split("/")
            .slice(0, 3)
            .join("/")}/iou/receiver/${mintedData?.iou?._id}`}
        />
        <Box ml="10px" onClick={handleAddressClick} cursor={"pointer"}>
          <FontAwesomeIcon
            size="2x"
            icon={faCopy}
            color={"rgba(140, 139, 137, 0.8)"}
          />
        </Box>
        <Box ml="10px" onClick={handleTwitterShareClick} cursor={"pointer"}>
          <FontAwesomeIcon size="2x" icon={faTwitter} color={"#3babe2"} />
        </Box>
      </Flex>
    </Flex>
  );
};

const MintNewNFT = ({
  changeStaet,
  setMintedData,
  setTransactionHash,
  ...props
}) => {
  const errorHandler = useErrorHandler();
  const placeTag = "iou-MintNewNFT";
  const contracts = [
    {
      value: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
      label: "Ethereum Test - Local",
      icon: "eth-rinkeby.png",
    },
    {
      value: "0x7D0776bfCAAAb699435D5dFBeaD2a5556A19CB1f",
      label: "Polygon Mainnet",
      icon: "polygon.png",
    },
    {
      value: "0x68EbB2ca2be69492a8ca9333179E46B6Cf6672F5",
      label: "Ethereum Test - Rinkeby",
      icon: "eth-rinkeby.png",
    },
  ];
  const walletV1 = useWallet();
  const api = useApi();
  const toast = useToast();
  const [state] = usePageState();
  const [formValue, setFormValue] = useState({
    contract: contracts[0],
    amount: "0.002",
  });
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const { Option } = components;

  const IconOption = (props) => (
    <Option {...props}>
      <Flex alignItems={"center"}>
        <Image
          src={`/iou/${props.data.icon}`}
          style={{ width: 36 }}
          alt={props.data.label}
          mr="10px"
        />
        <Text>{props.data.label}</Text>
      </Flex>
    </Option>
  );

  useEffect(() => {
    if (!state.currentAddress) {
      return;
    }
    const fetchProjectOfUser = async () => {
      try {
        const response = await api.call(
          "get",
          `/api/projects/fetch-projects-of-address/?address=${state.currentAddress}`
        );
        const projects = response.projects.map((project) => {
          return {
            label: project.name,
            value: project._id,
          };
        });
        setProjects(projects);

        console.log(projects);
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchProjectOfUser();
  }, [state.currentAddress]);

  const isFormValid = async () => {
    if (frontUtils.isEmptyString(formValue.imageUrl)) {
      setErrorMessage("Please upload image for NFT");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.name)) {
      setErrorMessage("Please name your NFT");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.reason)) {
      setErrorMessage("Please fill reason why you are giving this NFT");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.project)) {
      setErrorMessage(
        "Please select your project (If you dont have the project you can create one from Dashboard)"
      );
      return false;
    }
    if (
      frontUtils.isEmptyString(formValue.amount) ||
      Number(formValue.amount) === 0
    ) {
      setErrorMessage(
        "Please set amount of reward in ETH (should be more than 0 ETH)"
      );
      return false;
    }
    if (frontUtils.isEmptyString(formValue.receiverAddress)) {
      setErrorMessage("Please set reward reciver address");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.contract)) {
      setErrorMessage("Please select blockchain ");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleNameChange = (e) => {
    if (e.target.value.length > 40) {
      return;
    }
    handleFieldChange("name", e.target.value);
  };

  const handleReasonChange = (e) => {
    if (e.target.value.length > 160) {
      return;
    }
    handleFieldChange("reason", e.target.value);
  };

  const handleImageUpload = (data) => {
    handleFieldChange("imageUrl", data.fileLocation);
  };

  const handleFieldChange = (fieldName, value) => {
    const updatedFormValue = { ...formValue, [fieldName]: value };
    setFormValue(updatedFormValue);
    return updatedFormValue;
  };

  const handleProjectChange = (inputValue) => {
    handleFieldChange("project", inputValue);
  };

  const handleContractChange = (inputValue) => {
    handleFieldChange("contract", inputValue);
    handleFieldChange("contractAddress", inputValue.value);
  };

  const handleSubmit = async () => {
    try {
      const isValidationPassed = await isFormValid();
      if (!isValidationPassed) {
        console.log("main step - form is not valid");
        return;
      }
      changeStaet("minting");
      const resolvedReceiverAddress = await walletV1.resolveAddress(
        formValue.receiverAddress
      );

      const { tokenId, transactionHash } = await walletV1.mintIoU(
        formValue.contractAddress || contracts[0].value,
        resolvedReceiverAddress,
        formValue.name,
        formValue.reason,
        formValue.imageUrl,
        formValue.amount.toString()
      );
      setTransactionHash(transactionHash);

      const response = await api.call("post", `/api/iou/submit-iou`, {
        ...formValue,
        resolvedReceiverAddress: resolvedReceiverAddress.toLowerCase(),
        receiverAddress: formValue.receiverAddress.toLowerCase(),
        projectId: formValue.project.value,
        mintedBy: state.currentAddress.toLowerCase(),
        tokenId,
        transactionHash,
      });
      setMintedData(response);
      changeStaet("minted");
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  return (
    <Box
      maxW={"6xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      {...props}
    >
      <Text fontWeight={700} fontSize={"20px"} textAlign={"center"}>
        Create IOU (I owe you) NFT
      </Text>
      <Text fontSize={"18px"} textAlign={"center"} mt="20px">
        You are about to create (mint) IOU NFT and give it to your supporter as
        a promise that you will give reward once your project will take off
      </Text>
      <Text>
        Required fields <chakra.span color={"red"}> *</chakra.span>
      </Text>
      <Image
        src={formValue.imageUrl || "/iou/baloon.png"}
        objectFit={"contain"}
        mt="20px"
        height="325px"
        width="100%"
        alt="nft-image"
        border="dashed 1px white"
        borderRadius="13px"
        fallbackSrc="https://via.placeholder.com/600x320/1a202c/FFFFFF?Text=WebsiteBuilders.com"
      />

      <FileUploadButton
        w="100%"
        mt="20px"
        variant="solid"
        uploadEndPoint="/api/upload-asset"
        onUpload={handleImageUpload}
        background="linear-gradient(93.89deg, #FCEB4F 0%, #CAFFFD 100%);"
        border="solid 3px black"
        borderRadius="12px"
        color="black"
        fontWeight="bold"
        fontSize={["12px", "12px", "12px", "20px"]}
        _hover={{ backgroundColor: "black" }}
        _active={{ backgroundColor: "black" }}
        _focus={{ outline: "unset" }}
      >
        📷 Upload Image
      </FileUploadButton>
      <Box>
        <Box mt={"20px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"16px"} fontWeight={700}>
              Name <chakra.span color={"red"}> *</chakra.span>
            </Text>
            <Text
              fontWeight={700}
              fontFamily={"roboto"}
              textAlign={"right"}
              color="#6C727F"
              fontSize={"16px"}
            >
              {formValue.name?.length || 0}
              {"/40"}
            </Text>
          </Flex>

          <Input
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="Name of your NFT"
            type="text"
            value={formValue.name || ""}
            onChange={handleNameChange}
          />
        </Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700}>
            External link
          </Text>

          <Input
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="External link of your project"
            type="text"
            value={formValue.externalLink || ""}
            onChange={(e) => handleFieldChange("externalLink", e.target.value)}
          />
        </Box>
        <Box mt={"20px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"16px"} fontWeight={700}>
              Reason <chakra.span color={"red"}> *</chakra.span>
            </Text>
            <Text
              fontWeight={700}
              fontFamily={"roboto"}
              textAlign={"right"}
              color="#6C727F"
              fontSize={"16px"}
            >
              {formValue.reason?.length || 0}
              {"/160"}
            </Text>
          </Flex>

          <Textarea
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="Describe reason of giving this NFT"
            type="text"
            value={formValue.reason || ""}
            onChange={handleReasonChange}
          />
        </Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700} mb="20px">
            Project <chakra.span color={"red"}> *</chakra.span>
          </Text>
          {(!projects || projects.length === 0) && (
            <Box>
              <Box
                backgroundColor={"white"}
                p="10px"
                pt="20px"
                pb="20px"
                borderRadius={"12px"}
                border="1px solid black"
              >
                <Text fontWeight={700}>No projects yet</Text>
                <Text mt="20px">
                  Visit{" "}
                  <Link
                    href="/dashboard"
                    cursor={"pointer"}
                    textDecor={"underline"}
                  >
                    Dashboard
                  </Link>{" "}
                  to create one
                </Text>
              </Box>
            </Box>
          )}
          {projects?.length > 0 && (
            <Select
              options={projects}
              closeMenuOnSelect={true}
              isMulti={false}
              isClearable
              value={formValue.project || null}
              onChange={handleProjectChange}
            />
          )}
        </Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700}>
            Amount (To buy it back) <chakra.span color={"red"}> *</chakra.span>
          </Text>
          <InputGroup mt={"20px"}>
            <InputLeftAddon>Ξ</InputLeftAddon>
            <Input
              backgroundColor="white"
              color="black"
              placeholder="0.002"
              type="text"
              value={formValue.amount}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700}>
            Message
          </Text>

          <Input
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="What you want to say to receiver as gift"
            type="text"
            value={formValue.message || ""}
            onChange={(e) => handleFieldChange("message", e.target.value)}
          />
        </Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700}>
            Receiver Address <chakra.span color={"red"}> *</chakra.span>
          </Text>

          <Input
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="Receiver Address or .eth"
            type="text"
            value={formValue.receiverAddress || ""}
            onChange={(e) =>
              handleFieldChange("receiverAddress", e.target.value)
            }
          />
        </Box>
        <Box mt="20px">
          <Text fontSize={"16px"} fontWeight={700} mb="20px">
            Blockchain <chakra.span color={"red"}> *</chakra.span>
          </Text>
          <Select
            options={contracts}
            closeMenuOnSelect={true}
            isMulti={false}
            value={formValue.contract}
            onChange={handleContractChange}
            components={{ Option: IconOption }}
          />
        </Box>
      </Box>
      {errorMessage && (
        <Text fontWeight="bold" color="red.700" mt={5} textAlign={"center"}>
          {errorMessage}
        </Text>
      )}
      <Flex justifyContent={"center"} mt="20px">
        <UIButton onClick={handleSubmit}>Mint &amp; Send</UIButton>
      </Flex>
    </Box>
  );
};

const IOUGeneratePageView = () => {
  const [iouState, setIOUState] = useState("generate");
  const [mintedData, setMintedData] = useState({});
  const [transactionHash, setTransactionHash] = useState(null);
  return (
    <Container
      maxW={"6xl"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box maxW={"600px"} mt="40px" mb="120px">
        <Text
          fontWeight={700}
          fontFamily={"Pacifico"}
          fontSize={"24px"}
          fontStyle={"italic"}
        >
          a little thank you
        </Text>
        <Box
          backgroundColor={"white"}
          borderRadius={"8px"}
          border="solid 2px black"
          mt="20px"
          p="20px"
          pb="60px"
        >
          <MintNewNFT
            display={iouState === "generate" ? "block" : "none"}
            changeStaet={setIOUState}
            setMintedData={setMintedData}
            setTransactionHash={setTransactionHash}
          />
          <WaitForMinting
            display={iouState === "minting" ? "block" : "none"}
            transactionHash={transactionHash}
          />

          <MintedNFT
            mintedData={mintedData}
            transactionHash={transactionHash}
            display={iouState === "minted" ? "block" : "none"}
          />
        </Box>
      </Box>
    </Container>
  );
};
export default IOUGeneratePageView;
