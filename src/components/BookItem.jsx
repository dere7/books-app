import { useNavigation } from '@react-navigation/native'
import {
  AspectRatio,
  Button,
  Heading,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base'

const BookItem = ({ book }) => {
  const { navigate } = useNavigation()
  const {
    title,
    authors,
    description,
    publishedDate,
    publisher,
    pageCount,
    imageLinks,
  } = book.volumeInfo
  return (
    <Pressable onPress={() => navigate('Details', {id: book.id})}>
      {({ isPressed }) => (
        <HStack

          m={2}
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: isPressed ? 'gray900': 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: isPressed ? 'gray.100': 'gray.50',
          }}
        >
          <AspectRatio w={'32'} ratio={9 / 16}>
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
          <Stack p="2" pl="4" space={3} alignItems="flex-start" flexShrink={1}>
            <Stack space={2}>
              <Heading size="md" ml="-1" numberOfLines={2}>
                {title}
              </Heading>
              <Text
                fontSize="xs"
                fontWeight="500"
                color={'gray.400'}
                ml="-0.5"
                mt="-2"
              >
                {authors?.join(', ')} - <Text bold>#{pageCount}</Text> pages
              </Text>
              <Text
                color="coolGray.600"
                _dark={{
                  color: 'warmGray.200',
                }}
                fontWeight="400"
              >
                {[publisher, publishedDate].join(', ')}
              </Text>
            </Stack>
            <Text numberOfLines={4} textBreakStrategy="highQuality">
              {description}
            </Text>
            <Button
              variant={'link'}
              p={0}
              mt={-2}
              onPress={() => navigate('Details', {id: book.id})}
            >
              More »
            </Button>
          </Stack>
        </HStack>
      )}
    </Pressable>
  )
}

export default BookItem
