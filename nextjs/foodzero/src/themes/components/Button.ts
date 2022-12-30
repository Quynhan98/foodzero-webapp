import { ComponentStyleConfig } from '@chakra-ui/react'

export const Button: ComponentStyleConfig = {
  baseStyle: {
    fontSize: { base: 'xs', md: 'common', '2xl': 'md' },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Rufina',
    borderRadius: '0px',
    color: 'white',
  },
  sizes: {
    large: {
      width: '100%',
      height: { base: '50px', '2xl': '96px' },
    },
    default: {
      width: { base: '130px', md: '200px', '2xl': '285px' },
      height: { base: '50px', '2xl': '96px' },
    },
    primary: {
      width: { base: '200px', md: '260px', '2xl': '344px' },
      height: { base: '50px', md: '50px', '2xl': '96px' },
    },
    small: {
      width: { base: '30px', md: '40px', '2xl': '50px' },
      height: { base: '30px', md: '40px', '2xl': '50px' },
    },
  },

  variants: {
    default: {
      backgroundColor: 'bronzeYellow',
      border: '2px',
      borderColor: 'black',
    },
    primary: {
      backgroundColor: 'inherit',
      border: { base: '1px', md: '2px' },
      borderColor: 'white',
    },
    secondary: {
      backgroundColor: 'bronzeYellow',
    },
    dark: {
      backgroundColor: 'zinnwalditeBrown',
      border: '2px',
      borderColor: 'black',
    },
    light: {
      backgroundColor: 'inherit',
    },
  },

  defaultProps: {
    size: 'default',
    variant: 'default',
  },
}
