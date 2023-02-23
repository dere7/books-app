import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import { setAuth, setUser, toggleLoading, useAppState } from '../state'
import Login from './screens/Login'
import TabScreen from './screens/TabScreen'
import { Platform } from 'react-native'
import Loading from './components/Loading'
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google'
import { androidClientId, expoClientId, iosClientId } from '@env'

WebBrowser.maybeCompleteAuthSession()
const Main = () => {
  const {
    state: { user, skipLogin, loading, auth },
    dispatch,
  } = useAppState()
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId,
    iosClientId,
    androidClientId,
    scopes: [
      'openid',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/books',
    ],
  })
  const [requireRefresh, setRequireRefresh] = useState(false)

  useEffect(() => {
    if (response?.type === 'success') {
      dispatch(setAuth(response.authentication))

      const persistAuth = async () => {
        await AsyncStorage.setItem(
          'auth',
          JSON.stringify(response.authentication)
        )
      }
      persistAuth()
      console.log(auth)
      getUserData()
    }
  }, [response])

  useEffect(() => {
    const getPersistedAuth = async () => {
      const jsonValue = await AsyncStorage.getItem('auth')
      if (jsonValue != null) {
        const authFromJson = JSON.parse(jsonValue)
        dispatch(setAuth(authFromJson))
        console.log(authFromJson)

        setRequireRefresh(
          !AuthSession.TokenResponse.isTokenFresh({
            expiresIn: authFromJson.expiresIn,
            issuedAt: authFromJson.issuedAt,
          })
        )

        if (requireRefresh) {
          refreshToken()
        }
      }
      getUserData()
    }
    getPersistedAuth()
  }, [])

  const getUserData = async () => {
    let userInfoResponse = await fetch(
      'https://www.googleapis.com/userinfo/v2/me',
      {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      }
    )

    userInfoResponse.json().then((data) => {
      console.log(data)
      dispatch(setUser(data))
    })
  }

  const refreshToken = async () => {
    const clientId = Platform.OS === 'ios' ? iosClientId : androidClientId
    console.log(auth)
    const tokenResult = await AuthSession.refreshAsync(
      {
        clientId: clientId,
        refreshToken: auth.refreshToken,
      },
      {
        tokenEndpoint: 'https://www.googleapis.com/oauth2/v4/token',
      }
    )

    tokenResult.refreshToken = auth.refreshToken

    dispatch(setAuth(tokenResult))
    await AsyncStorage.setItem('auth', JSON.stringify(tokenResult))
    setRequireRefresh(false)
  }

  if (loading) return <Loading title="loading data" />
  return user?.name || skipLogin ? (
    <TabScreen />
  ) : (
    <Login request={request} promptAsync={promptAsync} />
  )
}

export default Main
