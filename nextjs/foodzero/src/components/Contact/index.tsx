import { memo } from 'react'
import Link from 'next/link'
import { Box, Text } from '@chakra-ui/react'

// Components
import ListSocial from '@components/ListSocial'

// Constants
import { SOCIAL_LIST } from '@constants/index'

interface ContactProps {
  phoneNumber: string
  email: string
  address: string
  isShowIcon?: boolean
}

const Contact = ({
  phoneNumber,
  email,
  address,
  isShowIcon = false,
}: ContactProps) => {
  return (
    <Box>
      <Text
        variant="primary"
        fontFamily="Rufina"
        size="common"
        fontWeight="bold"
        pb={{ base: '8px', '2xl': '18px' }}
      >
        Contact
      </Text>
      {isShowIcon && (
        <Box
          as="hr"
          color="black"
          borderTop="4px dotted white"
          width={{ base: '215px', md: '297px' }}
        />
      )}
      <Link href={`tel:${phoneNumber}`} prefetch={false}>
        <Text
          variant="primary"
          pt={{ base: '20px', md: '38px' }}
          size={{ base: 'small', md: 'base' }}
        >
          {phoneNumber}
        </Text>
      </Link>
      <Link href={`mailto:${email}`} prefetch={false}>
        <Text variant="primary" size={{ base: 'small', md: 'base' }}>
          {email}
        </Text>
      </Link>
      <Text
        variant="primary"
        pt={{ base: '20px', md: '38px' }}
        size={{ base: 'small', md: 'base' }}
        maxW="187px"
      >
        {address}
      </Text>
      {isShowIcon && (
        <ListSocial
          listSocial={SOCIAL_LIST}
          pt={{ base: '20px', md: '38px' }}
        />
      )}
    </Box>
  )
}

export default memo(Contact)
