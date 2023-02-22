import { useRoute } from '@react-navigation/native'
import {
  AspectRatio,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  VStack,
} from 'native-base'
import { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import bookService from '../services/books'
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { Button, Chip } from 'react-native-paper'
import { Linking } from 'react-native'
const Details = ({ navigation }) => {
  const [book, setBook] = useState(null)
  const { params } = useRoute()
  useEffect(() => {
    bookService
      .fetchBook(params.id)
      .then((book) => {
        setBook(book)
        navigation.setOptions({ title: book.volumeInfo.title })
      })
      .catch(alert)
  }, [])
  if (!book) return <Loading />
  const {
    title,
    authors,
    publisher,
    publishedDate,
    description,
    pageCount,
    categories,
    imageLinks,
  } = book.volumeInfo
  const { webReaderLink } = book.accessInfo
  return (
    <ScrollView>
      <VStack px="4" py="2" space="2">
        <Heading>{title}</Heading>
        <HStack space="4">
          <AspectRatio w={'40'} ratio={9 / 16}>
            <Image
              resizeMode="cover"
              source={{
                uri:
                  imageLinks?.thumbnail ||
                  'https://via.placeholder.com/100x128?text=No+Book+Cover',
              }}
              alt="Book cover"
            />
          </AspectRatio>
          <VStack flexShrink={'1'} space="2">
            <HStack space="2" alignItems={'center'}>
              <Ionicons name="person" size={26} color="lightgray" />
              <Text fontSize="md" color="purple.400">
                {authors?.join(', ')}
              </Text>
            </HStack>
            <HStack space="2" alignItems={'center'}>
              <MaterialCommunityIcons
                name="office-building-outline"
                size={26}
                color="lightgray"
              />
              <Text>
                {publisher} - {publishedDate}
              </Text>
            </HStack>
            <HStack space="2" alignItems={'center'}>
              <MaterialCommunityIcons
                name="book-open-page-variant-outline"
                size={26}
                color="lightgray"
              />
              <Text fontSize={'2xl'}>{pageCount}</Text>
            </HStack>
            <HStack flexWrap={'wrap'}>
              {categories?.map((cat, i) => (
                <Chip key={i} style={{ margin: 3 }} compact>
                  {cat}
                </Chip>
              ))}
            </HStack>
          </VStack>
        </HStack>
        <Text>{description}</Text>
        <Button
          icon="book"
          mode="contained"
          onPress={() =>
            Linking.canOpenURL(webReaderLink).then(
              (supported) => supported && Linking.openURL(webReaderLink)
            )
          }
        >
          Read
        </Button>
      </VStack>
    </ScrollView>
  )
}

export default Details
