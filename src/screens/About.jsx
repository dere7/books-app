import { Box, Text, VStack } from 'native-base'
import Ionicons from '@expo/vector-icons/Ionicons'

const About = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <VStack alignItems="center">
      <Ionicons
        name={'ios-information-circle-outline'}
        size={28}
        color={'dodgerblue'}
      />
      <Text fontSize={'md'}>Book App. Uses Google's Book API.</Text>
      <Text>©2023</Text>
      <Text fontSize="md" mt="4">
        Made with 🤎 by Group-1 an
      </Text>
      <Text fontSize="md" color="amber.600" mx="8" textAlign="center">
        Dereje Desta - Fatima Abayneh - Eden Zewdu
      </Text>
      <Text fontSize="md" color="amber.600" mx="8" textAlign="center">
        Dibora Daba - Edlawit G/Hana
      </Text>
    </VStack>
  </Box>
)

export default About
