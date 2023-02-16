import { Box, Text, VStack, Button, HStack, Avatar, Icon, Heading, Divider } from 'native-base'
import BookItem from '../components/BookItem'
import BookList from '../components/BookList'

const UserInfo = ({ user }) => (
  <HStack space={'1'}>
    <Avatar
      bg="cyan.500"
      source={{
        uri: user.picture,
      }}
    >
      {user.name
        .split(' ')
        .map((n) => n[0])
        .join('')}
    </Avatar>
    <Text>{user.name}</Text>
  </HStack>
)

const Home = ({ navigation }) => {

  return (
    <VStack space={'2'} p={'2'}>
      <BookList />
    </VStack>
  )
}
export default Home
