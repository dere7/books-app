import { Center, Divider, Heading, HStack, Image, Text, VStack } from 'native-base'
import { ImageBackground } from 'react-native'
import { Button } from 'react-native-paper'
import { useAuth } from '../../hooks'
import { toggleSkipLogin, useAppState } from '../../state'

const Login = () => {
  const { dispatch } = useAppState()
  const auth = useAuth()
  return (
    <ImageBackground
      source={require('../../assets/bookshelf.jpg')}
      resizeMode="cover"
      style={{ flex: 1, justifyContent: 'center' }}
    >
      <Center flex={1} background="gray.100" opacity={0.8}>
        <HStack space={'2'} alignItems="center" mb={'6'}>
          <Image source={require('../../assets/icon.png')} size="xl" />
          <Heading color={'purple.700'} fontSize={'5xl'}>
            Book-App
          </Heading>
        </HStack>
        <VStack space="2">
          <Button {...auth} icon="google" mode="contained">
            Login with Google
          </Button>
          <Text textAlign="center" fontSize="md">
            —————— or ——————
          </Text>
          <Button mode="elevated" onPress={() => dispatch(toggleSkipLogin())}>
            Skip login
          </Button>
        </VStack>
        <Divider size={'2'} />
        <Text alignSelf={'flex-end'} mt="8" mx="8" textAlign={'center'} fontSize="md">
          Book App. Uses Google's Book API. ©2023
          Made with 🤎 by Group-1
        </Text>
      </Center>
    </ImageBackground>
  )
}

export default Login
