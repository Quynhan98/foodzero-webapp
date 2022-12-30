import { Component } from 'react'
import Link from 'next/link'
import { Center, Text } from '@chakra-ui/react'

// Constants
import { SERVER_ERROR } from '@constants/index'

interface State {
  error: Error | null
}

interface Props {
  children: JSX.Element[] | JSX.Element
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { error: null }
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
    })
  }

  render() {
    const { error } = this.state
    const { children } = this.props

    if (error) {
      return (
        <Center flexDirection="column" minH="100vh" paddingBottom="200px">
          <Text
            color="warning"
            fontWeight="bold"
            size={{ base: 'default', '2xl': 'large' }}
            paddingBottom={{ base: '25px', '2xl': '50px' }}
          >
            {SERVER_ERROR}
          </Text>
          <Link
            href="/"
            style={{ fontSize: 'large', color: 'blue' }}
            prefetch={false}
          >
            Back To Home
          </Link>
        </Center>
      )
    }

    return children
  }
}
