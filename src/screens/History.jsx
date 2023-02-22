import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Center, Heading } from 'native-base'
import { useAppState } from '../../state'
import LoginButton from '../components/LoginButton'

const HistoryScreen = () => {
  const {
    state: { user },
  } = useAppState()
  if (!user)
    return (
      <Center flex={1}>
        <LoginButton />
      </Center>
    )
  return <Heading>Recently Read</Heading>
}

const HistoryStack = createNativeStackNavigator()
const History = () => {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="History" component={HistoryScreen} />
    </HistoryStack.Navigator>
  )
}

export default History
