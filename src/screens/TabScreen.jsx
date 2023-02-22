import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs"
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import HomeStackScreen from "./HomeStackScreen"
import MyLibrary from "./MyLibrary"
import History from "./History"
import About from "./About"

const Tab = createMaterialBottomTabNavigator()

const TabScreen = () => (
  <Tab.Navigator
    shifting={true}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName = route.name.toLocaleLowerCase()
        if (route.name === 'About') iconName = 'info'
        else if (route.name == 'HomeScreen') iconName = 'home'
        else if (route.name == 'HistoryScreen') iconName = 'history'
        else if (route.name === 'MyLibrary')
          return <Ionicons name="ios-library" size={26} color={color} />

        return <MaterialIcons name={iconName} size={26} color={color} />
      },
    })}
  >
    <Tab.Screen name="HomeScreen" component={HomeStackScreen} />
    <Tab.Screen name="MyLibrary" component={MyLibrary} />
    <Tab.Screen name="HistoryScreen" component={History} />
    <Tab.Screen name="About" component={About} />
  </Tab.Navigator>
)

export default TabScreen