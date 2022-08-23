import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useMediaQuery,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const AccordionSection = ({
  onChange,
  accordionItems,
  defaultIndex,
  selectedTabIndex,
  ...props
}) => {
  const [isDesktop] = useMediaQuery("(min-width: 768px)");
  return (
    <Box w={"100%"} {...props}>
      <Accordion
        allowMultiple={isDesktop ? false : true}
        allowToggle={isDesktop ? false : true}
        index={[selectedTabIndex]}
      >
        {accordionItems.map((item) => {
          const RenderComponent = item.component;
          return (
            <AccordionItem key={`accordion-${item.id}`} {...item.tabItemProps}>
              {({ isExpanded }) => (
                <>
                  <AccordionButton
                    onClick={() => onChange(item.id)}
                    pl={0}
                    _focus={{ outline: "unset" }}
                    _expanded={{
                      bg: "linear-gradient(90deg, #FCEB4F 0%, rgba(252, 235, 79, 0) 100%)",
                      color: "#041439",
                    }}
                    borderRadius="12px"
                  >
                    <Flex
                      flexGrow={1}
                      alignItems={"center"}
                      flexDirection={"row"}
                      justifyContent="space-between"
                    >
                      <Flex alignItems={"center"}>
                        <Box pl="6px">
                          {item.iconPath && (
                            <Image
                              src={item.iconPath}
                              alt="item-icon"
                              w="24px"
                              height={"24px"}
                            />
                          )}
                          {!item.iconPath && (
                            <FontAwesomeIcon icon={item.icon} color="#0057B7" />
                          )}
                        </Box>
                        <Text
                          ml="10px"
                          color={"#0057B7"}
                          fontWeight={700}
                          fontSize={"20px"}
                        >
                          {item.title}
                        </Text>
                      </Flex>
                      <Text fontWeight={700}>{item.count || 0}</Text>
                    </Flex>
                    {isExpanded && <Box ml="10px">➡️</Box>}
                  </AccordionButton>
                  <AccordionPanel pb={4} display={["block", "block", "none"]}>
                    <RenderComponent {...item.props} />
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          );
        })}
      </Accordion>
    </Box>
  );
};

export default AccordionSection;
