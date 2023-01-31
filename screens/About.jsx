import {Box, Text, VStack, Button } from "native-base";
const About = ({navigation}) => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <VStack>
      <Text>You're in About page</Text>
      <Button onPress={() => navigation.goBack()}>Go Back</Button>
    </VStack>
  </Box>
);

export default About;
