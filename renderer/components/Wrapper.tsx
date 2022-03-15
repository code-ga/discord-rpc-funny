import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export interface WrapperPropType {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperPropType) => {
  return (
    <Box maxW="80%" w="100%" mt={8} mx="auto">
      {children}
    </Box>
  );
};

export default Wrapper;
