import { usePageState } from "@src/shared/state";
import { ChakraProvider, Progress, Box, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useApi } from "@src/shared/api";
import theme from "@src/shared/theme";
import { useCookies } from "react-cookie";
import * as gtag from "@src/shared/gtag";
import NavigationBar from "@src/shared/navigation";
import { Onboarding } from "@src/shared/onboarding";
import { useAccount } from "wagmi";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@src/shared/error/ErrorFallback";
import useErrorHandler from "@src/shared/error/useErrorHandler";
import * as FullStory from "@fullstory/browser";

export default function Layout({ children }) {
  const errorHandler = useErrorHandler();
  const placeTag = "shared-Layout";
  const [state, methods] = usePageState();
  const [{ data, error, loading }, disconnect] = useAccount({
    fetchEns: true,
  });
  const api = useApi();

  useEffect(() => {
    window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
      errorHandler(
        new Error(errorMsg),
        ["global-unhandeled"],
        {
          errorPath: url,
          lineNumber,
        },
        false
      );
    };
    FullStory.init({ orgId: "ZT8YS" });
  }, []);

  useEffect(() => {
    if (!state.currentAddress) {
      return;
    }

    FullStory.identify(state.currentAddress.toLowerCase(), {
      displayName: state.currentAddress.toLowerCase(),
      address: state.currentAddress.toLowerCase(),
    });
  }, [state.currentAddress]);

  useEffect(() => {
    if (!state.user?.onboardingData?.init?.userName) {
      return;
    }

    FullStory.setUserVars({
      displayName: state.user?.onboardingData?.init?.userName,
    });
  }, [state.user]);

  useEffect(() => {
    if (data?.address) {
      methods.setCurrentAddress(data.address);
    } else {
      methods.setCurrentAddress(null);
    }
    if (error) {
      console.log("error>", error);
    }
  }, [data, error, loading, methods]);

  useEffect(() => {
    if (!state.currentAddress) {
      return;
    }

    const fetchUsername = async () => {
      try {
        const response = await api.call(
          "get",
          `/api/users/fetch-user-basic-info?address=${state.currentAddress.toLowerCase()}`
        );
        methods.setUser(response.user);
      } catch (error) {
        errorHandler(error, [placeTag], null, false);
      }
    };
    fetchUsername();
  }, [state.currentAddress, methods]);

  const errorBoundaryHandler = (error, info) => {
    errorHandler(
      error,
      "global-error-boundary",
      {
        message: error.message,
        componentStack: info?.componentStack,
      },
      false
    );
  };

  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={errorBoundaryHandler}
      >
        <Progress
          size="xs"
          isIndeterminate
          display={state.isApiInProgress ? "block" : "none"}
          position="fixed"
          top={0}
          width="100%"
          zIndex="9999"
        />

        <NavigationBar />
        <Onboarding />
        {children}
      </ErrorBoundary>
    </ChakraProvider>
  );
}
