import { Button } from 'react-native-paper'
import { toggleSkipLogin, useAppState } from '../../state'

const LoginButton = () => {
  const {dispatch} = useAppState()
  return (
    <Button icon="google" mode="outlined" onPress={() => dispatch(toggleSkipLogin())}>
      Sign with google
    </Button>
  )
}

export default LoginButton
