import {
  Box,
  Flex,
  Textarea,
  Image,
  Text,
  Input,
  Link,
  useToast,
  chakra,
  Center,
  Button,
} from "@chakra-ui/react";
import Select, { components } from "react-select";
import React, { useEffect, useState } from "react";
import { usePageState } from "@src/shared/state";
import FileUploadButton from "@src/shared/file-upload-button";
import UIButton from "@src/shared/ui-button";
import { useApi } from "@src/shared/api";
import frontUtils from "@src/shared/front-utils";
import { useWallet } from "@src/shared/useWallet";
import { useNetwork } from "wagmi";
import useErrorHandler from "@src/shared/error/useErrorHandler";

const MintNewNFT = ({ changeState, setCredentialData, ...props }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "pof-MintNewNFT";
  const [{ data }] = useNetwork();
  const contractTypes = [
    {
      value: "ERC721",
      label: "ERC721",
      icon: "polygon.png",
    },
    {
      value: "ERC1155",
      label: "ERC1155",
      icon: "polygon.png",
    },
    {
      value: "ERC20",
      label: "ERC20",
      icon: "polygon.png",
    },
  ];
  const walletV1 = useWallet();
  const api = useApi();
  const [state] = usePageState();
  const [formValue, setFormValue] = useState({});
  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  const { Option } = components;

  const IconOption = (props) => (
    <Option {...props}>
      <Flex alignItems={"center"}>
        <Image
          src={`/pof/${props.data.icon}`}
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
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchProjectOfUser();
  }, [state.currentAddress]);

  useEffect(() => {
    console.log(">>>Netwrok>>>", data);
  }, [data]);

  const isFormValid = async () => {
    if (!state.currentAddress) {
      setErrorMessage("Please make sure that wallet is connected");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.imageUrl)) {
      setErrorMessage("Please upload image for NFT");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.name)) {
      setErrorMessage("Please name your NFT");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.description)) {
      setErrorMessage("Please fill description why you are giving this NFT");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.project)) {
      setErrorMessage(
        "Please select your project (If you dont have the project you can create one from Dashboard)"
      );
      return false;
    }
    if (frontUtils.isEmptyString(formValue.receiverAddress)) {
      setErrorMessage("Please set reward reciver address");
      return false;
    }

    if (frontUtils.isEmptyString(formValue.contractAddress)) {
      setErrorMessage("Please set contract address");
      return false;
    }

    if (frontUtils.isEmptyString(formValue.contractType)) {
      setErrorMessage("Please set contract type");
      return false;
    }

    if (
      formValue.contractType.value === "ERC1155" &&
      frontUtils.isEmptyString(formValue.tokenId)
    ) {
      setErrorMessage("Please set tokenId");
      return false;
    }
    if (
      !frontUtils.isEmptyString(formValue.tokenId) &&
      !frontUtils.isNumeric(formValue.tokenId)
    ) {
      setErrorMessage("Please set valid tokenId");
      return false;
    }

    if (
      formValue.contractType.value === "ERC20" &&
      frontUtils.isEmptyString(formValue.amount)
    ) {
      setErrorMessage("Please set amount");
      return false;
    }
    if (
      !frontUtils.isEmptyString(formValue.amount) &&
      !frontUtils.isNumeric(formValue.amount)
    ) {
      setErrorMessage("Please set valid amount");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const handleNameChange = (e) => {
    if (e.target.value.length > 80) {
      return;
    }
    handleFieldChange("name", e.target.value);
  };

  const handleDescriptionChange = (e) => {
    if (e.target.value.length > 380) {
      return;
    }
    handleFieldChange("description", e.target.value);
  };

  const handleImageUpload = (data) => {
    handleFieldChange("imageUrl", data.fileLocation);
  };

  const handleFieldChange = (fieldName, value) => {
    const updatedFormValue = { ...formValue, [fieldName]: value };
    setFormValue(updatedFormValue);
    return updatedFormValue;
  };
  const handleFieldChangeObject = (objectValue) => {
    const updatedFormValue = { ...formValue, ...objectValue };
    setFormValue(updatedFormValue);
    return updatedFormValue;
  };

  const handleProjectChange = (inputValue) => {
    handleFieldChange("project", inputValue);
  };

  const handleContractChange = (inputValue) => {
    handleFieldChangeObject({
      contractType: inputValue,
    });
  };

  const handleSubmit = async () => {
    try {
      const isValidationPassed = await isFormValid();
      if (!isValidationPassed) {
        console.log("main prep step - form is not valid");
        return;
      }
      const dataToSet = {
        ...formValue,
        receiverAddress: formValue.receiverAddress.toLowerCase(),
        projectId: formValue.project.value,
        mintedBy: state.currentAddress.toLowerCase(),
        contractType: formValue.contractType.value,
      };
      setCredentialData(dataToSet);
      changeState("confirm");
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
        On Chain Credentials
      </Text>
      <Text
        fontSize={"18px"}
        textAlign={"center"}
        fontWeight={700}
        mt="20px"
        color="#536B83"
      >
        Send a on chain credentials to a pal.
      </Text>
      <Text mt="12px" color={"#041439"}>
        Someone helped you out?
        <br /> Met someone awesome?
        <br /> Want to reward a collaborator or contributor?
        <br /> Send them a credentials!
      </Text>
      <Text mt="12px">
        Required fields <chakra.span color={"red"}> *</chakra.span>
      </Text>
      <Center>
        <Image
          src={formValue.imageUrl || "/iou/baloon.png"}
          objectFit={"contain"}
          mt="20px"
          h="215px"
          w="215px"
          alt="nft-image"
          boxShadow={
            "4px 4px 4px rgba(0, 0, 0, 0.25), -4px -4px 4px rgba(0, 0, 0, 0.25)"
          }
          backgroundColor="white"
          borderRadius="8px"
          fallbackSrc="https://via.placeholder.com/215x215/1a202c/FFFFFF?Text=WebsiteBuilders.com"
        />
      </Center>

      <Center>
        <FileUploadButton
          mt="20px"
          w="215px"
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
      </Center>
      <Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700} color="#536B83">
            Contract Address <chakra.span color={"red"}> *</chakra.span>
          </Text>
          <Text color={"#041439"} mt="8px">
            Contract Address in Mumbai test network. Should implement{" "}
            <chakra.span
              p="3px"
              pl="6px"
              pr="6px"
              backgroundColor={"green.100"}
              borderRadius={"3px"}
              cursor={"pointer"}
              as="a"
              target="_blank"
              href="https://notion.so"
            >
              mintCredentials
            </chakra.span>{" "}
            method
          </Text>

          <Input
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="0xae09E0fcb4a0464b4AE71823Fa120309deF9199F"
            type="text"
            value={formValue.contractAddress || ""}
            onChange={(e) =>
              handleFieldChange("contractAddress", e.target.value)
            }
          />
        </Box>
        <Box mt="20px">
          <Text fontSize={"16px"} fontWeight={700} mb="20px" color="#536B83">
            Contract Type <chakra.span color={"red"}> *</chakra.span>
          </Text>
          <Select
            options={contractTypes}
            closeMenuOnSelect={true}
            isMulti={false}
            value={formValue.contractType}
            onChange={handleContractChange}
            components={{ Option: IconOption }}
          />
        </Box>
        {formValue?.contractType?.value === "ERC1155" && (
          <Box mt="20px">
            <Text fontSize={"16px"} fontWeight={700} mb="20px" color="#536B83">
              TokenId <chakra.span color={"red"}> *</chakra.span>
            </Text>
            <Input
              mt={"20px"}
              backgroundColor="white"
              color="black"
              placeholder="1"
              type="text"
              value={formValue.tokenId || ""}
              onChange={(e) => handleFieldChange("tokenId", e.target.value)}
            />
          </Box>
        )}
        {formValue?.contractType?.value === "ERC20" && (
          <Box mt="20px">
            <Text fontSize={"16px"} fontWeight={700} mb="20px" color="#536B83">
              Amount <chakra.span color={"red"}> *</chakra.span>
            </Text>
            <Input
              mt={"20px"}
              backgroundColor="white"
              color="black"
              placeholder="20"
              type="text"
              value={formValue.amount || ""}
              onChange={(e) => handleFieldChange("amount", e.target.value)}
            />
          </Box>
        )}
        <Box mt={"20px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"16px"} fontWeight={700} color="#536B83">
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
              {"/80"}
            </Text>
          </Flex>
          <Text color={"#041439"} mt="8px">
            What would you like to call this Credential you are giving.
          </Text>

          <Input
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="Satoshi Friendship Badge"
            type="text"
            value={formValue.name || ""}
            onChange={handleNameChange}
          />
        </Box>
        <Box mt={"20px"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text fontSize={"16px"} fontWeight={700} color="#536B83">
              Description <chakra.span color={"red"}> *</chakra.span>
            </Text>
            <Text
              fontWeight={700}
              fontFamily={"roboto"}
              textAlign={"right"}
              color="#6C727F"
              fontSize={"16px"}
            >
              {formValue.description?.length || 0}
              {"/380"}
            </Text>
          </Flex>
          <Text color={"#041439"} mt="8px">
            Add a little detail about what this NFT is about. This will be
            displayed in the metadata if contract is ERC721 or ERC1155
          </Text>

          <Textarea
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="For giving me advice on what is proof of work."
            type="text"
            value={formValue.description || ""}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700} color="#536B83">
            Project <chakra.span color={"red"}> *</chakra.span>
          </Text>
          <Text color={"#041439"} mt="8px">
            Select a project, a community or reason as to why you are giving
            this person a Proof of Friendship. If you have no projects yet, you
            can easily create one.
          </Text>
          {(!projects || projects.length === 0) && (
            <Box mt="20px">
              <Box
                backgroundColor={"white"}
                p="10px"
                pt="20px"
                pb="20px"
                borderRadius={"12px"}
                border="1px solid black"
              >
                <Text fontWeight={700} color="#536B83">
                  No projects yet
                </Text>
                <Text mt="20px" color="#536B83">
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
            <Box mt="20px">
              <Select
                options={projects}
                closeMenuOnSelect={true}
                isMulti={false}
                isClearable
                value={formValue.project || null}
                placeholder="<Select>"
                onChange={handleProjectChange}
              />
            </Box>
          )}
        </Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700} color="#536B83">
            Receiver Address <chakra.span color={"red"}> *</chakra.span>
          </Text>
          <Text color={"#041439"} mt="8px">
            The Ethereum address or ENS of the person you want to give this
            Proof of Friendship NFT to.
          </Text>

          <Input
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="satoshi.eth"
            type="text"
            value={formValue.receiverAddress || ""}
            onChange={(e) =>
              handleFieldChange("receiverAddress", e.target.value)
            }
          />
        </Box>
        <Box mt={"20px"}>
          <Text fontSize={"16px"} fontWeight={700} color="#536B83">
            Message
          </Text>
          <Text color={"#041439"} mt="8px">
            This is a private message to the receipent on the link that you can
            send to them for them to claim their Proof of Friendship NFT.
          </Text>

          <Input
            mt={"20px"}
            backgroundColor="white"
            color="black"
            placeholder="Really appreciate all your help Satoshi. Here’s a little thank you!"
            type="text"
            value={formValue.message || ""}
            onChange={(e) => handleFieldChange("message", e.target.value)}
          />
        </Box>
      </Box>
      {errorMessage && (
        <Text fontWeight="bold" color="red.700" mt={5} textAlign={"center"}>
          {errorMessage}
        </Text>
      )}
      <Flex justifyContent={"center"} mt="40px">
        <UIButton onClick={handleSubmit}>Mint Credential</UIButton>
      </Flex>
    </Box>
  );
};
export default MintNewNFT;
