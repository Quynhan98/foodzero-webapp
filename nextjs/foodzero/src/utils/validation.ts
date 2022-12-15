// Constants
import {
  EMAIL_NOT_EXIST,
  INVALID_PASSWORD,
  INVALID_EMAIL_FORMAT,
  INVALID_PASSWORD_FORMAT,
  REGEX_EMAIL,
  REGEX_PASSWORD,
  REQUIRED,
} from '@constants/index'

// Types
import { IUser, LoginAccount } from '@self-types/index'

// Utils
import { findItemByValue } from '@utils/index'

type ErrorMsgs = { email: string; password: string }

export interface checkValidateProps {
  value: string
  regex: RegExp
  errorMess: string
}

export interface ValidationResult {
  isValid: boolean
  data?: { userId?: string }
  error?: ErrorMsgs
}

// Check validate input value
export const checkValidate = (args: checkValidateProps): string => {
  switch (true) {
    // case required
    case args.value === '':
      return REQUIRED
    // case error format with regex
    case !args.regex.test(args.value):
      return args.errorMess
    // case valid input successfully
    default:
      return ''
  }
}

export const loginValidate = (
  loginAccount: LoginAccount,
  users: IUser[] | [],
): ValidationResult => {
  const user = findItemByValue({
    data: users,
    value: loginAccount.email,
    key: 'email',
  })

  const result: ValidationResult = { isValid: true, data: { userId: user?.id } }
  result.error = { email: '', password: '' }

  const validateEmail = checkValidate({
    value: loginAccount.email,
    regex: REGEX_EMAIL,
    errorMess: INVALID_EMAIL_FORMAT,
  })

  const validatePassword = checkValidate({
    value: loginAccount.password,
    regex: REGEX_PASSWORD,
    errorMess: INVALID_PASSWORD_FORMAT,
  })

  // Email
  if (!user) {
    result.error.email = EMAIL_NOT_EXIST
  }
  if (validateEmail) {
    result.error.email = validateEmail
  }

  // Password
  if (loginAccount.password !== user?.password) {
    result.error.password = INVALID_PASSWORD
  }

  if (validatePassword) {
    result.error.password = validatePassword
  }

  // Result
  if (result.error.email || result.error.password) {
    result.isValid = false
  }

  return result
}
