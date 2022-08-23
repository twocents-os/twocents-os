import { Box, useRadio, HStack, useRadioGroup } from "@chakra-ui/react";
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={props.checkedStyle}
        _focus={{
          boxShadow: "unset",
        }}
        px={5}
        py={3}
        css={props.defaultStyle}
      >
        {props.children}
      </Box>
    </Box>
  );
}
export default function RadioCards({
  options,
  onChange,
  checkedStyle,
  defaultValue,
  defaultStyle,
  ...props
}) {
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue,
    onChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} {...props}>
      {options.map((option) => {
        const radio = getRadioProps({ value: option.value });
        return (
          <RadioCard
            key={option.value}
            {...radio}
            checkedStyle={checkedStyle}
            defaultStyle={defaultStyle}
          >
            {option.label}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
