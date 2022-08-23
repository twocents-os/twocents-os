import {
  Box,
  Flex,
  Input,
  Text,
  Container,
  Image,
  Center,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useApi } from "@src/shared/api";
import { usePageState } from "@src/shared/state";
import frontUtils from "@src/shared/front-utils";
import FileUploadButton from "@src/shared/file-upload-button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import UIButton from "@src/shared/ui-button";
import ListOfLinksEditor from "@src/shared/ListOfLinksEditor";
import useErrorHandler from "@src/shared/error/useErrorHandler";

const ProfileEditPageView = ({ address }) => {
  const errorHandler = useErrorHandler();
  const placeTag = "profile-edit-pageview";
  const toast = useToast();
  const api = useApi();
  const [state] = usePageState();
  const [profile, setProfile] = useState({});
  const [formValue, setFormValue] = useState({ links: [], skills: [] });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (
      !state.currentAddress ||
      state.currentAddress.toLowerCase() !== address.toLowerCase()
    ) {
      return;
    }
    const fetchProfileInfo = async () => {
      try {
        const response = await api.call(
          "GET",
          `/api/profiles/fetch-profile-for-edit?address=${address.toLowerCase()}`
        );
        setProfile(response.profile);
        handleFieldChangeObject({
          links: response.profile.userData.links || [
            { id: "init", title: "", url: "" },
          ],
          skills: response.profile.userData.skills,
          userName: response.profile.userData.userName,
          bio: response.profile.userData.bio,
          avatarImageUrl: response.profile.userData.avatarImageUrl,
          coverImageUrl: response.profile.userData.coverImageUrl,
        });
      } catch (error) {
        errorHandler(error, [placeTag]);
      }
    };
    fetchProfileInfo();
  }, [state.currentAddress]);

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

  const handleCoverImageUpload = (data) => {
    handleFieldChange("coverImageUrl", data.fileLocation);
  };

  const handleAvatarImageUpload = (data) => {
    handleFieldChange("avatarImageUrl", data.fileLocation);
  };

  const handleSkillToggle = (toggledSkill) => {
    const newArray = [...formValue.skills];
    const index = newArray.findIndex((skill) => skill._id === toggledSkill._id);
    newArray[index] = { ...toggledSkill, checked: !toggledSkill.checked };
    handleFieldChange("skills", newArray);
  };

  const isUserNameUnique = async () => {
    try {
      const response = await api.call(
        "get",
        `/api/users/is-username-unique?username=${
          formValue.userName
        }&address=${state.currentAddress.toLowerCase()}`
      );
      return response.isUserNameUnique;
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  const isUserNameValid = (username) => {
    const res = /^[a-zA-Z0-9_\.]+$/.exec(username);
    const valid = !!res;
    return valid;
  };

  const isFormValid = async () => {
    const isUserNameUniqueResult = await isUserNameUnique();
    if (!isUserNameUniqueResult) {
      setErrorMessage("Such user name already exists - Pleas use another one");
      return false;
    }

    if (frontUtils.isEmptyString(formValue.userName)) {
      setErrorMessage("Please set valid user name");
      return false;
    }
    if (formValue.userName.length < 4) {
      setErrorMessage("User name should have minimum 4 characters");
      return false;
    }
    if (!isUserNameValid(formValue.userName)) {
      setErrorMessage(`
          Usernames can only have: 
          - Lowercase Letters (a-z) 
          - Uppercase Letters (A-Z) 
          - Numbers (0-9) 
          - Dots (.) 
          - Underscores (_) 
`);
      return false;
    }
    if (frontUtils.isEmptyString(formValue.bio)) {
      setErrorMessage("Please write something about you");
      return false;
    }
    const selectedSkills = formValue.skills.filter((skill) => skill.checked);
    if (selectedSkills.length === 0) {
      setErrorMessage("Please select at least one skill");
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
      await api.call("POST", `/api/profiles/update-profile`, {
        ...formValue,
        links: getNonEmptyLinks(),
        address: state.currentAddress.toLowerCase(),
      });
      toast({
        title: `Updated`,
        description: `Redirection on profile page`,
        position: "bottom-right",
        isClosable: true,
        variant: "solid",
        status: "success",
      });
      window.location.href = `/people/${address}`;
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };

  return (
    <Box mb="100px">
      <Box
        h={"248px"}
        backgroundColor={"#A5ADCC"}
        textAlign="left"
        backgroundImage={formValue.coverImageUrl || "uset"}
        backgroundPosition={"center"}
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
      <Container maxW={"7xl"} p={"10px"}>
        <Box mt="-76px" position={"relative"}>
          <FileUploadButton
            zIndex="2"
            height="122px"
            width="122px"
            borderRadius="50%"
            p={0}
            position="relative"
            uploadEndPoint="/api/upload-asset"
            onUpload={handleAvatarImageUpload}
          >
            <Box
              border="2px white dashed"
              backgroundColor="#80808085"
              position={"absolute"}
              top="32px"
              left="18px"
              borderRadius={"32px"}
              p="10px"
            >
              <FontAwesomeIcon icon={faCameraRetro} color="white" />
              <Text color={"white"} fontWeight={700}>
                Change
              </Text>
            </Box>
            <Image
              src={
                formValue.avatarImageUrl ||
                `/profile-icons/image ${frontUtils.getIconIndexByAddress(
                  profile.address
                )}.png`
              }
              backgroundColor={"black"}
              height="122px"
              width="122px"
              alt="profile-picture"
              p="10px"
              borderRadius="50%"
              fallbackSrc="https://via.placeholder.com/214/1a202c/FFFFFF?Text=WebsiteBuilders.com"
            />
          </FileUploadButton>
        </Box>
        <Center>
          <Container>
            <Text fontSize={"18px"} fontWeight={700} color={"#536B83"}>
              Personal Info
            </Text>
            <Box mt={"20px"} w="100%">
              <Text fontSize={"16px"} color={"#536B83"}>
                User Name
              </Text>

              <Input
                mt={"20px"}
                backgroundColor="white"
                color="black"
                placeholder="The Bored Ape"
                type="text"
                value={formValue.userName || ""}
                onChange={(e) => handleFieldChange("userName", e.target.value)}
              />
            </Box>
            <Box mt={"20px"} w="100%">
              <Text fontSize={"16px"} color={"#536B83"}>
                About Me
              </Text>

              <Textarea
                mt={"20px"}
                backgroundColor="white"
                color="black"
                placeholder="I'm an ape sitting in a yacht. But no longer bored as I am starting really cool projects and now looking for contributors!"
                type="text"
                value={formValue.bio || ""}
                onChange={(e) => handleFieldChange("bio", e.target.value)}
              />
            </Box>
            <Box mt={"20px"} w="100%">
              <Text fontSize={"16px"} color={"#536B83"}>
                Skills
              </Text>
              <Flex wrap={"wrap"}>
                {formValue.skills.map((skill) => (
                  <Button
                    key={skill._id}
                    onClick={() => handleSkillToggle(skill)}
                    colorScheme={skill.checked ? "yellow" : "blackAlpha"}
                    borderRadius="32px"
                    pl="12px"
                    pr="12px"
                    pt="6px"
                    pb="6px"
                    mt="12px"
                    ml="10px"
                  >
                    {skill.title}
                  </Button>
                ))}
              </Flex>
            </Box>

            <Box mt="24px">
              <Text color={"#536B83"}>Awesome links of mine</Text>
              <ListOfLinksEditor
                formValue={formValue}
                handleFieldChange={handleFieldChange}
                mt={"24px"}
                urlPlaceHolder="https://twitter.com/elonmusk"
                titlePlaceHolder="Twitter"
              />
            </Box>
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
              <UIButton onClick={handleSubmit}>💾 Save Changes</UIButton>
            </Center>
          </Container>
        </Center>
      </Container>
    </Box>
  );
};

export default ProfileEditPageView;
