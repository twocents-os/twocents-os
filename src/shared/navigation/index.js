import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UIButton from "@src/shared/ui-button";
import { usePageState } from "@src/shared/state";
import { useRouter } from "next/router";
import WalletConnectionTypeModal from "@src/shared/navigation/WalletConnectionTypeModal";
import SearchBar from "@src/shared/navigation/SearchBar";
import ProfileMenu from "@src/shared/navigation/ProfileMenu";
import SearchBarMobile from "./SearchBarMobile";

export default function NavigationBar({ ...props }) {
  const [state, methods] = usePageState();
  const router = useRouter();
  const [isSearchBarVissible, setIsSearchBarVissible] = useState(true);

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleWalletConnect = () => {
    methods.openConnectToWallet();
  };

  useEffect(() => {
    if (router && router.pathname === "/") {
      setIsSearchBarVissible(false);
    }
  }, [router]);

  return (
    <Box>
      <Box
        w="100%"
        zIndex={3}
        backgroundColor={"#1A2EF3"}
        pl={["0px", "0px", "40px"]}
        pr={["0px", "0px", "40px"]}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          h={"56px"}
        >
          <Box
            onClick={handleLogoClick}
            cursor="pointer"
            minW={"135px"}
            ml="10px"
          >
            <Image src="/logo/logo2.png" alt="logo" h="22px" />
          </Box>
          <Box
            flexGrow={1}
            ml="40px"
            mr="40px"
            display={["none", "none", "flex"]}
            justifyContent="center"
          >
            <SearchBar mt="5px" w="100%" maxW="445px" />
          </Box>
          <Box display="flex" justifyContent="end" alignItems="center">
            <SearchBarMobile />
            {state.currentAddress && <ProfileMenu mr="10px" />}
            {!state.currentAddress && (
              <Box display={"flex"} alignItems="center" p={2}>
                <UIButton
                  onClick={handleWalletConnect}
                  borderRadius="30px"
                  pl="40px"
                  pr="40px"
                  fontSize="20px"
                  fontWeight={700}
                >
                  Login
                </UIButton>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <WalletConnectionTypeModal isOpen={state.isWalletModalOpen} />
    </Box>
  );
}
