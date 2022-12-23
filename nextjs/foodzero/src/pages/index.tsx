import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from 'react'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'

// Components
import CardBlog from '@components/CardBlog'
import CardCategory from '@components/CardCategory'
import CardFeature from '@components/CardFeature'
import CardReview from '@components/CardReview'
import PriceList from '@components/PriceList'
import ReservationForm from '@components/ReservationForm'

// Mocks
import { QUOTE_MOCK } from '@mocks/mockData'

// Services
import { fetcherInstance } from '@services/api'

// Constants
import {
  CATEGORY_SECTION,
  FEATURES_SECTION,
  MENU_ENDPOINT,
  NUMBER_OF_PERSON,
  POSTS_ENDPOINT,
  RESERVATION_TIME,
  SERVER_ERROR,
} from '@constants/index'

// Types
import { IPost } from '@self-types/Post'
import { IMenu, IOurMenu } from '@self-types/Menu'
import { useBookingContext } from '@hooks/useBookingContext'
import { IBookingContext } from '@contexts/BookingProvider'
import { SNACKBAR_BOOKING_SUCCESS } from '@constants/text'

interface IHomeProps {
  menu: IOurMenu[]
  posts: IPost[]
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const menu: IMenu = await fetcherInstance(MENU_ENDPOINT)
    const posts: IPost[] = await fetcherInstance(POSTS_ENDPOINT)

    return {
      props: {
        menu: menu.ourMenu,
        posts,
      },
    }
  } catch (error) {
    throw SERVER_ERROR
  }
}

