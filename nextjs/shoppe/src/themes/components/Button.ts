import { ComponentStyleConfig } from '@chakra-ui/react'

export const Button: ComponentStyleConfig = {
  sizes: {
    default: {
      width: '353px',
      height: '53px',
    },
  },
  variants: {
    primary: {
      textTransform: 'uppercase',
      bgColor: 'light',
      textColor: 'dark',
      borderRadius: '4px',
      border: '1px solid #000000',
      fontWeight: 'bold',
      fontSize: '16px',
    },
  },
}
