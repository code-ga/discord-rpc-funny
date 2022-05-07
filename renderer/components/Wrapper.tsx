import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

export interface WrapperPropType {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperPropType) => {
  return (
    <Box maxW="80%" w="100%" mt={8} mx="auto">
      <Box maxW={100} w={100} ml="auto">
        <DarkModeSwitch />
      </Box>
      {children}
    </Box>
  );
};

export default Wrapper;
