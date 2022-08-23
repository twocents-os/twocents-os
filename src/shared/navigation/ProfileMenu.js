import {
  Box,
  Button,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Image,
  Tooltip,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronRight,
  faHamburger,
  faHouseChimney,
  faPowerOff,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { usePageState } from "@src/shared/state";
import frontUtils from "@src/shared/front-utils";
import { useWallet } from "@src/shared/useWallet";
import { useAccount } from "wagmi";
export default function ProfileMenu({ handleWalletConnect, ...props }) {
  const [, disconnect] = useAccount({
    fetchEns: true,
  });
  const [state, methods] = usePageState();
  const toast = useToast();
  const wallet = useWallet();
  const handleAddressBadgeClick = () => {
    frontUtils.CopyMe(state.currentAddress);
    toast({
      title: "Address copied in clipboard",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    });
  };
  return (
    <Menu>
      <MenuButton
        {...props}
        as={Button}
        borderRadius={"150px"}
        border="solid 3px #84A6D8"
        backgroundColor="#F8E430"
        w="90px"
        height={"40px"}
        p={0}
      >
        <Flex justifyContent={"center"} alignItems={"center"} w="100%">
          <Image
            alt="random icon"
            src={
              state.user?.avatarImageUrl ||
              `/profile-icons/image ${frontUtils.getIconIndexByAddress(
                state.currentAddress
              )}.png`
            }
            borderRadius="50%"
            w="32px"
            h="32px"
            mr="10px"
            pt="1px"
            pb="1px"
          />
          <FontAwesomeIcon icon={faBars} color={"black"} />
        </Flex>
      </MenuButton>
      <MenuList
        border="1px solid #041439"
        backgroundColor="#FFE200"
        borderRadius={"8px"}
      >
        <Box color={"white"} p="10px">
          <Tooltip label="Click to copy address">
            <Text
              textAlign="center"
              fontWeight="bold"
              backgroundColor="grey"
              p={2}
              borderRadius="13px"
              cursor="pointer"
              onClick={handleAddressBadgeClick}
            >
              {frontUtils.get6DigitOfAccount(state.currentAddress)}{" "}
              {state.currentAddressUserName
                ? `(${state.currentAddressUserName})`
                : ""}
            </Text>
          </Tooltip>
        </Box>
        <MenuItem
          minW={"300px"}
          fontWeight={700}
          fontSize="20px"
          display={"flex"}
          justifyContent={"space-between"}
          color="#041439"
          _hover={{ backgroundColor: "#FFE200" }}
          _active={{ backgroundColor: "#FFE200" }}
          _focus={{ backgroundColor: "#FFE200" }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Box
              mr="10px"
              borderRadius={"150px"}
              border="solid 3px #84A6D8"
              backgroundColor="#F8E430"
            >
              <Image
                alt="random icon"
                src={
                  state.user?.avatarImageUrl ||
                  `/profile-icons/image ${frontUtils.getIconIndexByAddress(
                    state.currentAddress
                  )}.png`
                }
                w="32px"
                h="32px"
                borderRadius={"50%"}
              />
            </Box>
            <Link isExternal={false} href={`/people/${state.currentAddress}`}>
              View Your Profile
            </Link>
          </Box>
          <FontAwesomeIcon icon={faChevronRight} />
        </MenuItem>
        <MenuItem
          fontWeight={700}
          fontSize="20px"
          display={"flex"}
          justifyContent={"space-between"}
          color="#041439"
          _hover={{ backgroundColor: "#FFE200" }}
          _active={{ backgroundColor: "#FFE200" }}
          _focus={{ backgroundColor: "#FFE200" }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Box mr="10px" p="8px">
              <FontAwesomeIcon icon={faHouseChimney} />
            </Box>
            <Link isExternal={false} href="/dashboard">
              Dashboard
            </Link>
          </Box>
          <FontAwesomeIcon icon={faChevronRight} />
        </MenuItem>
        <MenuItem
          fontWeight={700}
          fontSize="20px"
          display={"flex"}
          justifyContent={"space-between"}
          color="#041439"
          _hover={{ backgroundColor: "#FFE200" }}
          _active={{ backgroundColor: "#FFE200" }}
          _focus={{ backgroundColor: "#FFE200" }}
        >
          <Link
            isExternal={false}
            href="/daos"
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
            w="100%"
          >
            <Box display={"flex"} alignItems={"center"}>
              <Box mr="10px" p="8px">
                <FontAwesomeIcon icon={faUserGroup} />
              </Box>
              DAOs
            </Box>
            <FontAwesomeIcon icon={faChevronRight} />
          </Link>
        </MenuItem>
        <MenuItem
          fontWeight={700}
          fontSize="20px"
          display={"flex"}
          justifyContent={"space-between"}
          color="#041439"
          _hover={{ backgroundColor: "#FFE200" }}
          _active={{ backgroundColor: "#FFE200" }}
          _focus={{ backgroundColor: "#FFE200" }}
          onClick={disconnect}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Box mr="10px" p="8px">
              <FontAwesomeIcon icon={faPowerOff} />
            </Box>
            <Link isExternal={false}>Disconnect</Link>
          </Box>
          <FontAwesomeIcon icon={faChevronRight} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
