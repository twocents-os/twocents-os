import {
  Input,
  InputGroup,
  InputLeftElement,
  Center,
  Box,
  Flex,
} from "@chakra-ui/react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePageState } from "@src/shared/state";

export default function SearchBar({ ...props }) {
  const [state, methods] = usePageState();

  const handleSearchKeydown = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/people/${state.searchText}`;
    }
  };

  const handleSearchTextChange = (e) => {
    methods.setSearchText(e.target.value);
  };

  return (
    <Center {...props}>
      <InputGroup
        maxW={["unset", "unset", "800px"]}
        border="solid 2px #FFE200"
        borderRadius={"8px"}
      >
        <InputLeftElement pointerEvents="none" color="grey">
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"#FFE200"}
            m="3px"
            w="32px"
            h="32px"
            borderRadius={"6px"}
          >
            <FontAwesomeIcon icon={faSearch} color="black" />
          </Flex>
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
        />
      </InputGroup>
    </Center>
  );
}
