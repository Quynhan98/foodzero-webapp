import { memo } from 'react'
import { Box, BoxProps, ListItem, UnorderedList } from '@chakra-ui/react'
import Link from 'next/link'

type NavigationType = {
  value: number
  name: string
  href: string
}

interface NavigationProps extends BoxProps {
  navList: NavigationType[]
  onClick?: () => void
}

const Navigation = ({ navList, onClick, ...rest }: NavigationProps) => {
  return (
    <Box as="nav" {...rest}>
      <UnorderedList
        display="flex"
        flexDirection="column"
        gap={{ base: '15px', '2xl': '28px' }}
      >
        {navList.map((obj) => (
          <ListItem
            key={obj.value}
            color="white"
            textTransform="uppercase"
            fontSize={{ base: '26px', '2xl': '66px' }}
            lineHeight={{ base: '30px', '2xl': '82px' }}
            fontWeight="bold"
          >
            <Link href={obj.href} onClick={onClick} prefetch={false}>
              {obj.name}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default memo(Navigation)
