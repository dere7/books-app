import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HeaderRight from '../components/HeaderRight'
import Details from './Details'
import Home from './Home'
import Search from './Search'

const Stack = createNativeStackNavigator()
const HomeStackScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationDuration: 100,
        animation: 'slide_from_right',
        headerRight: () => <HeaderRight />
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
