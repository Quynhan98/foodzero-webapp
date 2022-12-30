import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'

// Components
import Contact from '@components/Contact'
import ListSocial from '@components/ListSocial'

// Constants
import { CONTACT, SOCIAL_LIST } from '@constants/index'
import Link from 'next/link'

const Footer = () => {
  return (
    <Box
      as="footer"
      backgroundColor="zinnwalditeBrown"
      padding={{
        base: '42px 12px ',
        md: '100px 50px',
        '2xl': '132px 0px 74px 0px',
      }}
    >
      <Flex
        flexDirection={{ base: 'column', md: 'row' }}
        justifyContent="space-between"
        maxW="1644px"
        width="100%"
        margin="0 auto"
        pb={{ base: '45px', md: '137px' }}
      >
        <Flex
          justifyContent="space-between"
          width={{ base: '100%', md: '38%' }}
        >
          <Heading as="h1" maxW={{ base: '100px', md: '188px' }} size="default">
            <Link href="/" prefetch={false}>
              Food Zero.
            </Link>
          </Heading>
          <Contact {...CONTACT} />
        </Flex>
        <Box>
          <Text
            variant="primary"
            fontFamily="Rufina"
            fontWeight="bold"
            size="common"
            pb={{ base: '15px', md: '55px' }}
            pt={{ base: '25px', md: '0px' }}
          >
            Never Miss a Recipe
          </Text>
          <Flex
            gap={{ base: '10px', md: '30px' }}
            pb="10px"
            alignItems="center"
          >
            <Input
              width={{ base: '80%', md: '400px', '2xl': '523px' }}
              variant="primary"
              placeholder="Email Address"
              _placeholder={{ color: 'white' }}
            />
            <Button
              variant="secondary"
              fontWeight={{ base: 'base', md: 'bold' }}
            >
              Subscribe
            </Button>
          </Flex>
          <Text variant="primary" size="extraSmall" lineHeight="xxs">
            Join our subscribers and get best recipe delivered each week!
          </Text>
        </Box>
      </Flex>
      <Divider
        variant="dashed"
        borderBottomWidth="2px"
        borderBottomColor="white"
        opacity={1}
        mb={{ base: '20px', md: '58px' }}
      />
      <Flex
        flexDirection={{ base: 'column-reverse', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        maxW="1644px"
        width="100%"
        margin="0 auto"
        gap="20px"
        pt={{ base: '20px', md: '38px' }}
      >
        <Text variant="primary" size="default">
          © 2020 Zero Inc. All rights Reserved
        </Text>
        <ListSocial listSocial={SOCIAL_LIST} />
      </Flex>
    </Box>
  )
}

export default Footer
