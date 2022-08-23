import {
  ButtonGroup,
  Flex,
  IconButton,
  Box,
  Textarea,
  useBoolean,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import React from "react";

const EditableTextarea = ({
  value,
  onChange,
  onSubmit,
  isEditable,
  ...props
}) => {
  const [isEditing, setIsEditing] = useBoolean();
  const EditableControls = ({ ...props }) => {
    const handleSubmit = () => {
      setIsEditing.toggle();
      onSubmit();
    };
    return isEditing ? (
      <Flex justifyContent="right" alignItems={"center"} {...props}>
        <ButtonGroup justifyContent="center" size="sm">
          <IconButton icon={<CheckIcon />} onClick={handleSubmit} />
          <IconButton icon={<CloseIcon />} onClick={setIsEditing.toggle} />
        </ButtonGroup>
      </Flex>
    ) : (
      <Flex justifyContent="right" alignItems={"center"} {...props}>
        <IconButton
          size="sm"
          icon={<EditIcon />}
          onClick={setIsEditing.toggle}
        />
      </Flex>
    );
  };

  return (
    <Box>
      {isEditing && (
        <Textarea
          border={"unset"}
          _focus={{ border: "unset" }}
          onChange={onChange}
          value={value}
        />
      )}
      {!isEditing && (
        <Box {...props} whiteSpace={"pre-wrap"}>
          {value}
        </Box>
      )}
      {isEditable && <EditableControls />}
    </Box>
  );
};
export default EditableTextarea;
