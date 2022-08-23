import { Button } from "@chakra-ui/button";

export default function UIButton(props) {
  return (
    <>
      {!props.type && (
        <Button
          backgroundColor="#FCEB4F"
          borderRadius="12px"
          border={"2px black solid"}
          boxShadow="4px 4px 4px rgba(0, 0, 0, 0.25)"
          color="#222222"
          fontWeight="bold"
          fontSize={"18px"}
          _hover={{ backgroundColor: "#e3d12f" }}
          _active={{ backgroundColor: "#e3d12f" }}
          _focus={{ outline: "unset" }}
          {...props}
        >
          {props.children}
        </Button>
      )}
      {props.type === "secondary" && (
        <Button
          background="linear-gradient(93.89deg, #FCEB4F 0%, #CAFFFD 100%);"
          border="solid 3px black"
          borderRadius="12px"
          color="black"
          fontWeight="bold"
          fontSize={"18px"}
          _hover={{ backgroundColor: "black" }}
          _active={{ backgroundColor: "black" }}
          _focus={{ outline: "unset" }}
          {...props}
        >
          {props.children}
        </Button>
      )}
    </>
  );
}
