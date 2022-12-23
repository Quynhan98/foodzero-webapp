import { useState, useCallback, FormEvent, ChangeEvent, useMemo } from 'react'
import Image from 'next/image'
import { Box, Flex, Heading, Text, useToast } from '@chakra-ui/react'

// Constants
import {
  INTRO_VIDEO,
  LEADER_SHIP,
  NUMBER_OF_PERSON,
  RESERVATION_TIME,
  SERVER_ERROR,
  SNACKBAR_BOOKING_SUCCESS,
  SOPHISTICATED_PROCESS,
} from '@constants/index'

// Components
import ReservationForm from '@components/ReservationForm'

// Hooks
import { useBookingContext } from '@hooks/useBookingContext'

// Context
import { IBookingContext } from '@contexts/BookingProvider'

const reservationInit = {
  date: '' as unknown as Date,
  time: RESERVATION_TIME[0],
  person: NUMBER_OF_PERSON[0],
}

const About = () => {
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

  const renderSteps = useMemo(
    () => (
      <>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'center', md: 'space-between' }}
          gap={{ base: '10px', md: '102px' }}
          pt={{ base: '30px', md: '174px' }}
          alignItems="center"
          margin={{ base: '0 auto', md: 'unset' }}
        >
          <Box
            width={{ base: '277px', md: '792px' }}
            height={{ base: '233px', md: '638px' }}
            position="relative"
          >
            <Image
              fill
              src={SOPHISTICATED_PROCESS.stepOne.imageUrl}
              alt="split ribs picture"
              sizes="(max-width: 768px) 277px, 233px
  (min-width: 1200px) 792px, 638px"
            />
          </Box>
          <Box maxW={{ base: '277px', md: '616px' }}>
            <Heading as="h4" size="medium" variant="secondary">
              01.{SOPHISTICATED_PROCESS.stepOne.title}
            </Heading>
            <Text pt={{ base: '8px', md: '28px' }}>
              {SOPHISTICATED_PROCESS.stepOne.description}
            </Text>
          </Box>
        </Flex>
        <Flex
          pt={{ base: '50px', md: '118px' }}
          flexDirection={{ base: 'column', md: 'row-reverse' }}
          justifyContent="space-between"
        >
          <Box margin={{ base: '0 auto', md: 'unset' }}>
            <Box
              width={{ base: '277px', md: '650px' }}
              height={{ base: '227px', md: '533px' }}
              position="relative"
            >
              <Image
                fill
                src={SOPHISTICATED_PROCESS.stepTwo.imageUrl}
                alt="marinated ribs picture"
                sizes="(max-width: 768px) 277px, 227px
  (min-width: 1200px) 650px, 533px"
              />
            </Box>
            <Heading
              as="h4"
              size="medium"
              variant="secondary"
              pt={{ base: '8px', md: '46px' }}
              ml={{ base: '0px', md: '80px' }}
            >
              02.{SOPHISTICATED_PROCESS.stepTwo.title}
            </Heading>
            <Text
              pt={{ base: '8px', md: '28px' }}
              maxW={{ base: '277px', md: '415px' }}
              ml={{ base: '0px', md: '80px' }}
            >
              {SOPHISTICATED_PROCESS.stepTwo.description}
            </Text>
          </Box>
          <Flex
            pl={{ base: '0px', md: '71px' }}
            pt={{ base: '50px', md: '150px' }}
            flexDirection={{ base: 'column-reverse', md: 'column' }}
            margin={{ base: '0 auto', md: 'unset' }}
            gap={{ base: '10px', md: 'unset' }}
          >
            <Box pb={{ base: '20px', md: '46px' }}>
              <Heading as="h4" size="medium" variant="secondary">
                03.{SOPHISTICATED_PROCESS.stepThree.title}
              </Heading>
              <Text
                pt={{ base: '8px', md: '28px' }}
                maxW={{ base: '277px', md: '432px' }}
              >
                {SOPHISTICATED_PROCESS.stepThree.description}
              </Text>
            </Box>
            <Box
              width={{ base: '277px', md: '650px' }}
              height={{ base: '217px', md: '509px' }}
              position="relative"
            >
              <Image
                fill
                src={SOPHISTICATED_PROCESS.stepThree.imageUrl}
                alt="grilled ribs picture"
                sizes="(max-width: 768px) 277px, 217px
  (min-width: 1200px) 650px, 509px"
              />
            </Box>
          </Flex>
        </Flex>
      </>
    ),
    [],
  )

  return (
    <>
      <Box
        backgroundImage="/images/aboutBackground.webp"
        backgroundSize="cover"
        objectFit="cover"
        maxW="1920px"
        maxH="1080px"
        padding={{ base: '90px 12px', md: '350px 138px 328px 138px' }}
      >
        <Heading size="extraLarge" maxW={{ base: '200px', md: '779px' }}>
          View Our New Menu
        </Heading>
        <Text
          pt={{ base: '25px', md: '50px' }}
          maxW={{ base: '200px', md: '779px' }}
          variant="primary"
        >
          The freshest ingredients for you every day
        </Text>
      </Box>

      {/* Our Story section */}
      <Box
        as="section"
        padding={{ base: '60px 12px', md: '218px 138px 299px 138px' }}
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          width: { base: '92px', md: '355px' },
          height: { base: '78px', md: '300px' },
          top: { base: '20px', md: '112px' },
          left: '33%',
          backgroundImage: '/images/tomato.webp',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        {/* Our Story */}
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'center', md: 'space-between' }}
          alignItems="center"
          gap={{ base: '30px', md: '102px' }}
        >
          <Box
            maxW="668px"
            pl={{ base: '10px', md: '77px' }}
            pt={{ base: '0px', md: '150px' }}
          >
            <Heading as="h3" size="large" variant="secondary">
              Our Story
            </Heading>
            <Text pt="18px">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus
              lorem id penatibus imperdiet. Turpis egestas ultricies purus
              auctor tincidunt lacus nunc.
            </Text>
          </Box>
          <Box
            width={{ base: '277px', md: '792px' }}
            height={{ base: '198px', md: '567px' }}
            position="relative"
            margin="0 auto"
          >
            <Image
              fill
              src="/images/cooking.webp"
              alt="cooking picture"
              sizes="(max-width: 768px) 277px, 198px
        (min-width: 1200px) 792px, 567px"
            />
          </Box>
        </Flex>
        {/* Restaurant Manager */}
        <Flex
          pt={{ base: '70px', md: '162px' }}
          pl={{ base: 'unset', md: '33px' }}
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'center', md: 'unset' }}
          gap={{ base: '10px', md: '111px' }}
        >
          <Flex flexDirection="column" gap={{ base: '10px', md: '24px' }}>
            <Heading as="h4" variant="secondary" textAlign="center">
              Restaurant Manager
            </Heading>
            <Text textAlign="center">{LEADER_SHIP.restaurantManager.name}</Text>
            <Box
              width={{ base: '254px', md: '726px' }}
              height={{ base: '301px', md: '861px' }}
              position="relative"
              margin="0 auto"
            >
              <Image
                fill
                src={LEADER_SHIP.restaurantManager.avatar}
                alt="Restaurant manager avatar"
                sizes="(max-width: 768px) 254px, 301px
        (min-width: 1200px) 726px, 861px"
              />
            </Box>
          </Flex>
          <Text
            pt={{ base: '10px', md: '160px' }}
            maxW={{ base: '254px', md: '510px' }}
            margin={{ base: '0 auto', md: 'unset' }}
          >
            {LEADER_SHIP.restaurantManager.description}
          </Text>
        </Flex>
        {/* Executive Chef */}
        <Flex
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          justifyContent={{ base: 'center', md: 'flex-end' }}
          alignItems={{ base: 'center', md: 'end' }}
          gap={{ base: '10px', md: '111px' }}
          mt={{ base: '30px', md: '-438px' }}
          pr={{ base: 'unset', md: '38px' }}
        >
          <Text
            pt={{ base: '10px', md: '160px' }}
            maxW={{ base: '254px', md: '510px' }}
            margin={{ base: '0 auto', md: 'unset' }}
            textAlign={{ base: 'start', md: 'end' }}
          >
            {LEADER_SHIP.executiveChef.description}
          </Text>
          <Flex flexDirection="column" gap={{ base: '10px', md: '24px' }}>
            <Heading as="h4" variant="secondary" textAlign="center">
              Executive Chef
            </Heading>
            <Text textAlign="center">{LEADER_SHIP.executiveChef.name}</Text>
            <Box
              width={{ base: '254px', md: '726px' }}
              height={{ base: '301px', md: '861px' }}
              position="relative"
              margin="0 auto"
            >
              <Image
                fill
                src={LEADER_SHIP.executiveChef.avatar}
                alt="Executive chef avatar"
                sizes="(max-width: 768px) 254px, 301px
        (min-width: 1200px) 726px, 861px"
              />
            </Box>
          </Flex>
        </Flex>
      </Box>

      {/* Intro video */}
      <Box
        as="video"
        controls
        autoPlay
        src={INTRO_VIDEO}
        poster="/images/introPoster.jpg"
        objectFit="cover"
        width="100%"
        height="100%"
        maxH={{ base: '159px', md: '814px' }}
        css={{
          '&::-webkit-media-controls-panel': {
            display: 'none',
          },
        }}
      />

      {/* Process section */}
      <Box
        as="section"
        padding={{ base: '60px 12px', md: '267px 138px 320px 138px' }}
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          width: { base: '117px', md: '468px' },
          height: { base: '136px', md: '547px' },
          top: '8px',
          right: '0px',
          backgroundImage: '/images/rosemaryRight.webp',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
        _after={{
          content: '""',
          position: 'absolute',
          width: { base: '82px', md: '320px' },
          height: { base: '83px', md: '330px' },
          bottom: { base: '8px', md: '32px' },
          left: '0px',
          backgroundImage: '/images/rosemaryLeft.webp',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <Heading
          as="h3"
          size="large"
          variant="secondary"
          textAlign="center"
          pr={{ base: '30px', md: '65px' }}
        >
          Sophisticated Process
        </Heading>
        {renderSteps}
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
    </>
  )
}

export default About
