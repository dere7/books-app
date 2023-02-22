import { NativeBaseProvider, Text } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper'
import {
  AppStateProvider,
} from './state'
import Main from './src/Main'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'blue',
    secondary: 'yellow',
  },
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
