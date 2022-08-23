import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  IconButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { usePageState } from "@src/shared/state";
import { InitStep } from "@src/shared/onboarding/InitStep";
import { CategoryStep } from "@src/shared/onboarding/CategoryStep";
import { ContributionsStep } from "@src/shared/onboarding/ContributionsStep";
import { NotificationStep } from "@src/shared/onboarding/NotificationStep";
import { useApi } from "@src/shared/api";
import { UserGuideModal } from "@src/shared/onboarding/UserGuidModal";
import { SpecialTalantStep } from "@src/shared/onboarding/SpecialTalant";
import useErrorHandler from "@src/shared/error/useErrorHandler";

export const Onboarding = () => {
  const errorHandler = useErrorHandler();
  const placeTag = "onboarding-Onboarding";
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isUserGuidModalOpne,
    onOpen: onUserGuidModalOpen,
    onClose: onUserGuidModalClose,
  } = useDisclosure();

  const api = useApi();
  const toast = useToast();
  const [state, methods] = usePageState();
  const [step, setStep] = useState("init");
  const [onboardingData, setOnboardingData] = useState({});
  const [isOnboardingDataFetched, setIsOnboardingDataFetched] = useState(false);
  const steps = [
    "init",
    "category",
    "contributions",
    "specialTalant",
    "notification",
    "done",
  ];

  useEffect(() => {
    if (!state.currentAddress) {
      return;
    }
    const fetchOnboardingData = async () => {
      try {
        const response = await api.call(
          "get",
          `/api/users/fetch-onboarding?address=${state.currentAddress.toLowerCase()}`
        );
        setOnboardingData(response.onboardingData);
        setIsOnboardingDataFetched(true);

        if (response.onboardingData?.lastStep !== "done") {
          setStep(response.onboardingData.lastStep);
          onOpen();
        }
      } catch (error) {
        setIsOnboardingDataFetched(true);
        onOpen();
        errorHandler(error, [placeTag], null, false);
      }
    };
    fetchOnboardingData();
  }, [state.currentAddress]);

  const handleContinue = async (data) => {
    try {
      const updatedOnboardingData = { ...onboardingData, [step]: data };
      setOnboardingData(updatedOnboardingData);

      const currentStepIndex = steps.findIndex((s) => s === step);
      const nextStep = steps[currentStepIndex + 1];
      setStep(nextStep);

      await api.call("post", `/api/users/save-onboarding`, {
        onboardingData: { ...updatedOnboardingData, lastStep: nextStep },
        address: state.currentAddress.toLowerCase(),
      });

      if (nextStep === "done") {
        console.log("onboarding done");
        setStep("done");
        onClose();
        if (state.afterOnboardingUrl) {
          window.location.href = state.afterOnboardingUrl;
          return;
        }
        if (!state.skipOnboardingGuidStep) {
          onUserGuidModalOpen();
        }
      }
    } catch (error) {
      errorHandler(error, [placeTag]);
    }
  };
  const handleBackClick = () => {
    const currentStepIndex = steps.findIndex((s) => s === step);
    if (currentStepIndex === 0) {
      return;
    }
    const prevStep = steps[currentStepIndex - 1];
    setStep(prevStep);
  };
  return (
    <Box>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
      >
        <ModalOverlay />
        <ModalContent backgroundColor="#F0F1F4">
          {step !== "init" && (
            <Flex>
              <IconButton
                display={"inline-block"}
                background={"unset"}
                aria-label="go back"
                size={"lg"}
                fontSize={"20px"}
                icon={<ArrowBackIcon />}
                onClick={handleBackClick}
                _focus={{ outline: "unset" }}
              />
            </Flex>
          )}

          <ModalBody>
            {!isOnboardingDataFetched && <Box>Loading ...</Box>}
            {isOnboardingDataFetched && (
              <Box>
                {step === "init" && (
                  <InitStep
                    onContinue={handleContinue}
                    onboardingData={onboardingData.init}
                  />
                )}
                {step === "category" && (
                  <CategoryStep
                    onContinue={handleContinue}
                    onboardingData={onboardingData.category}
                  />
                )}
                {step === "contributions" && (
                  <ContributionsStep
                    onContinue={handleContinue}
                    onboardingData={onboardingData.contributions}
                  />
                )}
                {step === "specialTalant" && (
                  <SpecialTalantStep
                    onContinue={handleContinue}
                    onboardingData={onboardingData.specialTalant}
                  />
                )}
                {step === "notification" && (
                  <NotificationStep
                    onContinue={handleContinue}
                    onboardingData={onboardingData.notification}
                  />
                )}
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <UserGuideModal
        isOpen={isUserGuidModalOpne}
        onClose={onUserGuidModalClose}
      />
    </Box>
  );
};
