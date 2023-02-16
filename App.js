import { NativeBaseProvider } from 'native-base'
import Home from './src/screens/Home'
import About from './src/screens/About'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import History from './src/screens/History'
import MyLibrary from './src/screens/MyLibrary'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            animation: 'fade_from_bottom',
            tabBarIcon: ({ focused, color, size }) => {
              let iconName
              if (route.name === 'Home')
                iconName = focused ? 'home-sharp' : 'home-outline'
              else if (route.name === 'About') {
                iconName = focused
                  ? 'ios-information-circle'
                  : 'ios-information-circle-outline'
              } else if (route.name === 'MyLibrary')
                iconName = focused ? 'ios-library' : 'ios-library-outline'
              else if (route.name === 'History')
                iconName = focused ? 'ios-time' : 'ios-time-outline'

              return <Ionicons name={iconName} size={size} color={color} />
            },
          })}
        >
          <Tab.Screen name="Home" component={Home} options={{title: 'Popular Books'}} />
          <Tab.Screen name="MyLibrary" component={MyLibrary} />
          <Tab.Screen name="History" component={History} />
          <Tab.Screen name="About" component={About} />
        </Tab.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}
