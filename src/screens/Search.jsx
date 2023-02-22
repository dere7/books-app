import { Center, Divider, FlatList, Text, VStack } from 'native-base'
import { List, Searchbar } from 'react-native-paper'
import { useEffect, useState } from 'react'
import { StatusBar } from 'react-native'
import bookService from '../services/books'

const Search = () => {
  const [books, setBooks] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const onChangeSearch = (query) => setSearchQuery(query)
  useEffect(() => {
    if (searchQuery) {
      bookService
        .fetchBooks(searchQuery)
        .then(setBooks)
        .then(() => console.log(books))
        .catch(alert)
    }
  }, [searchQuery])
  return (
    <VStack
      flex={1}
      bgColor="purple.50"
      style={{ paddingTop: StatusBar.currentHeight }}
    >
      <Searchbar
        elevation={0}
        placeholder="Search books"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <Divider color={'purple.200'} />
      {books ? (
        <FlatList
          data={books.items}
          keyExtractor={({ item }) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={item.volumeInfo.title}
              onPress={() => navigate('Details', { id: item.id })}
            />
          )}
        />
      ) : (
        <Center flex={1}>
          <Text fontSize="lg">Type some characters to see some books</Text>
        </Center>
      )}
    </VStack>
  )
}

export default Search
