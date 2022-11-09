import { Box, Flex, Text } from '@chakra-ui/react'

// Components
import Icon from '@components/Icon'
import NavBar from '@components/NavBar'

// Constants
import { NAV_LIST, SOCIAL_ICONS } from '@constants/index'

const Footer = () => {
  return (
    <Box as="footer" pt="37px" pb="40px" borderTop="1px">
      <Flex justifyContent="space-between">
        <NavBar paddingTop="10px" navList={NAV_LIST} />
        <Flex
          borderBottom="1px"
          borderBottomColor="dark"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="16px" color="secondary" marginBottom="10px">
            Give an email, get the newsletter.
          </Text>
          <Icon alt="Right arrow" ml="128px" srcIcon="/images/iconRight.svg" />
        </Flex>
      </Flex>
      <Flex mt="48px" justifyContent="space-between" alignItems="center">
        <Text fontWeight={400} fontSize="16px" color="secondary">
          <Text as="b" fontWeight={500} color="dark">
            © 2021 Shelly.
          </Text>{' '}
          Terms of use{' '}
          <Text as="b" fontWeight={500} color="dark">
            and
          </Text>{' '}
          privacy policy
        </Text>
        <Flex w="150px" justifyContent="space-between">
          {SOCIAL_ICONS.map((icon) => (
            <Icon key={icon.id} alt={icon.alt} srcIcon={icon.iconURL} />
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
