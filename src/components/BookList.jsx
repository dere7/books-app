import { FlatList, VStack } from 'native-base'
import BookItem from './BookItem'
import data from '../data.json'

const BookList = () => {
  return (
    <VStack space="2">
      <FlatList
        data={data.items}
        renderItem={({ item }) => <BookItem book={item} />}
        keyExtractor={(item) => item.id}
      />
    </VStack>
  )
}
export default BookList
