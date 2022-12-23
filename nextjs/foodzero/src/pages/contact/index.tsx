import { useState, useCallback, FormEvent, ChangeEvent } from 'react'
import Image from 'next/image'
import { Box, Flex, Heading, Link, Text, useToast } from '@chakra-ui/react'

// Constants
import {
  CONTACT,
  COUNTRY_CODE,
  INVALID_EMAIL_FORMAT,
  NUMBER_OF_PERSON,
  OPEN_TIME,
  PHONE_ERROR_LENGTH,
  REGEX_EMAIL,
  REGEX_REMOVE_BRACKETS,
  RESERVATION_TIME,
  SERVER_ERROR,
  SNACKBAR_BOOKING_SUCCESS,
} from '@constants/index'

// Components
import ReservationForm from '@components/ReservationForm'
import OpenTime from '@components/OpenTime'

// Hooks
import { useBookingContext } from '@hooks/useBookingContext'

// Context
import { IBookingContext } from '@contexts/BookingProvider'

// Utils
import { formatPhoneNumber } from '@utils/index'
import { checkValidate } from '@utils/validation'

const reservationInit = {
  date: '' as unknown as Date,
  time: RESERVATION_TIME[0],
  person: NUMBER_OF_PERSON[0],
  phone: '',
  firstName: '',
  lastName: '',
  email: '',
}

const initErrorMsgs = {
  email: '',
  phone: '',
}

const Contact = () => {
  const toast = useToast()
  const { booking, addBooking } = useBookingContext() as IBookingContext
  const [reservation, setReservation] = useState(reservationInit)
  const [errorMessage, setErrorMessage] = useState(initErrorMsgs)

  const phoneNumber = formatPhoneNumber(reservation.phone).replace(
    REGEX_REMOVE_BRACKETS,
    '',
  )

  const isDisableField = booking.length > 0

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

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e?.preventDefault()

      const payload = {
        ...reservation,
        phone: reservation.phone ? COUNTRY_CODE + phoneNumber : '',
      }

      const validateEmail = checkValidate({
        value: reservation.email,
        regex: REGEX_EMAIL,
        errorMess: INVALID_EMAIL_FORMAT,
      })

      if (
        (phoneNumber && phoneNumber.length !== 10) ||
        (reservation.email && validateEmail)
      ) {
        setErrorMessage((prev) => ({
          ...prev,
          phone: phoneNumber.length !== 10 ? PHONE_ERROR_LENGTH : '',
          email: reservation.email ? validateEmail : '',
        }))
      } else {
        try {
          setErrorMessage(initErrorMsgs)

          await addBooking([...booking, payload])

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
      }
    },
    [booking, phoneNumber, reservation],
  )

  return (
    <>
      <Box
        backgroundImage="/images/contactBackground.webp"
        backgroundSize="cover"
        objectFit="cover"
        maxW="1920px"
        maxH="1080px"
        padding={{ base: '90px 12px', md: '415px 138px 130px 138px' }}
      >
        <Heading size="extraLarge" maxW={{ base: '200px', md: '915px' }}>
          Get in Touch
        </Heading>
        <Text
          pt={{ base: '25px', md: '50px' }}
          maxW={{ base: '200px', md: '915px' }}
          fontSize={{ base: 'xxs', md: 'md' }}
          fontWeight={{ base: 'xxs', md: 'sm' }}
          variant="primary"
        >
          The freshest ingredients for you every day
        </Text>
        <Flex pt="93px" justifyContent={{ base: 'center', md: 'flex-end' }}>
          <OpenTime {...OPEN_TIME} />
        </Flex>
      </Box>

      {/* Address section */}
      <Box
        as="section"
        padding={{ base: '60px 12px', md: '272px 138px 186px 138px' }}
        position="relative"
        _before={{
          content: '""',
          position: 'absolute',
          width: { base: '112px', md: '446px' },
          height: { base: '98px', md: '391px' },
          top: '152px',
          left: '40%',
          backgroundImage: '/images/orange.webp',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          zIndex: -1,
        }}
      >
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent={{ base: 'center', md: 'unset' }}
          alignItems="center"
          gap={{ base: '20px', md: '202px' }}
        >
          <Box
            width={{ base: '277px', md: '792px' }}
            height={{ base: '208px', md: '593px' }}
            position="relative"
            margin={{ base: '0 auto', md: 'unset' }}
          >
            <Image
              fill
              src="/images/dinnerTable.webp"
              alt="excellent cook picture"
              sizes="(max-width: 768px) 277px, 314px
        (min-width: 1200px) 792px, 898px"
            />
          </Box>
          <Text
            pt={{ base: '0px', md: '230px' }}
            size="common"
            fontFamily="Rufina"
            fontWeight="bold"
            variant="secondary"
            maxW="507px"
          >
            We can be contacted <br /> via email{' '}
            <Link
              _hover={{ textDecoration: 'none' }}
              href={`mailto:${CONTACT.email}`}
            >
              <Text as="b" size="common" variant="appleGreen">
                {CONTACT.email}
              </Text>
            </Link>
            <br />
            or telephone on{' '}
            <Link
              _hover={{ textDecoration: 'none' }}
              href={`tel:${CONTACT.phoneNumber}`}
            >
              <Text as="b" size="common" variant="appleGreen">
                {CONTACT.phoneNumber}
              </Text>
            </Link>
          </Text>
        </Flex>
        <Flex
          pt={{ base: '60px', md: '145px' }}
          flexDirection={{ base: 'column-reverse', md: 'row' }}
          justifyContent={{ base: 'center', md: 'space-between' }}
          alignItems="center"
          gap={{ base: '20px', md: '60px' }}
        >
          <Text
            size="common"
            fontFamily="Rufina"
            fontWeight="bold"
            variant="secondary"
            maxW={{ base: '275px', md: '748px' }}
          >
            We are located in {CONTACT.address}
          </Text>
          <Box
            width={{ base: '277px', md: '792px' }}
            height={{ base: '347px', md: '990px' }}
            position="relative"
            margin={{ base: '0 auto', md: 'unset' }}
          >
            <Image
              fill
              src="/images/address.webp"
              alt="excellent cook picture"
              sizes="(max-width: 768px) 277px, 314px
        (min-width: 1200px) 792px, 898px"
            />
          </Box>
        </Flex>
      </Box>

      {/* Reservation Section */}
      <Box
        as="section"
        padding={{ base: '70px 12px', md: '237px 138px 254px 138px' }}
        backgroundColor="alabaster"
      >
        <ReservationForm
          emailError={errorMessage.email}
          phoneError={errorMessage.phone}
          isShowFullField
          phoneValue={formatPhoneNumber(reservation.phone)}
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

export default Contact