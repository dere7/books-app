import { Center, Text, VStack } from 'native-base'
import { ProgressBar } from 'react-native-paper'

const Loading = ({ title }) => (
  <Center h={'full'}>
    <VStack space="3">
      <Text fontSize="lg">{title}</Text>
      <ProgressBar indeterminate />
    </VStack>
  </Center>
)

export default Loading
