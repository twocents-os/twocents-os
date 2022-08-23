import { Box, Input, Button } from "@chakra-ui/react";
import { useRef } from "react";
import { useApi } from "@src/shared/api";

function FileUploadButton({ onUpload, uploadEndPoint, icon, ...props }) {
  const api = useApi();
  const fileInputRef = useRef();
  const handleSubmitAvatar = async (file) => {
    const formData = new FormData();
    formData.append("file-asset", file);
    let response = await api.uploadFile(uploadEndPoint, formData);
    onUpload(response);
  };
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Button onClick={handleClick} {...props}>
        {props.children}
      </Button>
      <Input
        ref={fileInputRef}
        display="none"
        accept="image/*"
        type="file"
        onChange={(event) => {
          if (event.target.files && event.target.files.length > 0) {
            handleSubmitAvatar(event.target.files[0]);
          }
        }}
      />
    </>
  );
}

export default FileUploadButton;
