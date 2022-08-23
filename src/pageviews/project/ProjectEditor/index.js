import {
  Box,
  Container,
  Text,
  Input,
  Textarea,
  Center,
  useToast,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileUploadButton from "@src/shared/file-upload-button";
import ListOfLinksEditor from "@src/shared/ListOfLinksEditor";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import UIButton from "@src/shared/ui-button";
import { usePageState } from "@src/shared/state";
import frontUtils from "@src/shared/front-utils";
import { useApi } from "@src/shared/api";
import useErrorHandler from "@src/shared/error/useErrorHandler";

export const ProjectEditor = ({
  project,
  redirectOnEditAfterSubmit,
  submitButtonTittle,
}) => {
  const errorHandler = useErrorHandler();
  const placeTag = "shared-ProjectEditor";
  const [state] = usePageState();
  const toast = useToast();
  const api = useApi();
  const [formValue, setFormValue] = useState({
    ...project,
    links: [
      ...(project?.links || [
        {
          id: "initial_1",
          title: "",
          url: "",
        },
      ]),
    ],
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFieldChange = (fieldName, value) => {
    const updatedFormValue = { ...formValue, [fieldName]: value };
    setFormValue(updatedFormValue);
    return updatedFormValue;
  };

  const handleCoverImageUpload = (data) => {
    handleFieldChange("coverImageUrl", data.fileLocation);
  };

  const isFormValid = async () => {
    if (!state.currentAddress) {
      setErrorMessage("Please make sure that wallet is connected");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.coverImageUrl)) {
      setErrorMessage("Please upload cover image");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.name)) {
      setErrorMessage("Please set valid project name");
      return false;
    }
    if (formValue.name.length < 4) {
      setErrorMessage("Project name should have minimum 4 characters");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.tagline)) {
      setErrorMessage("Please set tagline");
      return false;
    }
    if (frontUtils.isEmptyString(formValue.description)) {
      setErrorMessage("Please write something about your project");
      return false;
    }

    setErrorMessage(null);
    return true;
  };

  const getNonEmptyLinks = () => {
    return formValue.links.filter(
      (link) =>
        !frontUtils.isEmptyString(link.title) &&
        !frontUtils.isEmptyString(link.url)
    );
  };

  const handleSubmit = async () => {
    try {
      const isValidationPassed = await isFormValid();
      if (!isValidationPassed) {
        console.log("submit profile - form is not valid");
        return;
      }

      const response = await api.call("POST", `/api/projects/submit-project`, {
        ...formValue,
        links: getNonEmptyLinks(),
        submittedBy: state.currentAddress.toLowerCase(),
      });
      const toastOptions = {
        position: "bottom-right",
        isClosable: true,
        variant: "solid",
        status: "success",
      };
      if (redirectOnEditAfterSubmit) {
        toast({
          title: `Project Created`,
          description: `Redirection on edit Page`,
          ...toastOptions,
        });
        window.location.href = `/project/${response.project._id}/edit`;
      } else {
        toast({
          title: `Project Updated`,
          ...toastOptions,
        });
      }
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };
  return (
    <Box backgroundColor={"#EBF0FF"} pb="100px">
      <Box backgroundColor="white" pt="40px" pb="40px">
        <Container maxW={"1100px"}>
          <Center>
            <Box
              minH={["200px", "200px", "400px", "600px"]}
              minW={["300px", "300px", "600px", "900px"]}
              w="auto"
              h="auto"
              background={
                !formValue.coverImageUrl &&
                "linear-gradient(180deg, #85C1D3 0%, #F2C174 100%)"
              }
              textAlign="left"
              backgroundImage={
                formValue.coverImageUrl && formValue.coverImageUrl
              }
              backgroundPosition={"center"}
              borderRadius="8px"
              backgroundSize={"cover"}
            >
              <FileUploadButton
                border="2px white dashed"
                backgroundColor="#80808085"
                mt="20px"
                ml="20px"
                _hover={{ backgroundColor: "#80808085" }}
                uploadEndPoint="/api/upload-asset"
                onUpload={handleCoverImageUpload}
              >
                <FontAwesomeIcon icon={faCameraRetro} color="white" />
                <Text color={"white"} fontWeight={700} ml="10px">
                  Change Cover Photo
                </Text>
              </FileUploadButton>
            </Box>
          </Center>
          <Box mt={"20px"} mb="40px" w="100%">
            <Text fontSize={"16px"} fontWeight={700} color={"#536B83"}>
              Project Name *
            </Text>

            <Input
              mt={"20px"}
              backgroundColor="white"
              color="black"
              placeholder="Friends With Benefits"
              type="text"
              value={formValue.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              border="unset"
              fontSize={"24px"}
              borderBottom="1px solid black"
              borderRadius={"unset"}
              _active={{
                borderBottom: "1px solid black",
              }}
              _focus={{
                borderBottom: "1px solid black",
              }}
              _placeholder={{ fontWeight: 700 }}
            />
          </Box>
        </Container>
      </Box>
      <Box>
        <Container>
          <Box mt="24px">
            <Text fontWeight={700} color={"#536B83"} fontSize={"16px"}>
              What is this project about?
            </Text>
            <Text mt="10px" fontSize={"14px"} color={"#041439"}>
              Tell the world about what project you are starting or worked on.
              Once you share some details about what you are working on, you can
              issue &apos;Proof of Friendship&apos; to those who have helped you
              on the project.
            </Text>
          </Box>
          <Box mt={"20px"} w="100%">
            <Text fontSize={"16px"} fontWeight={700} color={"#536B83"}>
              Tag (if any)
            </Text>

            <Input
              mt={"20px"}
              backgroundColor="white"
              color="black"
              placeholder="(3,3)"
              type="text"
              value={formValue.tag || ""}
              onChange={(e) => handleFieldChange("tag", e.target.value)}
            />
          </Box>
          <Box mt={"20px"} w="100%">
            <Text fontSize={"16px"} fontWeight={700} color={"#536B83"}>
              Tagline *
            </Text>

            <Input
              mt={"20px"}
              backgroundColor="white"
              color="black"
              placeholder="Concise and descriptive tagline"
              type="text"
              value={formValue.tagline || ""}
              onChange={(e) => handleFieldChange("tagline", e.target.value)}
            />
          </Box>
          <Box mt={"20px"} w="100%">
            <Text fontSize={"16px"} fontWeight={700} color={"#536B83"}>
              Description *
            </Text>

            <Textarea
              mt={"20px"}
              backgroundColor="white"
              color="black"
              placeholder="Short description about what the project is about. Share info on whatever people need to know about your project or community here."
              type="text"
              value={formValue.description || ""}
              onChange={(e) => handleFieldChange("description", e.target.value)}
            />
          </Box>
          <Box mt="24px">
            <Text fontWeight={700} color={"#536B83"} fontSize={"16px"}>
              Share links to the project
            </Text>
            <Text mt="10px" fontSize={"14px"} color={"#041439"}>
              Help others find out more about your project or community. Share
              all the relevant links so they can learn more about it or navigate
              to the relevant sites.
            </Text>
          </Box>
          <ListOfLinksEditor
            formValue={formValue}
            handleFieldChange={handleFieldChange}
            urlPlaceHolder="https://twitter.com/elonmusk"
            titlePlaceHolder="Twitter"
          />
          {errorMessage && (
            <Text
              fontWeight="bold"
              color="red.700"
              mt={5}
              textAlign={"center"}
              whiteSpace="pre-wrap"
            >
              {errorMessage}
            </Text>
          )}
          <Center mt="24px">
            <UIButton onClick={handleSubmit}>{submitButtonTittle}</UIButton>
          </Center>
        </Container>
      </Box>
    </Box>
  );
};
