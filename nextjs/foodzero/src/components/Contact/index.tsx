import { memo } from 'react'
import { Box, ListItem, Text, UnorderedList } from '@chakra-ui/react'

// Components
import Social from '@components/Social'

// Constants
import { SOCIAL_LIST } from '@constants/index'

interface ContactProps {
  phoneNumber: string
  email: string
  address: string
  isIcon?: boolean
}

const Contact = ({
  phoneNumber,
  email,
  address,
  isIcon = false,
}: ContactProps) => {
  return (
    <Box>
      <Text
        variant="primary"
        fontSize={{ base: 'sm', md: 'md' }}
        fontWeight="bold"
        fontFamily="Rufina"
        pb={{ base: '8px', md: '18px' }}
      >
        Contact
      </Text>
      {isIcon && (
        <Box
          as="hr"
          color="black"
          borderTop="4px dotted white"
          width={{ base: '215px', md: '297px' }}
        />
      )}
      <Text
        variant="primary"
        pt={{ base: '20px', md: '38px' }}
        size={{ base: 'small', md: 'base' }}
      >
        {phoneNumber}
      </Text>
      <Text variant="primary" size={{ base: 'small', md: 'base' }}>
        {email}
      </Text>
      <Text
        variant="primary"
        pt={{ base: '20px', md: '38px' }}
        size={{ base: 'small', md: 'base' }}
        maxW="187px"
      >
        {address}
      </Text>
      {isIcon && (
        <UnorderedList
          display="flex"
          pt={{ base: '20px', md: '38px' }}
          gap="18px"
          justifyContent="flex-start"
          alignItems="center"
          marginLeft="0px"
        >
          {SOCIAL_LIST.map((item) => (
            <ListItem listStyleType="none">
              <Social key={item.value} {...item} />
            </ListItem>
          ))}
        </UnorderedList>
      )}
    </Box>
  )
}

export default memo(Contact)
