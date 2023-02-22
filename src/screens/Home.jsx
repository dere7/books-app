import { VStack } from 'native-base'
import BookList from '../components/BookList'
const Home = () => {
  return (
    <VStack space={'2'} p={'2'}>
      <BookList />
    </VStack>
  )
}
export default Home
