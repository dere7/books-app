import { setUser, useAppState } from './state'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

WebBrowser.maybeCompleteAuthSession()

export const fetchUser = async (token) => {
  if (!token) return
  const res = await fetch(
    'https://www.googleapis.com/oauth2/v1/userinfo?alt=json',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data
}

export const useAuth = () => {
  const { dispatch } = useAppState()
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      '481485281548-tgvg9qj8f6kj2avkgau5sntahg0fg61c.apps.googleusercontent.com',
    iosClientId:
      '481485281548-tes317rkc5ir5kc459oc21ric7cae92h.apps.googleusercontent.com',
    androidClientId:
      '481485281548-pi8p6naauuac3r4mkt7s7br5d8p4agbq.apps.googleusercontent.com',
  })
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response
      fetchUser(authentication.accessToken)
        .then((user) => {
          dispatch(setUser(user))
          AsyncStorage.setItem('user', JSON.stringify(user))
          console.log(user)
        })
        .catch(console.error)
      if (authentication.refreshToken)
        AsyncStorage.setItem('auth', JSON.stringify({ ...authentication }))
    }
  }, [response])

  return { disabled: !request, onPress: () => promptAsync() }
}
