import { FormControl, FormLabel, Input, useColorMode } from "@chakra-ui/react";
import { useState } from "react";

const InputField = ({
  value,
  input,
  label,
  setInput,
  defaultValue,
}: {
  value: string;
  input: any;
  label: string;
  setInput: React.Dispatch<React.SetStateAction<any>>;
  defaultValue?: string | number;
}) => {
  const { colorMode } = useColorMode();
  const [moveLabel, setMoveLabel] = useState<boolean>(
    defaultValue ? true : false
  );

  return (
    <FormControl mb={5} maxW={"500px"}>
      <FormLabel
        transform={
          moveLabel || (input as any)[value].length > 0
            ? ""
            : "translateY(45px)"
        }
        pl={4}
        color={
          moveLabel || (input as any)[value].length > 0
            ? colorMode === "light"
              ? "black"
              : "#CF9FFF"
            : colorMode === "light"
            ? "#5D3FD3"
            : "white"
        }
      >
        {label}
      </FormLabel>
      <Input
        p={6}
        borderColor={
          moveLabel || (input as any)[value].length > 0
            ? colorMode === "light"
              ? "#5D3FD3"
              : "black"
            : colorMode === "light"
            ? "black"
            : "#CF9FFF"
        }
        type={
          value === "email"
            ? "email"
            : value === "password"
            ? "password"
            : "text"
        }
        // value={(input as any)[value]}
        defaultValue={defaultValue}
        placeholder={label}
        focusBorderColor={"#5D3FD3"}
        _placeholder={{ color: "transparent" }}
        onFocus={() => setMoveLabel(true)}
        onBlur={() => setMoveLabel(false)}
        onChange={(e) => setInput({ ...input, [value]: e.target.value })}
      />
    </FormControl>
  );
};

export default InputField;
