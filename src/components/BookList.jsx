import { Center, Divider, FlatList, Text, VStack } from 'native-base'
import BookItem from './BookItem'
import { setBooks, useAppState } from '../../state'
import { useEffect } from 'react'
import bookService from '../services/books'
import { ProgressBar } from 'react-native-paper'
import Loading from './Loading'

const BookList = () => {
  const {
    state: { books },
    dispatch,
  } = useAppState()
  useEffect(() => {
    bookService
      .fetchBooks()
      .then((res) => dispatch(setBooks(res.items)))
      .catch((e) => alert(e.message))
  }, [])

  if (!books) return <Loading title="Loading Books" />
  console.log(books.map(b => b.id))
  return (
    <VStack space="2">
      <Text fontSize={"lg"}>found {books.length} books</Text>
      <Divider />
      <FlatList
        data={books}
        renderItem={({ item }) => <BookItem book={item} />}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  )
}
export default BookList
