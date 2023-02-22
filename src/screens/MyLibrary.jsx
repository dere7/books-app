import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Box, Heading } from 'native-base'
import { useEffect, useState } from 'react'
import { List } from 'react-native-paper'
import { useAppState } from '../../state'
import Loading from '../components/Loading'
import LoginButton from '../components/LoginButton'
import bookService from '../services/books'

const LibraryHome = () => {
  const [libraries, setLibraries] = useState(null)
  const {
    state: { user, auth },
  } = useAppState()
  if (!user) return <LoginButton />
  useEffect(() => {
    bookService.fetchLibraries(user.id).then(setLibraries).catch(console.dir)
  }, [])
  if (!libraries) return <Loading title="loading libraries" />
  console.log(libraries)
  return (
    <Box p={2}>
      {libraries.items.map((lib) => (
        <List.Item title={lib.title} right={<Text>#{lib.volumeCount}</Text>} />
      ))}
    </Box>
  )
}
const LibraryStack = createNativeStackNavigator()
const MyLibrary = () => (
  <LibraryStack.Navigator>
    <LibraryStack.Screen
      component={LibraryHome}
      name="LibHome"
      options={{ title: 'My library' }}
    />
  </LibraryStack.Navigator>
)

export default MyLibrary
