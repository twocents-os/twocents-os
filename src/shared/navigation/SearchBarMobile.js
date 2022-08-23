import {
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePageState } from "@src/shared/state";
import { useState } from "react";

export default function SearchBarMobile({ ...props }) {
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const [state, methods] = usePageState();

  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/people/${state.searchText}`;
    }
  };

  const handleSearchTextChange = (e) => {
    methods.setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    setIsMobileSearchActive(!isMobileSearchActive);
  };
  const activeStyle = {
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    h: "56px",
    zIndex: 3,
    w: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: ["flex", "flex", "none"],
  };

  return (
    <Box {...props} {...(isMobileSearchActive && activeStyle)}>
      {!isMobileSearchActive && (
        <IconButton
          display={["block", "block", "none"]}
          borderRadius={"50%"}
          mr="10px"
          onClick={handleSearchClick}
        >
          <FontAwesomeIcon icon={faSearch} color="gray.300" />
        </IconButton>
      )}
      {isMobileSearchActive && (
        <Flex flexGrow={1} ml="10px">
          <InputGroup maxW={["unset", "unset", "800px"]}>
            <InputLeftElement pointerEvents="none" color="grey">
              <FontAwesomeIcon icon={faSearch} color="gray.300" />
            </InputLeftElement>
            <Input
              backgroundColor="white"
              color="black"
              type="text"
              value={state.searchText}
              onKeyDown={handleSearchKeydown}
              onChange={handleSearchTextChange}
              placeholder="Search any ENS name or Ethereum address"
              css={{ "::placeholder": { color: "grey", fontStyle: "italic" } }}
              borderRadius="6px"
            />
          </InputGroup>
          <Flex
            onClick={handleSearchClick}
            w="48px"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <FontAwesomeIcon icon={faTimes} color="gray.300" size="lg" />
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
