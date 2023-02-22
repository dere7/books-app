import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { fetchUser } from "../hooks"
import { setUser, toggleLoading, useAppState } from "../state"
import Login from "./screens/Login"
import TabScreen from "./screens/TabScreen"

const Main = () => {
  const {
    state: { user, skipLogin, loading },
    dispatch,
  } = useAppState()

  useEffect(() => {
    dispatch(toggleLoading())
    AsyncStorage.getItem('user')
      .then(JSON.parse)
      .then((user) => {
        dispatch(setUser(user))
        console.log(user)
      })
    AsyncStorage.getItem('auth')
      .then(JSON.parse).then(auth => {
        console.log(auth)
        return auth
      })
      .then(
        (auth) =>
          auth &&
          fetchUser(auth.accessToken)
            .then((user) => dispatch(setUser(user)))
            .then(() => toggleLoading())
      )
      .catch(alert)
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
  }, [])
//   if (loading) return <Loading />
  if (user || skipLogin) return <TabScreen />
  return <Login />
}

export default Main