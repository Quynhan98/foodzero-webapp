import { ChangeEvent, FormEvent, memo } from 'react'
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react'

// Components
import Picker from '@components/Picker'
import SelectField from '@components/SelectField'

// Constants
import { NUMBER_OF_PERSON, RESERVATION_TIME } from '@constants/index'

interface ReservationFormProps {
  onSubmitForm: (e: FormEvent<HTMLFormElement>) => void
  onChangeField?: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  handleChangeDate: (date: Date) => void
  isShowFullField?: boolean
  isDisableButton?: boolean
  isDisableField?: boolean
}

const ReservationForm = ({
  onSubmitForm,
  onChangeField,
  handleChangeDate,
  isShowFullField = false,
  isDisableButton,
  isDisableField,
}: ReservationFormProps) => {
  return (
    <form onSubmit={onSubmitForm}>
      <FormControl
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width={{ base: '351px', md: '100%' }}
        margin={{ base: '0 auto', md: 'unset' }}
      >
        <Flex flexDirection="column" justifyContent="center" margin="0 auto">
          <Heading
            as="h3"
            size={{ base: 'small', md: 'large' }}
            variant="secondary"
            pb={{ base: '10px', md: '18px' }}
          >
            Make a Reservation
          </Heading>
          <Text
            pb={{ base: '50px', md: isShowFullField ? '115px' : '133px' }}
            textAlign={isShowFullField ? 'start' : 'center'}
            size={{ base: 'small', md: 'default' }}
          >
            Get in touch with restaurant
          </Text>
        </Flex>

        {isShowFullField && (
          <>
            <Flex
              flexDirection={{ base: 'column', md: 'row' }}
              gap={{ base: '0px', md: '48px' }}
            >
              <Input
                onChange={onChangeField}
                name="firstName"
                type="text"
                placeholder="First Name"
                mb={{ base: '18px', md: '48px' }}
              />
              <Input
                onChange={onChangeField}
                name="lastName"
                type="text"
                placeholder="Last Name"
                mb={{ base: '18px', md: '48px' }}
              />
            </Flex>
            <Input
              onChange={onChangeField}
              name="email"
              type="email"
              placeholder="Email"
              mb={{ base: '18px', md: '48px' }}
            />
            <Input
              onChange={onChangeField}
              name="phone"
              type="text"
              placeholder="Phone"
              mb={{ base: '18px', md: '48px' }}
            />
          </>
        )}
        <Flex
          flexDirection={{
            base: 'column',
            md: isShowFullField ? 'column' : 'row',
          }}
          gap={{ base: '18px', md: '48px' }}
        >
          <Flex
            justifyContent="space-between"
            flexDirection={{ base: 'column', md: 'unset' }}
            gap={{ base: '18px', md: '48px' }}
          >
            <Box>
              <Picker
                disabled={isDisableField}
                width={{
                  base: '351px',
                  md: isShowFullField ? '798px' : '516px',
                }}
                onChangeDate={handleChangeDate}
                isMinDate
                isMaxDate
              />
            </Box>
            <SelectField
              name="time"
              isDisabled={isDisableField}
              data-testid="selectTime"
              options={RESERVATION_TIME}
              onChangeSelect={onChangeField}
              width={{ base: '351px', md: isShowFullField ? '798px' : '516px' }}
            />
          </Flex>
          <SelectField
            name="person"
            isDisabled={isDisableField}
            data-testid="selectPerson"
            options={NUMBER_OF_PERSON}
            onChangeSelect={onChangeField}
          />
        </Flex>
        <Box
          margin="0 auto"
          pt={{ base: '50px', md: isShowFullField ? '80px' : '133px' }}
        >
          <Button
            type="submit"
            variant={isShowFullField ? 'default' : 'dark'}
            size="primary"
            isDisabled={isDisableButton}
          >
            Book Now
          </Button>
        </Box>
      </FormControl>
    </form>
  )
}

export default memo(ReservationForm)
