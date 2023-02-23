import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Avatar, HStack, Popover, Pressable } from 'native-base'
import { Button, IconButton } from 'react-native-paper'
import * as AuthSession from 'expo-auth-session'
import { setAuth, setUser, useAppState } from '../../state'
import LoginButton from '../components/LoginButton'

const HeaderRight = () => {
  const {
    state: { user, auth },
    dispatch,
  } = useAppState()
  const { navigate } = useNavigation()

  const logout = async () => {
    await AuthSession.revokeAsync(
      { token: auth?.accessToken },
      { revocationEndpoint: 'https://oauth2.googleapis.com/revoke' }
    )
    await AsyncStorage.clear()
    dispatch(setUser(null))
    dispatch(setAuth(null))
  }
  console.log(user)
  return (
    <HStack spane="2" alignItems={'center'}>
      <IconButton icon={'magnify'} onPress={() => navigate('Search')} />
      {!user ? (
        <LoginButton />
      ) : (
        <Popover
          w="48"
          trigger={(triggerProps) => (
            <Pressable {...triggerProps}>
              <Avatar bg="green.200" size="sm" source={{ uri: user.picture }}>
                {user?.name
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
      )}
    </HStack>
  )
}
export default HeaderRight
