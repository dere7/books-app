import { Center, Heading, Text, VStack } from 'native-base'
import { Button } from 'react-native-paper'
import { useAuth } from '../../hooks'
import { toggleSkipLogin, useAppState } from '../../state'

const Login = () => {
  const { dispatch } = useAppState()
  const auth = useAuth()
  return (
    <Center flex={1}>
      <VStack space="2">
        <Button {...auth} icon="google" mode="contained">
          Login with Google
        </Button>
        <Text textAlign="center" fontSize="md">
          or
        </Text>
        <Button onPress={() => dispatch(toggleSkipLogin())}>Skip login</Button>
      </VStack>
    </Center>
  )
}

export default Login
