import { Box, Flex, Input, Text, IconButton } from "@chakra-ui/react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { customAlphabet } from "nanoid";

const ListOfLinksEditor = ({
  formValue,
  handleFieldChange,
  titlePlaceHolder,
  urlPlaceHolder,
  ...props
}) => {
  const nanoid = customAlphabet("1234567890abcdef", 10);
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const newArray = Array.from(formValue.links);
    const [removed] = newArray.splice(sourceIndex, 1);
    newArray.splice(destinationIndex, 0, removed);

    handleFieldChange("links", newArray);
  };

  const handleAddNewLink = () => {
    let uniqueId = nanoid();
    handleFieldChange("links", [
      ...formValue.links,
      { id: uniqueId, title: "", url: "" },
    ]);
  };

  const handleLinkAttributeChange = (value, index, attribute) => {
    const newLink = { ...formValue.links[index], [attribute]: value };
    const newArray = [...formValue.links];
    newArray[index] = newLink;
    handleFieldChange("links", newArray);
  };

  const handleRemoveLink = (index) => {
    const newArray = [...formValue.links];
    newArray.splice(index, 1);
    handleFieldChange("links", newArray);
  };

  return (
    <Box {...props}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list-of-links">
          {(provided) => (
            <Box ref={provided.innerRef} {...provided.droppableProps}>
              {formValue.links.map((link, index) => (
                <Box key={link.id}>
                  <Draggable draggableId={`link-${link.id}`} index={index}>
                    {(provided) => (
                      <Box
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        backgroundColor="white"
                        borderRadius="8px"
                        mt="12px"
                        cursor={"pointer"}
                        border="1px solid #E1E1E1"
                      >
                        <Flex>
                          <Flex
                            alignItems={"center"}
                            justifyContent={"center"}
                            w="44px"
                            borderRight={"1px solid #E1E1E1"}
                            mr="10px"
                          >
                            <FontAwesomeIcon
                              icon={faGripVertical}
                              color="grey"
                            />
                          </Flex>
                          <Flex flexDirection={"column"} flexGrow={1} p="12px">
                            <Box>
                              <Text fontSize={"14px"} fontWeight={600}>
                                Title
                              </Text>
                              <Input
                                type={"text"}
                                value={link.title}
                                placeholder={titlePlaceHolder}
                                mt="10px"
                                onChange={(e) =>
                                  handleLinkAttributeChange(
                                    e.target.value,
                                    index,
                                    "title"
                                  )
                                }
                              />
                            </Box>
                            <Box mt="14px">
                              <Text fontSize={"14px"}>Url</Text>
                              <Input
                                type={"url"}
                                value={link.url}
                                placeholder={urlPlaceHolder}
                                mt="10px"
                                onChange={(e) =>
                                  handleLinkAttributeChange(
                                    e.target.value,
                                    index,
                                    "url"
                                  )
                                }
                              />
                            </Box>
                            <Box textAlign={"right"} mt="14px">
                              <IconButton
                                onClick={() => handleRemoveLink(index)}
                              >
                                <FontAwesomeIcon icon={faTrash} color="grey" />
                              </IconButton>
                            </Box>
                          </Flex>
                        </Flex>
                      </Box>
                    )}
                  </Draggable>
                </Box>
              ))}
              <Box textAlign={"right"} mt="14px">
                <Text
                  textAlign={"right"}
                  textDecoration="underline"
                  color="blue"
                  display={"inline-block"}
                  cursor="pointer"
                  onClick={handleAddNewLink}
                >
                  + Add more links
                </Text>
              </Box>
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default ListOfLinksEditor;
