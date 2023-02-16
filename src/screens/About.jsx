import { Box, Text, VStack, Button } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons'

const About = ({ navigation }) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <VStack alignItems="center">
      <Ionicons
        name={'ios-information-circle-outline'}
        size={28}
        color={'dodgerblue'}
      />
      <Text fontSize={'md'}>Book App. Uses Google's Book API.</Text>
      <Text>©2023</Text>
      <Text fontSize="md" color={'purple.500'}>
        Made with 🤎 by
        <Text highlight bold>
          Group 1
        </Text>
      </Text>
    </VStack>
  </Box>
)

export default About
