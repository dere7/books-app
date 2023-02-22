import { Button } from 'react-native-paper'
import { useAuth } from '../../hooks'

const LoginButton = () => {
  const auth = useAuth()
  return (
    <Button icon="google" mode="contained-tonal" {...auth}>
      Sign with google
    </Button>
  )
}

export default LoginButton
