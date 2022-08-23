import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  IconButton,
  Flex,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { usePageState } from "@src/shared/state";
import Explanation from "@src/shared/onboarding/UserGuidModal/Explanation";
import NextSteps from "@src/shared/onboarding/UserGuidModal/NextSteps";

export const UserGuideModal = ({ isOpen, onClose }) => {
  const [nextStepOption, setNextStepOption] = useState(null);
  const [state] = usePageState();
  const [step, setStep] = useState("next-steps");
  const steps = ["next-steps", "explanation"];
  const options = [
    {
      id: 1,
      title: "Create a Project",
      explanationTitle: "Create a Project",
      explanation:
        "Set up a project to show others what you are working on. Showcase the project to invite contributors to join in or make it easier for potential collaborators to discover what's happening with the project. ",
      actionLink: "/project/create",
    },
    {
      id: 2,
      title: "Set Up My Two Cents Profile",
      explanationTitle: "Set Up My Two Cents Profile",
      explanation:
        "Your Two Cents Profile showcases your on-chain Web3 activities such as the POAPs you have collected. It allows you to control your own narrative by shaping your own Web3 identity and add links to what matters to you!",
      actionLink: `/people/${state.currentAddress}`,
    },
    {
      id: 3,
      title: "Send a 'Proof of Friendship' Thank You ",
      explanationTitle: "Send a 'Proof of Friendship'",
      explanation:
        "Met someone awesome? Been working in a community or a project with someone? Someone did something awesome for you? Mark that special occassion by giving them a non-transferable ‘Proof of Friendship’ NFT as a token of appreciation!",
      actionLink: "/pof/generate",
    },
  ];

  const handleContinue = async (data) => {
    const currentStepIndex = steps.findIndex((s) => s === step);
    const nextStep = steps[currentStepIndex + 1];
    setStep(nextStep);
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} size={"full"}>
        <ModalOverlay />
        <ModalContent maxW={"unset"} backgroundColor="#F0F1F4">
          {step !== "next-steps" && (
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
            <Box>
              {step === "next-steps" && (
                <NextSteps
                  onContinue={handleContinue}
                  setNextStepOption={setNextStepOption}
                  options={options}
                  onClose={onClose}
                />
              )}
              {step === "explanation" && (
                <Explanation
                  nextStepOption={nextStepOption}
                  backButtonHandler={handleBackClick}
                />
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
