import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import { useField } from 'formik'
import React from 'react'
import { Box } from '@chakra-ui/react';
interface InputFieldProp {
  name: string
  label: string
  placeholder: string
  type?: React.HTMLInputTypeAttribute
  required?: boolean
}

const InputField = (props: InputFieldProp) => {
  const [field, { error }] = useField(props)
  return (
    <Box mt={4}>
      <FormControl isInvalid = {!!error}>
        <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
        <Input
          {...field}
          id={field.name}
          {...props}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    </Box>
  )
}

export default InputField
