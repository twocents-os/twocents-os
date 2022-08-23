import {
  Editable,
  EditableInput,
  EditablePreview,
  ButtonGroup,
  Flex,
  IconButton,
  useEditableControls,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import React from "react";

const EditableField = ({ value, onChange, isEditable, ...props }) => {
  function EditableControls({ ...props }) {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm" {...props}>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center" alignItems={"center"} {...props}>
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }
  return (
    <Editable
      textAlign="left"
      defaultValue="Rasengan ⚡️"
      fontSize="2xl"
      isPreviewFocusable={false}
      value={value}
      display={"inline-block"}
      color={"#F5C467"}
      fontWeight={700}
      {...props}
    >
      <Flex alignItems={"center"}>
        <EditablePreview
          borderBottom="solid 2px black"
          borderRadius={"unset"}
        />
        <EditableInput
          _focus={{ outline: "unset", borderBottom: "soild 2px black" }}
          borderRadius={"unset"}
          borderBottom="solid 2px black"
          onChange={onChange}
        />
        {isEditable && <EditableControls mt="10px" ml="10px" color="black" />}
      </Flex>
    </Editable>
  );
};
export default EditableField;
