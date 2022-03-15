import React from "react";
import { Box, Img } from "@chakra-ui/react";

export interface IShowImageProps {
  src: string;
}

const ShowImage = ({ src }: IShowImageProps) => {
  return (
      <Img src={src} alt={src} />
  );
};

export default ShowImage;
