import { useState, useCallback, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
  useToast,
} from '@chakra-ui/react'

// Constants
import {
  MENU_ENDPOINT,
  NUMBER_OF_PERSON,
  RESERVATION_TIME,
  SERVER_ERROR,
  SNACKBAR_BOOKING_SUCCESS,
} from '@constants/index'

// Services
import { fetcherInstance } from '@services/api'

// Types
import { IMenu } from '@self-types/Menu'

// Components
import PriceList from '@components/PriceList'
import ReservationForm from '@components/ReservationForm'

// Hooks
import { useBookingContext } from '@hooks/useBookingContext'

// Context
import { IBookingContext } from '@contexts/BookingProvider'

interface IMenuProps {
  menu: IMenu
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const menu: IMenu = await fetcherInstance(`${MENU_ENDPOINT}`)

    return {
      props: {
        menu,
      },
    }
  } catch (error) {
    throw SERVER_ERROR
  }
}

const reservationInit = {
  date: new Date(),
  time: RESERVATION_TIME[0],
  person: NUMBER_OF_PERSON[0],
}

const Menu = ({ menu }: IMenuProps) => {
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

  return (
    <>
      <Box
        backgroundImage="/images/newMenuBackground.webp"
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

      {/* Starters section */}
      <Box
        as="section"
        padding={{ base: '60px 12px', md: '122px 138px 140px 138px' }}
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          width: { base: '118px', md: '472px' },
          height: { base: '97px', md: '390px' },
          top: '0px',
          right: '0px',
          backgroundImage: '/images/blueberry.webp',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <Heading as="h3" size="large" variant="secondary" textAlign="center">
          Starters
        </Heading>
        <Text pt="18px" textAlign="center">
          This is a section of your menu. Give your section a brief description
        </Text>
        <Flex
          pt={{ base: '40px', md: '81px' }}
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'center', md: 'unset' }}
          gap={{ base: '30px', md: '102px' }}
        >
          <Box
            width={{ base: '277px', md: '792px' }}
            height={{ base: '314px', md: '898px' }}
            position="relative"
            margin="0 auto"
          >
            <Image
              fill
              src="/images/youngTofu.webp"
              alt="excellent cook picture"
              sizes="(max-width: 768px) 277px, 314px
        (min-width: 1200px) 792px, 898px"
            />
          </Box>
          <UnorderedList
            listStyleType="none"
            marginLeft="0px"
            gap={{ base: '30px', md: '60px' }}
          >
            {menu.starters.map((item) => (
              <ListItem maxW="792px" key={`states-${item.id}`}>
                <PriceList {...item} />
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
      </Box>

      {/* Mains section */}
      <Box
        as="section"
        padding={{ base: '40px 12px', md: '82px 138px 65px 138px' }}
      >
        <Heading as="h3" size="large" variant="secondary" textAlign="center">
          Mains
        </Heading>
        <Text pt="18px" textAlign="center">
          This is a section of your menu. Give your section a brief description
        </Text>
        <Flex
          pt={{ base: '40px', md: '81px' }}
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          justifyContent={{ base: 'center', md: 'space-between' }}
          gap={{ base: '30px', md: '102px' }}
          margin="0 auto"
        >
          <UnorderedList
            listStyleType="none"
            marginLeft="0px"
            gap={{ base: '30px', md: '60px' }}
          >
            {menu.mains.map((item) => (
              <ListItem maxW="792px" key={`mains-${item.id}`}>
                <PriceList {...item} />
              </ListItem>
            ))}
          </UnorderedList>
          <Box
            width={{ base: '277px', md: '792px' }}
            height={{ base: '314px', md: '898px' }}
            position="relative"
            margin="0 auto"
          >
            <Image
              fill
              src="/images/steak.webp"
              alt="excellent cook picture"
              sizes="(max-width: 768px) 277px, 314px
        (min-width: 1200px) 792px, 898px"
            />
          </Box>
        </Flex>
      </Box>

      {/* Pastries & Drinks section */}

      <Box
        as="section"
        padding={{ base: '50px 12px', md: '122px 138px 140px 138px' }}
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          width: { base: '87px', md: '348px' },
          height: { base: '104px', md: '415px' },
          top: '0px',
          left: '45%',
          backgroundImage: '/images/avocado.webp',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <Heading as="h3" size="large" variant="secondary" textAlign="center">
          Pastries & Drinks
        </Heading>
        <Text pt="18px" textAlign="center">
          This is a section of your menu. Give your section a brief description
        </Text>
        <Flex
          pt={{ base: '50px', md: '159px' }}
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'center', md: 'space-between' }}
          gap={{ base: '30px', md: '102px' }}
        >
          <Box
            width={{ base: '277px', md: '792px' }}
            height={{ base: '314px', md: '898px' }}
            position="relative"
            margin="0 auto"
          >
            <Image
              fill
              src="/images/lemonTea.webp"
              alt="excellent cook picture"
              sizes="(max-width: 768px) 277px, 314px
        (min-width: 1200px) 792px, 898px"
            />
          </Box>
          <UnorderedList
            listStyleType="none"
            marginLeft="0px"
            gap={{ base: '30px', md: '60px' }}
          >
            {menu.pastriesAndDrinks.map((item) => (
              <ListItem maxW="792px" key={`pastries-and-drinks-${item.id}`}>
                <PriceList {...item} />
              </ListItem>
            ))}
          </UnorderedList>
        </Flex>
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

export default Menu
