import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Box, Center, Heading, Text } from 'native-base'
import { useEffect, useState } from 'react'
import { List } from 'react-native-paper'
import { setLibraries, useAppState } from '../../state'
import Loading from '../components/Loading'
import LoginButton from '../components/LoginButton'
import bookService from '../services/books'
import { MaterialIcons } from '@expo/vector-icons'

const LibraryHome = () => {
  const {
    state: { user, auth, libraries },
    dispatch,
  } = useAppState()
  const [expandedId, setExpandedId] = useState(0)
  const [books, setBooks] = useState()

  if (!user)
    return (
      <Center flex={1}>
        <LoginButton />
      </Center>
    )

  const handleAccordionPress = async (id) => {
    const books = await bookService.fetchBooksInShelf(auth.accessToken, id)
    console.log(books)
    setBooks(books)
  }

  useEffect(() => {
    console.log(auth)
    if (auth)
      bookService
        .fetchLibraries(auth.accessToken)
        .then((libs) => dispatch(setLibraries(libs)))
        .catch(alert)
        .catch(console.error)
  }, [])

  if (!libraries) return <Loading title="loading libraries" />
  console.log(libraries)

  return (
    <Box p={2}>
      <List.AccordionGroup
        onAccordionPress={handleAccordionPress}
        expandedId={expandedId}
      >
        {libraries.items.map((lib) => (
          <List.Accordion
            id={String(lib.id)}
            left={(props) =>
              lib.access === 'PRIVATE' ? (
                <List.Icon {...props} icon="lock" />
              ) : (
                <MaterialIcons size={24} name="people" {...props} />
              )
            }
            title={lib.title}
            right={(props) => <Text {...props}>#{lib.volumeCount} books</Text>}
          >
            {lib.id === expandedId &&
              books &&
              books.items?.map((book) => (
                <List.Item
                  key={book.id}
                  onPress={() =>
                    navigate('Details', { id: book.volumeInfo.id })
                  }
                  title={book.volumeInfo.title}
                />
              ))}
          </List.Accordion>
        ))}
      </List.AccordionGroup>
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