const reservationInit = {
  date: '' as unknown as Date,
  time: RESERVATION_TIME[0],
  person: NUMBER_OF_PERSON[0],
}
export const Home = ({ menu, posts }: IHomeProps) => {
  const toast = useToast()
  const { booking, addBooking } = useBookingContext() as IBookingContext
  const [reservation, setReservation] = useState(reservationInit)

  const isDisableField = booking.length > 0

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e?.preventDefault()

      try {
        await addBooking([...booking, reservation])

        toast({
          title: 'Success',
          description: SNACKBAR_BOOKING_SUCCESS,
          status: 'success',
          isClosable: true,
          position: 'bottom-left',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: SERVER_ERROR,
          status: 'error',
          isClosable: true,
          position: 'bottom-left',
        })
      }
    },
    [booking, reservation],
  )

  const handleChangeDate = useCallback((date: Date) => {
    setReservation((prev) => ({
      ...prev,
      date,
    }))
  }, [])

  const handleChangeField = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const selectValues = { [e.target.name]: e.target.value }

      setReservation((prev) => ({
        ...prev,
        ...selectValues,
      }))
    },
    [],
  )

  const renderChefSection = useMemo(
    () => (
      <Flex gap={{ base: '10px', md: '61px' }} justifyContent="space-between">
        <Box
          mt="20px"
          width={{ base: '147px', md: '980px' }}
          height={{ base: '133px', md: '890px' }}
          position="relative"
          zIndex={2}
        >
          <Image
            fill
            src="/images/excellentCook.webp"
            alt="excellent cook picture"
            sizes="(max-width: 768px) 980px, 890px
        (max-width: 1200px) 50vw,
        33vw"
            style={{ objectFit: 'cover' }}
          />
        </Box>
        <Box maxW={{ base: '200px', md: '620px' }}>
          <Heading as="h3" size="large" variant="secondary">
            Excellent cook
          </Heading>
          <Text pt="18px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus lorem
            id penatibus imperdiet. Turpis egestas ultricies purus auctor
            tincidunt lacus nunc.
          </Text>
        </Box>
      </Flex>
    ),
    [],
  )

  return (
    <>
      {/* Hero Section */}
      <Box
        top="0px"
        position="relative"
        padding={{ base: '100px 12px', md: '310px 138px 222px 138px' }}
        _before={{
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '0px',
          left: '0px',
          backgroundColor: 'zinnwalditeBrown',
          zIndex: -1,
        }}
      >
        <Flex
          position="relative"
          flexDirection="column"
          _before={{
            content: '""',
            position: 'absolute',
            width: { base: '198px', md: '792px' },
            height: { base: '233px', md: '931px' },
            top: { base: '82px', md: '124px' },
            right: '0px',
            backgroundImage: '/images/bigSteak.webp',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            zIndex: -1,
          }}
        >
          <Heading size="extraLarge">
            Healthy Eating is important part of lifestyle
          </Heading>
          <Text
            pt={{ base: '25px', md: '50px' }}
            maxW={{ base: '160px', md: '840px' }}
            variant="primary"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
            congue arcu
          </Text>
        </Flex>
        <Flex justifyContent="space-between" pt={{ base: '35px', md: '100px' }}>
          <Flex
            flexDirection="column"
            alignItems="center"
            gap={{ base: '20px', md: '40px' }}
          >
            <Text size="extraLarge" variant="primary" transform="rotate(90deg)">
              Scroll
            </Text>
            <Divider
              height={{ base: '80px', md: '406px' }}
              variant="dashed"
              borderLeftWidth="2px"
              borderLeftColor="white"
              orientation="vertical"
              opacity={1}
            />
          </Flex>
          <Box
            width={{ base: '214px', md: '854px' }}
            height={{ base: '60px', md: '240px' }}
            position="relative"
            mt={{ base: '0px', md: '225px' }}
            mr={{ base: '65px', md: '285px' }}
            textAlign="center"
          >
            <Image
              fill
              src="/images/spiceCups.webp"
              alt="spice cups picture"
              sizes="(max-width: 768px) 854px, 240px
                (max-width: 1200px) 50vw,
                33vw"
              style={{ objectFit: 'cover' }}
            />
          </Box>
        </Flex>
        <Flex
          pt={{ base: '40px', md: '157px' }}
          justifyContent="space-between"
          gap="15px"
        >
          <Flex flexDirection="column">
            <Box
              width={{ base: '198px', md: '792px' }}
              height={{ base: '140px', md: '560px' }}
              position="relative"
            >
              <Image
                fill
                src="/images/clamSoup.webp"
                alt="clam soup picture"
                sizes="(max-width: 768px) 792px, 560px
                (max-width: 1200px) 50vw,
                33vw"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Heading as="h3" maxW="500px" pt={{ base: '10px', md: '54px' }}>
              Start to plan your diet today
            </Heading>
            <Text
              pt={{ base: '15px', md: '54px' }}
              variant="primary"
              maxW="565px"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
              congue arcu
            </Text>
          </Flex>
          <Flex flexDirection="column" maxW="508px">
            <Text variant="primary" pb={{ base: '15px', md: '84px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque
              congue arcu
            </Text>
            <Box
              width={{ base: '130px', md: '508px' }}
              height={{ base: '180px', md: '710px' }}
              position="relative"
            >
              <Image
                fill
                src="/images/spiceJar.webp"
                alt="spice jar picture"
                sizes="(max-width: 768px) 508px, 710px
                (max-width: 1200px) 50vw,
                33vw"
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Our Menu Section */}
      <Box
        as="section"
        padding={{ base: '50px 12px', md: '176px 138px 218px 138px' }}
        position="relative"
        minH="100vh"
        _before={{
          content: '""',
          position: 'absolute',
          width: { base: '220px', md: '897px' },
          height: { base: '236px', md: '897px' },
          top: '0px',
          right: '0px',
          backgroundImage: '/images/menuBackground.webp',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <Heading as="h3" size="large" variant="secondary" pt="54px">
          Our Menu
        </Heading>
        <Text pt={{ base: '10px', md: '54px' }} maxW="532px">
          This is a section of your menu. Give your section a brief description
        </Text>
        <UnorderedList
          display="grid"
          gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          listStyleType="none"
          marginLeft="0px"
          pt={{ base: '40px', md: '158px' }}
          gap={{ base: '30px', md: '60px' }}
        >
          {menu.map((item) => (
            <ListItem maxW="792px" key={`menu-${item.id}`}>
              <PriceList {...item} />
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* Chef Section */}
      <Box
        as="section"
        padding={{ base: '50px 12px', md: '240px 138px 0px 110px' }}
        backgroundColor="alabaster"
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          width: { base: '100px', md: '400px' },
          height: { base: '80px', md: '320px' },
          top: { base: '30px', md: '135px' },
          left: { base: '12px', md: '85px' },
          backgroundImage: '/images/leafLeft.webp',
          backgroundSize: 'cover',
          objectFit: 'cover',
          zIndex: 1,
        }}
        _after={{
          content: '""',
          position: 'absolute',
          width: { base: '113px', md: '450px' },
          height: { base: '98px', md: '390px' },
          bottom: { base: '20px', md: '30px' },
          right: { base: '12px', md: '138px' },
          backgroundImage: '/images/leafRight.webp',
          backgroundSize: 'cover',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        {renderChefSection}
      </Box>

      {/* Features Section */}
      <Box
        as="section"
        padding={{ base: '70px 12px', md: '207px 138px 190px 138px' }}
      >
        <UnorderedList
          display="flex"
          alignItems="center"
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
          listStyleType="none"
          marginLeft="0px"
          gap="30px"
        >
          {FEATURES_SECTION.map((item) => (
            <ListItem key={`feature-${item.id}`}>
              <CardFeature {...item} />
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* Recenter Post Section */}
      <Box
        as="section"
        padding={{ base: '50px 12px', md: '130px 138px 105px 138px' }}
      >
        <UnorderedList
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          listStyleType="none"
          marginLeft="0px"
          gap="30px"
        >
          {posts.map((item) => (
            <ListItem maxW="792px" key={`blog-${item.id}`}>
              <CardBlog {...item} />
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* Reservation Section */}
      <Box
        as="section"
        padding={{ base: '70px 12px', md: '237px 138px 254px 138px' }}
        backgroundColor="alabaster"
      >
        <ReservationForm
          onSubmitForm={handleSubmit}
          handleChangeDate={handleChangeDate}
          onChangeField={handleChangeField}
          isDisableField={isDisableField}
          isDisableButton={isDisableField || !reservation.date}
        />
      </Box>

      {/* Category Section */}
      <Box
        as="section"
        padding={{ base: '60px 12px', md: '128px 138px 136px 138px' }}
      >
        <Center flexDirection="column">
          <Heading
            as="h3"
            size="large"
            variant="secondary"
            maxW="1100px"
            textAlign="center"
          >
            Calories Energy Balance
          </Heading>
          <Text pt="18px">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Center>
        <UnorderedList
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          listStyleType="none"
          marginLeft="0px"
          pt={{ base: '50px', md: '126px' }}
          gap="30px"
        >
          {CATEGORY_SECTION.map((item) => (
            <ListItem key={`category-${item.id}`}>
              <CardCategory {...item} />
            </ListItem>
          ))}
        </UnorderedList>
      </Box>

      {/* Testimonials Section */}
      <Box
        as="section"
        padding={{ base: '50px 12px', md: '118px 138px 145px 246px' }}
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          width: { base: '70px', md: '282px' },
          height: { base: '58px', md: '234px' },
          top: { base: '70px', md: '118px' },
          right: { base: '15px', md: '255px' },
          backgroundImage: '/images/quotationMarks.webp',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -2,
        }}
      >
        <CardReview quotes={QUOTE_MOCK} />
      </Box>
    </>
  )
}

export default Home
