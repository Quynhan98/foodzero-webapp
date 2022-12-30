import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import { BREAKPOINTS } from '@constants/index'

interface CardCategoryProps {
  href: string
  category: string
  imageUrl: string
}

const CardCategory = ({ href, category, imageUrl }: CardCategoryProps) => {
  const [isMobile] = useMediaQuery(BREAKPOINTS.MEDIUM)

  return (
    <Box position="relative" maxW="508px" maxH="711px">
      <Flex
        position="absolute"
        zIndex="1"
        width="100%"
        justifyContent="space-between"
        padding={{ base: '25px 20px', '2xl': '50px 45px' }}
      >
        <Text
          size="extraLarge"
          variant="secondary"
          fontWeight="bold"
          fontFamily="Rufina"
        >
          {category}
        </Text>
        <Link
          href={href}
          prefetch={false}
          style={{
            position: 'relative',
            width: isMobile ? '36px' : '46px',
            height: isMobile ? '20px' : '26px',
          }}
        >
          <Image
            fill
            src="/images/rightArrow.webp"
            alt="right arrow icon"
            sizes="(max-width: 768px) 36px, 20px
                (min-width: 1200px) 46px, 26px"
          />
        </Link>
      </Flex>
      <Image
        src={imageUrl}
        alt="background of the category card"
        width={508}
        height={711}
      />
    </Box>
  )
}

export default memo(CardCategory)
