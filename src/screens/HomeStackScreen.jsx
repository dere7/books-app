import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Avatar, HStack, Menu, Popover, Pressable, Text } from 'native-base'
import { Button, IconButton } from 'react-native-paper'
import { useAuth } from '../../hooks'
import { setUser, useAppState } from '../../state'
import LoginButton from '../components/LoginButton'
import Details from './Details'
import Home from './Home'
import Search from './Search'

const HeaderRight = () => {
  const {navigate} = useNavigation()
  const {
    state: { user },
    dispatch,
  } = useAppState()
  const logout = async () => {
    await AsyncStorage.clear()
    dispatch(setUser(null))
  }
  if (!user) return <LoginButton />
  return (
    <HStack spane="2" alignItems={'center'}>
      <IconButton icon={"magnify"} onPress={() => navigate('Search')} />
      <Popover
        w="48"
        trigger={(triggerProps) => (
          <Pressable {...triggerProps}>
            <Avatar bg="green.200" size="sm" source={{ uri: user.picture }}>
              {user.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </Avatar>
          </Pressable>
        )}
        offset={24}
      >
        <Popover.Content accessibilityLabel="Delete Customerd" w="56">
          <Popover.Arrow />
          <Popover.Header borderWidth={'0'}>{user.name}</Popover.Header>
          <Popover.Footer justifyContent="flex-end">
            <Button mode="contained-tonal" icon="logout" onPress={logout}>
              Logout
            </Button>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </HStack>
  )
}
const Stack = createNativeStackNavigator()
const HomeStackScreen = () => {
  const {
    state: { user },
    dispatch,
  } = useAppState()
  const auth = useAuth()

  return (
    <Stack.Navigator
      screenOptions={{
        animationDuration: 100,
        animation: 'slide_from_right',
        headerRight: HeaderRight,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Recent Books' }}
      />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default HomeStackScreen
