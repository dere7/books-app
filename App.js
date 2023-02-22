import { NativeBaseProvider, Text } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import MyLibrary from './src/screens/MyLibrary'
import History from './src/screens/History'
import About from './src/screens/About'
import HomeStackScreen from './src/screens/HomeStackScreen'
import {
  AppStateProvider,
  setAuth,
  setUser,
  toggleLoading,
  useAppState,
} from './state'
import Login from './src/screens/Login'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { fetchUser } from './hooks'
import Loading from './src/components/Loading'
import { refreshAsync } from 'expo-auth-session'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'yellow',
  },
}

const Tab = createMaterialBottomTabNavigator()

const TabScreen = () => (
  <Tab.Navigator
    shifting={true}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName = route.name.toLocaleLowerCase()
        if (route.name === 'About') iconName = 'info'
        else if (route.name == 'HomeScreen') iconName = 'home'
        else if (route.name === 'MyLibrary')
          return <Ionicons name="ios-library" size={26} color={color} />

        return <MaterialIcons name={iconName} size={26} color={color} />
      },
    })}
  >
    <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
    <Tab.Screen name="MyLibrary" component={MyLibrary} />
    <Tab.Screen name="History" component={History} />
    <Tab.Screen name="About" component={About} />
  </Tab.Navigator>
)

const Main = () => {
  const {
    state: { user, skipLogin, loading },
    dispatch,
  } = useAppState()

  useEffect(() => {
    dispatch(toggleLoading())
    ;(async () => {
      try {
        let auth = await AsyncStorage.getItem('auth')
        auth = JSON.parse(auth)
        if (auth) {
          const user = await fetchUser(auth.accessToken)
          dispatch(setUser(user))
          dispatch(toggleLoading())
        }
      } catch (e) {
        alert(e.message)
      }
      // .then((auth) => {
      //   if (auth)
      //     refreshAsync(
      //       {
      //         clientId:
      //           '481485281548-tgvg9qj8f6kj2avkgau5sntahg0fg61c.apps.googleusercontent.com',
      //         refreshToken: auth.refreshToken,
      //       },
      //       {
      //         tokenEndpoint: 'www.googleapis.com/oauth2/v4/token',
      //       }
      //     )
      // })
    })()
  }, [])
  if (loading) return <Loading />
  if (user||skipLogin) return <TabScreen />
  return  <Login />
}

export default function App() {
  return (
    <AppStateProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <NativeBaseProvider>
            <Main />
          </NativeBaseProvider>
        </NavigationContainer>
      </PaperProvider>
    </AppStateProvider>
  )
}
