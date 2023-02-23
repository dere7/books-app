import { Center, Heading, HStack, Image, Text, VStack } from 'native-base'
import { ImageBackground } from 'react-native'
import { Button } from 'react-native-paper'
import { toggleSkipLogin, setUser, useAppState, setAuth } from '../../state'

const Login = ({ request, promptAsync }) => {
  const { dispatch } = useAppState()

  return (
    <ImageBackground
      source={require('../../assets/bookshelf.jpg')}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <Center flex={1} background="gray.100" opacity={0.8}>
        <HStack space={'2'} alignItems="center" mb={'6'}>
          <Image
            source={require('../../assets/icon.png')}
            size="xl"
            alt="book-app logo"
          />
          <Heading color={'purple.700'} fontSize={'5xl'}>
            Book-App
          </Heading>
        </HStack>
        <VStack space="2">
          <Button
            disabled={!request}
            onPress={() => promptAsync()}
            icon="google"
            mode="contained"
          >
            Login with Google
          </Button>
          <Text textAlign="center" fontSize="md">
            —————— or ——————
          </Text>
          <Button mode="elevated" onPress={() => dispatch(toggleSkipLogin())}>
            Skip login
          </Button>
        </VStack>
        <Text
          alignSelf={'flex-end'}
          mt="8"
          mx="8"
          textAlign={'right'}
          fontSize="md"
        >
          Book App. Uses Google's Book API.{'\n'}
          ©2023 Made by Group-1
        </Text>
      </Center>
    </ImageBackground>
  )
}

export default Login
